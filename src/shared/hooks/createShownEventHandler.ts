interface Options {
  init?: IntersectionObserverInit;
}
export function createShownEventHandler<Context = {}>(
  callback: (entry: IntersectionObserverEntry, ctx: Context) => void,
  options: Options = {}
) {
  const context = new Map<Element, Context>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      callback(entry, context.get(entry.target)!);
    }
  }, options.init);

  const watch =
    (ctx: Context) =>
    <T extends Element>(element: T): T => {
      observer.observe(element);
      context.set(element, ctx);
      return element;
    };

  return { watch };
}
