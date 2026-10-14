'use client';

import { useState } from 'react';

interface DownloadButtonProps {
  label?: string;
  /** DOM id of the section to clone into the PDF. */
  targetId?: string;
  /** OR — fully-formed inner HTML (used by Journal/Annual-Review). */
  htmlBody?: string;
  filename: string;
  title?: string;
  subtitle?: string;
  /** Skip the standard branded header (use when htmlBody is its own document). */
  bare?: boolean;
}

export function DownloadButton({
  label = 'Download PDF',
  targetId,
  htmlBody,
  filename,
  title,
  subtitle,
  bare = false,
}: DownloadButtonProps) {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy) return;

    let bodyContent: HTMLElement | null = null;
    if (htmlBody) {
      bodyContent = document.createElement('div');
      bodyContent.innerHTML = htmlBody;
    } else if (targetId) {
      const el = document.getElementById(targetId);
      if (!el) {
        console.error(`[download-pdf] Target #${targetId} not found on page`);
        alert(
          'This download is temporarily unavailable. Please refresh the page and try again, or email info@solivana.com.'
        );
        return;
      }
      bodyContent = el.cloneNode(true) as HTMLElement;
      // Convert role="checkbox" buttons into static checkbox + label rows
      // FIRST. The item label lives inside the button (the second span — the
      // first is the aria-hidden checkbox visual), so we have to preserve it
      // before the next step nukes all buttons.
      bodyContent.querySelectorAll('[role="checkbox"]').forEach((node) => {
        const checked = node.getAttribute('aria-checked') === 'true';
        // Checkbox button structure (from Checklist.tsx): the FIRST direct child
        // is the aria-hidden visual square; the LAST direct child is the label
        // span carrying the actual item text. Take the last child by position
        // — never querySelector, because the visual square has a nested ✓ span
        // that would match first for checked items and capture the wrong text.
        const labelSpan = node.children[node.children.length - 1];
        const labelHtml = labelSpan ? labelSpan.innerHTML : node.innerHTML;

        const row = document.createElement('div');
        row.style.cssText =
          'display: flex; gap: 10px; align-items: flex-start; margin: 4px 0; padding: 4px 0; font-size: 11pt; line-height: 1.55; color: #331D01;';

        const box = document.createElement('span');
        box.textContent = checked ? '☑' : '☐';
        box.style.cssText =
          'flex: 0 0 auto; font-size: 14pt; line-height: 1.2; color: #331D01;';
        row.appendChild(box);

        const text = document.createElement('span');
        text.innerHTML = labelHtml;
        text.style.cssText = 'flex: 1; min-width: 0;';
        if (checked) text.style.textDecoration = 'line-through';
        row.appendChild(text);

        node.parentElement?.replaceChild(row, node);
      });
      // THEN strip remaining buttons (Reset, etc.) and explicitly hidden bits.
      bodyContent
        .querySelectorAll('button, [data-no-pdf], .print\\:hidden')
        .forEach((n) => n.remove());
    }

    if (!bodyContent) return;

    setBusy(true);
    let wrapper: HTMLDivElement | null = null;
    try {
      wrapper = document.createElement('div');
      wrapper.style.cssText =
        'width: 190mm; padding: 0; font-family: Montserrat, system-ui, sans-serif; color: #1F1208; background: #ffffff;';

      if (!bare) {
        const header = document.createElement('div');
        header.style.cssText =
          'padding: 0 0 14px; border-bottom: 2px solid #331D01; margin-bottom: 18px;';
        header.innerHTML = `
          <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; font-size: 9pt; color: #786455;">
            The Foundation · SoliVana Wellness
          </div>
          ${title ? `<div style="font-family: 'Jost', system-ui, sans-serif; font-size: 22pt; font-weight: 300; color: #331D01; margin-top: 6px; line-height: 1.15;">${escapeHtml(title)}</div>` : ''}
          ${subtitle ? `<div style="font-size: 10pt; color: #786455; margin-top: 4px;">${escapeHtml(subtitle)}</div>` : ''}
        `;
        wrapper.appendChild(header);
      }

      wrapper.appendChild(bodyContent);

      if (!bare) {
        const footer = document.createElement('div');
        footer.style.cssText =
          'margin-top: 22px; padding-top: 10px; border-top: 1px solid #B49F90; font-size: 8pt; color: #786455; text-align: center; font-family: \'Poppins\', system-ui, sans-serif; letter-spacing: 0.05em;';
        const today = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        footer.textContent = `Generated ${today} · foundation.solivana.ai · Educational only — not medical advice`;
        wrapper.appendChild(footer);
      }

      // Hide the wrapper from view but keep it on-screen so html2canvas can
      // measure layout. Moving offscreen with `left: -9999px` is unreliable in
      // Mobile Safari and was causing blank PDFs. `opacity: 0 + pointer-events:
      // none + zIndex: -1` keeps it rendered but invisible and untouchable.
      wrapper.style.position = 'absolute';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.opacity = '0';
      wrapper.style.pointerEvents = 'none';
      wrapper.style.zIndex = '-1';
      document.body.appendChild(wrapper);

      // Make sure custom fonts (Jost, Montserrat, Poppins) have loaded before
      // html2canvas snapshots the DOM, otherwise glyphs render blank/fallback.
      if ('fonts' in document) {
        try {
          await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts
            .ready;
        } catch {
          /* font readiness is best-effort */
        }
      }

      const mod = await import('html2pdf.js');
      const html2pdf =
        (mod as unknown as { default: (...a: unknown[]) => unknown }).default;

      // @ts-expect-error html2pdf chain API lacks types
      await html2pdf()
        .set({
          margin: [14, 12, 16, 12],
          filename,
          image: { type: 'jpeg', quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            letterRendering: true,
          },
          jsPDF: {
            unit: 'mm',
            format: 'letter',
            orientation: 'portrait',
            compress: true,
          },
          pagebreak: {
            mode: ['css', 'legacy'],
            avoid: ['li', 'h2', 'h3', 'tr', '.journal-entry', '.no-break'],
          },
        })
        .from(wrapper)
        .save();
    } catch (err) {
      console.error('[download-pdf]', err);
      alert('Could not generate the PDF. Please try again, or email info@solivana.com.');
    } finally {
      if (wrapper) wrapper.remove();
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="btn-secondary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait"
    >
      <span aria-hidden="true">↓</span>
      <span>{busy ? 'Building PDF…' : label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Branded journal-style PDFs. These are NOT spreadsheets — they are
// printable documents members can write in by hand or fill on screen.
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_BREAK = '<div style="page-break-after: always; height: 0;"></div>';

function pageHeader(title: string, subtitle?: string): string {
  return `
    <div class="no-break" style="border-bottom: 2px solid #331D01; padding-bottom: 12px; margin-bottom: 22px;">
      <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; font-size: 9pt; color: #EC9247;">The Foundation · SoliVana Wellness</div>
      <div style="font-family: 'Jost', system-ui, sans-serif; font-size: 24pt; font-weight: 300; color: #331D01; margin-top: 6px; line-height: 1.15;">${title}</div>
      ${subtitle ? `<div style="font-size: 10.5pt; color: #786455; margin-top: 4px; font-style: italic;">${subtitle}</div>` : ''}
    </div>
  `;
}

function writingLines(count: number, label?: string): string {
  const labelHtml = label
    ? `<div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; font-size: 8.5pt; color: #786455; margin-bottom: 6px;">${label}</div>`
    : '';
  const lines = Array.from({ length: count })
    .map(
      () =>
        `<div style="border-bottom: 1px solid #B49F90; height: 22pt;"></div>`
    )
    .join('');
  return `<div style="margin-bottom: 14px;">${labelHtml}${lines}</div>`;
}

function fieldRow(label: string, lines = 1): string {
  return `<div class="no-break" style="margin-bottom: 14px; display: flex; align-items: flex-end; gap: 14px;">
    <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; font-size: 8.5pt; color: #786455; white-space: nowrap; padding-bottom: 4pt;">${label}</div>
    <div style="flex: 1; ${Array.from({ length: lines })
      .map(() => 'border-bottom: 1px solid #B49F90; height: 18pt;')
      .join('')}"></div>
  </div>`;
}

function buildFoodReintroductionJournal(): string {
  // Cover
  let html = `<section>${pageHeader(
    'Reintroduction Journal',
    'Phase 3 · Weeks 5–6 · One food every three days'
  )}
    <div style="font-size: 11pt; color: #1F1208; line-height: 1.65; max-width: 165mm; margin-bottom: 22px;">
      <p style="margin: 0 0 12px;"><strong style="color: #331D01;">How this works.</strong> In Phase 3, you reintroduce one previously-eliminated food every three days and watch your body for forty-eight hours. The body whispers before it shouts — a slight bloat, a mood dip, a bad night's sleep. This journal is where you catch the whispers.</p>
      <p style="margin: 0 0 12px;"><strong style="color: #331D01;">Order I recommend.</strong> Nightshades first (week five), dairy next (only if you choose), gluten last (only if you choose). One food. Three days. Then the next.</p>
      <p style="margin: 0 0 12px;"><strong style="color: #331D01;">What to look for.</strong> Bloating within four hours. Skin reactions within twenty-four. Mood, sleep, energy, and joint pain within forty-eight. None of those make a food bad. They make it information.</p>
    </div>
    <div class="no-break" style="background: #F6F1EC; border-left: 3px solid #EC9247; padding: 14px 18px; margin-bottom: 28px;">
      <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; font-size: 8.5pt; color: #EC9247; margin-bottom: 6px;">Reaction Scale</div>
      <div style="font-size: 10.5pt; color: #1F1208; line-height: 1.5;"><strong>0</strong> — Nothing detectable. &nbsp;·&nbsp; <strong>1</strong> — Mild, easy to dismiss. &nbsp;·&nbsp; <strong>2</strong> — Noticeable, lasts hours. &nbsp;·&nbsp; <strong>3</strong> — Strong, lasts a day or more.</div>
    </div>
    <div style="font-size: 9.5pt; color: #786455; font-style: italic; max-width: 165mm;">Eight entry pages follow. Use one per food. If a food clearly disagrees, stop reintroducing it; revisit in three months.</div>
  </section>${PAGE_BREAK}`;

  // 8 entries
  for (let i = 1; i <= 8; i++) {
    html += `<section class="journal-entry" style="page-break-inside: avoid; padding-bottom: 8pt;">
      <div class="no-break" style="display: flex; align-items: baseline; justify-content: space-between; border-bottom: 1px solid #B49F90; padding-bottom: 8pt; margin-bottom: 16pt;">
        <div style="font-family: 'Jost', system-ui, sans-serif; font-size: 16pt; font-weight: 400; color: #331D01;">Entry ${i.toString().padStart(2, '0')}</div>
        <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; font-size: 8.5pt; color: #EC9247;">Reintroduction Journal</div>
      </div>
      ${fieldRow('Date', 1)}
      ${fieldRow('Food Reintroduced', 1)}
      ${fieldRow('Phase / Week', 1)}
      <div class="no-break" style="margin: 18pt 0 14pt;">
        <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; font-size: 8.5pt; color: #786455; margin-bottom: 8pt;">Reaction (circle one)</div>
        <div style="font-size: 12pt; color: #1F1208; letter-spacing: 0.4em;">○ &nbsp; 0 &nbsp;&nbsp;&nbsp; ○ &nbsp; 1 &nbsp;&nbsp;&nbsp; ○ &nbsp; 2 &nbsp;&nbsp;&nbsp; ○ &nbsp; 3</div>
      </div>
      <div class="no-break" style="margin: 14pt 0;">
        <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; font-size: 8.5pt; color: #786455; margin-bottom: 8pt;">Symptoms — check what showed up</div>
        <div style="font-size: 11pt; color: #1F1208; line-height: 1.9;">
          ☐ &nbsp; Skin (acne, rash, itching) &nbsp;&nbsp;&nbsp; ☐ &nbsp; Digestion (bloat, gas, irregular)<br>
          ☐ &nbsp; Mood (irritable, low, anxious) &nbsp;&nbsp;&nbsp; ☐ &nbsp; Energy (crash, brain fog)<br>
          ☐ &nbsp; Sleep (waking, insomnia, restlessness) &nbsp;&nbsp;&nbsp; ☐ &nbsp; Joints / muscle pain<br>
          ☐ &nbsp; Other:&nbsp; <span style="border-bottom: 1px solid #B49F90; display: inline-block; min-width: 85mm;">&nbsp;</span>
        </div>
      </div>
      ${writingLines(4, 'Notes')}
      <div class="no-break" style="margin-top: 12pt; padding-top: 10pt; border-top: 1px dashed #B49F90; font-size: 9pt; color: #786455;">
        <strong style="color: #331D01;">Verdict:</strong> &nbsp; ☐ Add back &nbsp;&nbsp; ☐ Add back occasionally &nbsp;&nbsp; ☐ Pause &nbsp;&nbsp; ☐ Out for now
      </div>
    </section>${i < 8 ? PAGE_BREAK : ''}`;
  }

  return html;
}

function buildAnnualReview(): string {
  return `<section>${pageHeader(
    'The Annual Review',
    'One year of your body. One page to look back. One page to look forward.'
  )}
    <div style="font-size: 11pt; color: #1F1208; line-height: 1.65; max-width: 165mm; margin-bottom: 24px;">
      <p style="margin: 0 0 10px;">The day-to-day is always uneven. The year-to-year is what matters. Set aside thirty minutes — birthday, new year, equinox, your choice — and answer these honestly.</p>
    </div>

    ${fieldRow('Today', 1)}
    ${fieldRow('Year reflecting on', 1)}

    <div class="no-break" style="margin: 22pt 0 14pt; padding: 14pt 16pt; background: #F6F1EC; border-left: 3px solid #EC9247;">
      <div style="font-family: 'Jost', system-ui, sans-serif; letter-spacing: 0.22em; text-transform: uppercase; font-size: 8.5pt; color: #EC9247; margin-bottom: 10pt;">Where you are right now (1–10)</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 11pt; color: #1F1208;">
        <tr>
          <td style="padding: 6pt 0; width: 35%;">Sleep quality</td>
          <td style="padding: 6pt 0; border-bottom: 1px solid #B49F90; height: 18pt;"></td>
          <td style="padding: 6pt 0 6pt 18pt; width: 30%;">Energy</td>
          <td style="padding: 6pt 0; border-bottom: 1px solid #B49F90; height: 18pt;"></td>
        </tr>
        <tr>
          <td style="padding: 6pt 0;">Mood / steadiness</td>
          <td style="padding: 6pt 0; border-bottom: 1px solid #B49F90; height: 18pt;"></td>
          <td style="padding: 6pt 0 6pt 18pt;">Digestion</td>
          <td style="padding: 6pt 0; border-bottom: 1px solid #B49F90; height: 18pt;"></td>
        </tr>
        <tr>
          <td style="padding: 6pt 0;">Skin / clarity</td>
          <td style="padding: 6pt 0; border-bottom: 1px solid #B49F90; height: 18pt;"></td>
          <td style="padding: 6pt 0 6pt 18pt;">Stress tolerance</td>
          <td style="padding: 6pt 0; border-bottom: 1px solid #B49F90; height: 18pt;"></td>
        </tr>
      </table>
    </div>

    ${writingLines(4, 'What is meaningfully better than a year ago')}
    ${writingLines(4, 'What is still hard, or new')}
    ${writingLines(3, 'One pattern I want to change in the next year')}
    ${writingLines(3, 'One ritual I want to keep no matter what')}
  </section>`;
}

export const FOOD_REINTRODUCTION_JOURNAL_HTML = buildFoodReintroductionJournal();
export const ANNUAL_REVIEW_HTML = buildAnnualReview();

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface CsvDownloadProps {
  filename: string;
  rows: string[][];
  label?: string;
}

export function CsvDownload({
  filename,
  rows,
  label = 'Download CSV Template',
}: CsvDownloadProps) {
  function escape(cell: string): string {
    if (/[",\n]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
    return cell;
  }
  function download() {
    const csv = rows.map((r) => r.map(escape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <button
      type="button"
      onClick={download}
      className="btn-secondary inline-flex items-center gap-2"
    >
      <span aria-hidden="true">↓</span>
      <span>{label}</span>
    </button>
  );
}

// Backward compat — old PrintButton name still resolves but routes to download.
export { DownloadButton as PrintButton };
