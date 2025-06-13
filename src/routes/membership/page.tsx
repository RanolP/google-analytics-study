import { NavBar } from '../~components/nav-bar';

export default function MembershipPage() {
  return (
    <>
      <NavBar.Filler />
      <main mx-10>
        <h1 text-6 mb-2 font-bold>
          여기는 그냥 내비게이션 테스트용이라 콘텐츠가 없읍니다 ㄱ-
        </h1>
        <p>
          홈에 있다가 이리로 오면 <code>exposed_collection</code> 로그가
          쏴집니다
        </p>
      </main>
    </>
  );
}
