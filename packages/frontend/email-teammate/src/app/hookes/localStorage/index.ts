import { Dispatch, useCallback, useEffect, useState } from 'react';

export default function useLocalStorage(key: string, initialValue: any = ''): [() => any, Dispatch<string>] {
  const [value, setValue] = useState(() => window.localStorage.getItem(key) || JSON.stringify(initialValue));

  const setItem = (newValue: any) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  const getItem = () => {
    return JSON.parse(value);
  };

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (value !== newValue) {
      setValue(newValue || initialValue);
    }
  }, []);

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue(event.newValue || initialValue);
      }
    },
    [value]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [getItem, setItem];
}
export const useSsrLocalStorage = (
  key: string,
  initial: string = ''
): [(key: string) => any, React.Dispatch<string>] => {
  return typeof window === 'undefined' ? [() => initial, (value: string) => undefined] : useLocalStorage(key, initial);
};
