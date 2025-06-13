import type { CommonSegment, Route } from 'soonloh';

export function makeRouteTree(routes: Route<CommonSegment>[]) {
  const root: RouteNode = {
    segment: { kind: 'static', path: '/', raw: '' },
    namedRouteFiles: {},
    children: {},
  };
  for (const route of routes) {
    let target = root;
    let broken = false;
    route.segments.forEach((segment, idx, arr) => {
      if (broken) return;
      if (idx + 1 === arr.length && segment.kind === 'terminator') {
        target[segment.path] = route;
        broken = true;
        return;
      }
      if (!(segment.raw in target.children)) {
        target.children[segment.raw] = {
          segment,
          namedRouteFiles: {},
          children: {},
        };
      }
      target = target.children[segment.raw]!;
    });
  }

  return {
    root,
  };
}

export interface RouteNode {
  segment: CommonSegment;
  namedRouteFiles: Record<string, Route<CommonSegment>>;
  children: Record<string, RouteNode>;
}
