import type { Preview } from '@storybook/angular'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },

};

const SPRITE_URL = '/assets/ui/sprite.svg';
fetch(SPRITE_URL).then(r => r.text()).then(svg => {
  const container = document.createElement('div');
  container.id = 'sb-ui-sprite';
  container.style.display = 'none';
  container.innerHTML = svg;
  document.body.insertBefore(container, document.body.firstChild);
}).catch(() => { /* silent fallback */ });

export default preview;