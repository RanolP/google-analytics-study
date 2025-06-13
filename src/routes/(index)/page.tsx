import { createResource, Suspense } from 'solid-js';
import { getCollectionList } from '@/services/api/collection';
import { createAnalyticsLoader } from '@/services/google';
import { Google } from '@/shared/constants';
import { Collection } from './~components/collection';
import { NavBar } from '../~components/nav-bar';

export default function IndexPage() {
  const loader = createAnalyticsLoader(Google.Analytics.Tag);

  const [collections] = createResource(() =>
    getCollectionList({ cursor: null, limit: 30 })
  );

  return (
    <>
      {loader}
      <NavBar.Filler />
      <main>
        <Suspense>
          {collections()?.map((collection) => (
            <Collection collection={collection} />
          ))}
        </Suspense>
      </main>
    </>
  );
}
