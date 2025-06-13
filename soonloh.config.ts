import { config } from 'soonloh';
import { snzrwm } from 'soonloh/builtin-parsers';
import { genLink } from 'soonloh/builtin-generators';
import { genSolidRouter } from './soonloh/generators/solid-router.ts';

export default config({
  routerRoot: 'src/routes',
  parser: snzrwm.parser({}),
  generators: [
    genLink({
      targetPath: () => 'src/shared/routes/link.ts',
      filter(terminator) {
        return terminator === 'page';
      },
    }),
    genSolidRouter({ root: '@/routes' }),
  ],
});
