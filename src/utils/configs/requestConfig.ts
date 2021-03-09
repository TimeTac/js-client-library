// This is the serializable RequestParam data that can be passer around in Redux actions (the builder can't).
// _type is unused, was added only to preserve the generic type for type checking
export type RequestConfig<R> = {
  originalRequestStartTime?: string;
  params: Record<string, string>;
  _type?: R;
};
