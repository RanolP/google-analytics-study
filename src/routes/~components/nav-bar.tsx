import { Firebase } from '@/services/google';
import { to } from '@/shared/routes';
import { useAtom } from 'solid-jotai';
import { atomWithStorage } from 'solid-jotai/utils';
import { createEffect, createSignal, onCleanup } from 'solid-js';

const nameAtom = atomWithStorage('name', '');

export function NavBar() {
  const [isTransparent, setTransparent] = createSignal(false);
  createEffect(() => {
    const onScroll = () => setTransparent(window.scrollY <= 16);
    window.addEventListener('scroll', onScroll);
    onCleanup(() => window.removeEventListener('scroll', onScroll));
  });
  const [name, setName] = useAtom(nameAtom);
  createEffect(() => {
    if (name().length === 0) {
      Firebase.eraseUserProperty('name');
    } else {
      Firebase.setUserProperty('name', name());
    }
  });

  return (
    <nav
      classList={{ 'bg-opacity-0': isTransparent() }}
      bg-white
      h-16
      px-12
      flex
      items-center
      gap-4
      w-full
      fixed
      top-0
      left-0
      z-100
    >
      <a href={to('/')}>
        <div text-5 font-bold pb="0.5" mr-5>
          gastudy
        </div>
      </a>
      <a href={to('/membership')}>
        <div text="3.5" font-bold>
          멤버십
        </div>
      </a>
      <div flex-grow-1 />
      <input
        w-32
        border-1
        placeholder="Nickname"
        value={name() ?? ''}
        on:change={(e) => {
          setName(e.currentTarget.value);
        }}
      />
    </nav>
  );
}

NavBar.Filler = () => <div h-16 />;
