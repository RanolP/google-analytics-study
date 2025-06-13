import { HomeLogger } from '@/shared/logs/home';

export interface ExposeController {
  createExposer: (collectionId: string) => (seasonId: string) => void;
  sendLog: () => void;
}

export function createExposeController(): ExposeController {
  let exposed = new Map<string, Set<string>>();

  return {
    createExposer: (collectionId) => (seasonId) => {
      const target =
        exposed.get(collectionId) ??
        (() => {
          const set = new Set<string>();
          exposed.set(collectionId, set);
          return set;
        })();
      target.add(seasonId);
    },
    sendLog: () => {
      HomeLogger.exposedCollection(exposed);
      exposed.clear();
    },
  };
}
