const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        ie: "11",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
      },

      // utiliza polyfills para los navegadores especificados en la opción targets anterior
      // Babel utiliza polyfills de la librería core-js
      useBuiltIns: "entry",
      corejs: "^3",
    },
  ],
];

module.exports = { presets };
