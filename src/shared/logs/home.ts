import { Firebase } from '@/services/google';

export const HomeLogger = {
  exposedCollection(
    exposed: Map<string, ArrayLike<string> | Iterable<string>>
  ) {
    Firebase.logEvent('exposed_collection', {
      season_count: Array.from(exposed.values()).reduce(
        (acc, curr) => acc + Array.from(curr).length,
        0
      ),
      collection_ids: Array.from(exposed.keys()).join(','),
    });
  },
};
