export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
  esbuild: {
    jsxInject: `import 'styled-jsx'`,
  },
};
