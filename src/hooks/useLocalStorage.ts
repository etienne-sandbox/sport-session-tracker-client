import { useCallback, useState } from "react";

export function useLocalStorage(
  key: string,
  defaultValue: string | null = null
): [string | null, (val: string | null) => void] {
  const [val, setVal] = useState<string | null>(
    () => window.localStorage.getItem(key) ?? defaultValue
  );

  const set = useCallback(
    (val: string | null) => {
      if (val === null) {
        window.localStorage.removeItem(key);
        setVal(null);
      } else {
        window.localStorage.setItem(key, val);
        setVal(val);
      }
    },
    [key]
  );

  return [val, set];
}
