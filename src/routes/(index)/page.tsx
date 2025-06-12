import { createResource, Suspense } from 'solid-js';
import { getCollectionList } from '@/services/api/collection';
import { createAnalyticsLoader } from '@/services/google';
import { Google } from '@/shared/constants';
import { Collection } from './~components/collection';

export default function IndexPage() {
  const loader = createAnalyticsLoader(Google.Analytics.Tag);

  const [collections] = createResource(() =>
    getCollectionList({ cursor: null, limit: 30 })
  );

  return (
    <>
      {loader}
      <main m-8>
        <h1 text-8>Welcome to gastudy.ranolp.dev</h1>
        <Suspense>
          {collections()?.map((collection) => (
            <Collection collection={collection} />
          ))}
        </Suspense>
      </main>
    </>
  );
}
