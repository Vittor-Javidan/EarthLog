type ExcludeNonObjectKeys<T> = { [K in keyof T]: T[K] extends object ? K : never; };
type ExcludeNonObject<T> = Pick<T, Exclude<keyof T, ExcludeNonObjectKeys<T>[keyof T]>>;

export function deepCopy<T extends ExcludeNonObject<T>>(object: T): T {
  return JSON.parse(JSON.stringify(object)) as T;
}
