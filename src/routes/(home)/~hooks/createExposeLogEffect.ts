import { createEffect, onCleanup } from 'solid-js';
import type { ExposeController } from './createExposeController';

export function createExposeLogEffect(controller: ExposeController) {
  createEffect(() => {
    /**
     * For the compatibility.
     * ref: https://developer.chrome.com/articles/page-lifecycle-api/#legacy-lifecycle-apis-to-avoid
     */
    const event =
      'onpagehide' in window
        ? 'pagehide'
        : 'onbeforeunload' in window
        ? 'beforeunload'
        : 'unload';

    window.addEventListener(event, controller.sendLog);
    onCleanup(() => {
      window.removeEventListener(event, controller.sendLog);
    });
  });

  createEffect(() => {
    onCleanup(() => {
      controller.sendLog();
    });
  });
}
