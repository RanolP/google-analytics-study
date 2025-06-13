import { to } from '@/shared/routes';
import { createEffect, createSignal } from 'solid-js';

export function NavBar() {
  const [isTransparent, setTransparent] = createSignal(false);
  createEffect(() => {
    const onScroll = () => setTransparent(window.scrollY <= 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
    </nav>
  );
}

NavBar.Filler = () => <div h-16 />;
