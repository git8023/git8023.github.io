import { App } from 'vue';
import highlight from 'highlight.js';

highlight.configure({
  ignoreUnescapedHTML: true,
});

export default {
  install(app: App) {
    app.directive('high-light', (el, binding) => {
      const blocks = el.querySelectorAll('pre code');
      blocks.forEach((block: any) => highlight.highlightElement(block));

      // const r = highlight.highlight(el.innerText, { language: 'typescript' });
      // el.innerHTML = '<pre><code>' + r.value + '</code></pre>'
    });
  },
};
