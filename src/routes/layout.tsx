import type { ParentProps } from 'solid-js';
import { NavBar } from './~components/nav-bar';

export default function Layout(props: ParentProps) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}
