import { lazy } from "react";
import { parseISO, isValid } from "date-fns";
import * as z from "zod";

export function addBetween<T>(
  list: Array<T>,
  addItem: (sepIndex: number, before: T, after: T) => T
): Array<T> {
  return list.reduce<Array<T>>((acc, item, index) => {
    if (index > 0) {
      const before = list[index - 1];
      const sep = addItem(index - 1, before, item);
      acc.push(sep);
    }
    acc.push(item);
    return acc;
  }, []);
}

type AsyncComponentModule<K extends string | number | symbol, Component> =
  () => Promise<{ [J in K]: Component }>;

type ExtractComponentType<K extends string | number | symbol, T> =
  T extends AsyncComponentModule<K, infer Comp> ? Comp : never;

export function lazyMulti<Components extends { [keys: string]: any }>(
  components: Components
): {
  [K in keyof Components]: ExtractComponentType<K, Components[K]>;
} {
  return Object.fromEntries(
    Object.entries(components).map(([key, load]) => {
      return [
        key,
        lazy(() => (load as any)().then((exp: any) => ({ default: exp[key] }))),
      ];
    })
  ) as any;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export const ZodDateISOString = z.string().refine((val) => {
  const parsed = parseISO(val);
  return isValid(parsed);
});
