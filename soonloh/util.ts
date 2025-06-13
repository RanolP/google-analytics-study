import type { CommonSegment, Route } from 'soonloh';

export function makeRouteTree(routes: Route<CommonSegment>[]) {
  const root: RouteNode = {
    segment: { kind: 'static', path: '/', raw: '' },
    children: {},
  };
  for (const route of routes) {
    let target = root;
    let broken = false;
    route.segments.forEach((segment, idx, arr) => {
      if (broken) return;
      if (idx + 1 === arr.length && segment.kind === 'terminator') {
        switch (segment.path) {
          case 'layout':
            target.layout = route;
            break;
          case 'page':
            target.page = route;
            break;
        }
        broken = true;
        return;
      }
      if (!(segment.raw in target.children)) {
        target.children[segment.raw] = { segment, children: {} };
      }
      target = target.children[segment.raw]!;
    });
  }

  return {
    root,
    getLayouts(route: Route<CommonSegment>) {
      const layouts: Route<CommonSegment>[] = [];
      let target = root;
      if (target.layout) {
        layouts.push(target.layout);
      }
      for (const segment of route.segments) {
        target = target?.children[segment.raw];
        if (target?.layout) {
          layouts.push(target.layout);
        }
      }
      return layouts;
    },
  };
}

export interface RouteNode {
  segment: CommonSegment;
  page?: Route<CommonSegment>;
  layout?: Route<CommonSegment>;
  children: Record<string, RouteNode>;
}
