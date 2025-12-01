import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { injectSvgSprite } from '@ui';

bootstrapApplication(App, appConfig)
  .then(() => {
    injectSvgSprite()
  })
  .catch((err) => console.error(err));
