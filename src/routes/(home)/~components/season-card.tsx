import { splitProps, type ComponentProps } from 'solid-js';
import type { Season } from '@/services/api/collection';

interface Props extends ComponentProps<'div'> {
  season: Season;
}
export function SeasonCard(props: Props) {
  const [local, others] = splitProps(props, ['season']);

  return (
    <div w-full min-w-0 {...others}>
      <img rounded-md src={local.season.thumbnail} />
      <h3 h-13 line-clamp-2 overflow-hidden text-ellipsis>
        {local.season.title}
      </h3>
    </div>
  );
}
