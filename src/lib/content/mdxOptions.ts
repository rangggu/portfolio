import type { EvaluateOptions } from '@mdx-js/mdx';
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

type PluggableList = NonNullable<EvaluateOptions['remarkPlugins']>;

export const PRETTY_CODE_OPTIONS: PrettyCodeOptions = {
  theme: {
    light: 'github-light-high-contrast',
    dark: 'github-dark-high-contrast',
  },
  keepBackground: false,
};

export const REMARK_PLUGINS: PluggableList = [remarkGfm];
export const REHYPE_PLUGINS: PluggableList = [
  [rehypePrettyCode, PRETTY_CODE_OPTIONS],
];
