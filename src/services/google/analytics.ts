import { createScriptLoader } from '@solid-primitives/script-loader';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function createAnalyticsLoader(tag: string) {
  return createScriptLoader({
    src: `https://www.googletagmanager.com/gtag/js?id=${tag}`,
    async onLoad() {
      window.dataLayer = window.dataLayer || [];
      function gtag(...params: unknown[]) {
        window.dataLayer.push(params);
      }
      gtag('js', new Date());
      gtag('config', tag);
    },
  });
}
