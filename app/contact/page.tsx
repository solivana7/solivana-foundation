import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';
import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact — The Foundation',
  description:
    'Send a note to Natasha and the SoliVana team. Questions, support, press, partnerships.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen text-solivana-bark">
      <SiteTopBar />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <div className="eyebrow mb-5">Contact</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-6">
          Send us a note.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          Anything from a quick question to a long story — we read everything that
          comes through this form. Replies usually land within one business day.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pb-16 md:pb-20">
        <ContactForm />
      </section>

      {/* In person + hours */}
      <section className="border-t border-solivana-sand/40 bg-white/50">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <div className="eyebrow mb-3">In Person</div>
              <h2 className="font-display text-2xl font-medium text-solivana-bark mb-3 leading-tight">
                SoliVana Wellness
              </h2>
              <p className="text-solivana-taupe leading-relaxed">
                1922 El Camino Real
                <br />
                Redwood City, California 94063
                <br />
                <a
                  href="tel:+16505644325"
                  className="text-solivana-bark hover:text-solivana-amber transition-colors"
                >
                  (650) 564-4325
                </a>
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">Online Support</div>
              <h2 className="font-display text-2xl font-medium text-solivana-bark mb-3 leading-tight">
                Reply Hours
              </h2>
              <p className="text-solivana-taupe leading-relaxed">
                Monday–Friday
                <br />
                11 a.m.–8 p.m. Pacific
                <br />
                <span className="text-sm">Most replies within 1 business day.</span>
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">Members</div>
              <h2 className="font-display text-2xl font-medium text-solivana-bark mb-3 leading-tight">
                Office Hours
              </h2>
              <p className="text-solivana-taupe leading-relaxed">
                Active members get three live group calls during the 6-week protocol —
                schedules and Zoom links live inside the course.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety note */}
      <section className="bg-solivana-amber/5 border-t border-solivana-amber/20">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 text-center">
          <p className="text-solivana-bark leading-relaxed max-w-xl mx-auto">
            <strong>Please don&apos;t use this form for medical emergencies or to
            share medical history.</strong>{' '}
            We are not a medical service. For emergencies, call 911 or your physician
            immediately.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
