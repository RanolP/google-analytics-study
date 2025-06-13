import { createResource, createSignal, Show } from 'solid-js';
import { getCollection, type Collection } from '@/services/api/collection';
import { SeasonCard } from './season-card';

interface Props {
  collection: Collection;
}
export function Collection(props: Props) {
  const [seasons] = createResource(() =>
    getCollection({ id: props.collection.id })
  );

  const [index, setIndex] = createSignal(0);

  const queries = {
    xl: matchMedia('(min-width: 80rem)'),
    lg: matchMedia('(min-width: 64rem)'),
    md: matchMedia('(min-width: 48rem)'),
    sm: matchMedia('(min-width: 40rem)'),
  };
  const evaluateCount = () => {
    if (queries.xl.matches) return 6;
    if (queries.lg.matches) return 5;
    if (queries.md.matches) return 4;
    if (queries.sm.matches) return 3;
    return 2;
  };
  const [count, setCount] = createSignal(evaluateCount());
  queries.xl.addEventListener('change', () => setCount(evaluateCount()));
  queries.lg.addEventListener('change', () => setCount(evaluateCount()));
  queries.md.addEventListener('change', () => setCount(evaluateCount()));
  queries.sm.addEventListener('change', () => setCount(evaluateCount()));

  const [hadInteracted, setInteracted] = createSignal(false);
  const [isAnimating, setAnimating] = createSignal(false);
  const scrollLeft = () => {
    if (seasons.loading) return;
    if (isAnimating()) return;
    if (!hadInteracted()) return;
    const len = seasons()!.items.length;
    setIndex((prev) => (prev === 0 ? prev + len : prev));
    setTimeout(() => {
      setAnimating(true);
      setIndex((prev) => (prev === 0 || prev > count() ? prev - count() : 0));
    }, 10);
    setTimeout(() => {
      setAnimating(false);
      setInteracted(true);
    }, 1000);
  };
  const scrollRight = () => {
    if (seasons.loading) return;
    if (isAnimating()) return;
    const len = seasons()!.items.length;
    setTimeout(() => {
      setAnimating(true);
      setIndex((prev) =>
        prev + count() < len - count() || prev + count() === len + 1
          ? prev + count()
          : len - count() + 1
      );
    }, 10);
    setTimeout(() => {
      setAnimating(false);
      setIndex((prev) => (prev > len ? prev - len : prev));
      setInteracted(true);
    }, 1000);
  };

  return (
    <div flex="~ col" w-full mb-4 overflow-hidden>
      <h2 font-bold text-6 mx-10>
        {props.collection.title}
      </h2>
      <div class="group" flex="~ row">
        <button
          on:click={scrollLeft}
          opacity-0
          classList={{
            'group-hover:opacity-100': true,
            'bg-white bg-op-75': hadInteracted(),
          }}
          transition="400 ease-in-out"
          flex
          justify-center
          items-center
          shrink-0
          w-8
          mr-1
          mb-13
          z-1
        >
          <Show when={hadInteracted()}>
            <div i-feather-chevron-left text-8 />
          </Show>
        </button>
        <ul
          style={{
            '--index':
              index() + (hadInteracted() ? seasons()?.items.length ?? 0 : 0),
            '--count': count(),
          }}
          classList={{
            '[--gap:calc(var(--spacing)*1)]': true,
            '[--width:calc((100%-var(--gap)*var(--count)+var(--gap))/var(--count))]':
              true,
            'transition-ease-in-out transition-1000': isAnimating(),
          }}
          transform-translate-x="[calc(-1*var(--index)*(var(--width)+var(--gap))-var(--gap))]"
          flex="~ row"
        >
          {seasons()?.items.map((season, i) => (
            <li ml-1 grow-0 shrink-0 w="var(--width)">
              <SeasonCard season={season} />
            </li>
          ))}
          {seasons()?.items.map((season, i) => (
            <li ml-1 grow-0 shrink-0 w="var(--width)">
              <SeasonCard season={season} />
            </li>
          ))}
          {seasons()?.items.map((season, i, a) => (
            <li ml-1 grow-0 shrink-0 w="var(--width)">
              <SeasonCard season={season} />
            </li>
          ))}
        </ul>
        <button
          on:click={scrollRight}
          opacity-0
          group-hover:opacity-100
          transition="400 ease-in-out"
          flex
          justify-center
          items-center
          shrink-0
          w-8
          ml-1
          mb-13
          z-1
          bg="white op-75"
        >
          <div i-feather-chevron-right text-8 />
        </button>
      </div>
    </div>
  );
}
