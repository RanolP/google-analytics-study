export interface LinkMap {
  // layout.tsx
  "/"?: never
  // membership/page.tsx
  "/membership"?: never
  // (home)/page.tsx
  "/"?: never
};

export function path<
  K extends keyof {
    [K in keyof LinkMap as LinkMap[K] extends {} ? never : K]: 1;
  },
>(key: K): string;
export function path<
  K extends keyof {
    [K in keyof LinkMap as LinkMap[K] extends {} ? K : never]: 1;
  },
>(key: K, props: LinkMap[K]): string;
export function path<K extends keyof LinkMap>(key: K, props?: LinkMap[K]) {
  return key.replace(/\{\*?(.+)\}\??/, (_, name) => {
    const value = ((props ?? {}) as Record<string, string>)[name];
    return Array.isArray(value) ? value.join('/') : value;
  });
}
