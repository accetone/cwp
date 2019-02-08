Reveal.initialize({
  controls: false,
  progress: true,
  slideNumber: true,
  history: true,
  center: true,
  hideAddressBar: true,
  transition: 'slide',
  dependencies: [
    {
      src: '../plugin/highlight/highlight.js',
      async: true,
      condition: function () {
        return Boolean(document.querySelector('pre code'));
      },
      callback: function () {
        hljs.initHighlightingOnLoad();
      }
    }
  ]
});

var body = document.getElementsByClassName('yandex')[0];
var invert = false;

body.onkeypress = function (event) {
  if (event.key.toLowerCase() !== 'i') return;

  if (invert) body.style = '';
  else body.style = '-webkit-filter: invert(100%)';

  invert = !invert;
};