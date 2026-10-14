import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        solivana: {
          bark: '#331D01',
          amber: '#EC9247',
          taupe: '#786455',
          sand: '#B49F90',
          cream: '#F0EDED',
          warm: '#F6F1EC',
          ink: '#1F1208',
        },
      },
      fontFamily: {
        display: ['Jost', 'system-ui', 'sans-serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
        accent: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
