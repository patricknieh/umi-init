declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module 'unfetch';
declare module 'query-string';
declare module 'web-base';
declare module 'store';
declare module 'store/plugins/expire';
declare module 'swr';
