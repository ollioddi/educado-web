import { useState, useEffect, useCallback } from 'react';

// A key to store the set of all keys managed by this hook in localStorage.
const KEYS_SET_KEY = 'useLocalStorage_managedKeys';

// Helper function to read the set of keys from localStorage.
const getManagedKeys = (): Set<string> => {
  try {
    const keysJson = window.localStorage.getItem(KEYS_SET_KEY);
    if (keysJson !== null && keysJson !== '') {
      const parsed: unknown = JSON.parse(keysJson);
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return new Set(parsed);
      }
    }
    return new Set();
  } catch (error) {
    console.error('Error reading managed keys from localStorage', error);
    return new Set();
  }
};

// Helper function to write the set of keys to localStorage.
const saveManagedKeys = (keys: Set<string>): void => {
  try {
    window.localStorage.setItem(KEYS_SET_KEY, JSON.stringify(Array.from(keys)));
  } catch (error) {
    console.error('Error saving managed keys to localStorage', error);
  }
};

/**
 * A custom React hook to store and retrieve state from localStorage.
 * It automatically tracks all keys it manages to allow for a global clear.
 *
 * @param key The key to use in localStorage.
 * @param initialValue The initial value to use if no value is found for the key.
 * @returns A stateful value, and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Function to read value from localStorage
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null && item !== '' ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // The setter function that will update state and localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // On initial mount, add this key to our managed set.
  useEffect(() => {
    const keys = getManagedKeys();
    if (!keys.has(key)) {
      keys.add(key);
      saveManagedKeys(keys);
    }
  }, [key]);

  // This effect handles changes from other tabs or windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, readValue]);


  return [storedValue, setValue] as const;
}

/**
 * Clears all values from localStorage that were created using the useLocalStorage hook.
 * This is useful for logout functionality.
 */
export const clearAllLocalStorage = () => {
  try {
    const keys = getManagedKeys();
    keys.forEach(key => {
      window.localStorage.removeItem(key);
    });
    window.localStorage.removeItem(KEYS_SET_KEY);
  } catch (error) {
    console.error('Error clearing all managed localStorage values', error);
  }
};