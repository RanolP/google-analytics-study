import { createResource, Suspense } from 'solid-js';
import { getCollectionList } from '@/services/api/collection';
import { createAnalyticsLoader } from '@/services/google';
import { Google } from '@/shared/constants';
import { Collection } from './~components/collection';
import { NavBar } from '../~components/nav-bar';
import { createExposeController } from './~hooks/createExposeController';
import { createExposeLogEffect } from './~hooks/createExposeLogEffect';

export default function IndexPage() {
  const loader = createAnalyticsLoader(Google.Analytics.Tag);

  const [collections] = createResource(() =>
    getCollectionList({ cursor: null, limit: 30 })
  );

  const exposeCtl = createExposeController();
  createExposeLogEffect(exposeCtl);

  return (
    <>
      {loader}
      <NavBar.Filler />
      <main>
        <Suspense>
          {collections()?.map((collection) => (
            <Collection
              expose={exposeCtl.createExposer(collection.id)}
              collection={collection}
            />
          ))}
        </Suspense>
      </main>
    </>
  );
}
