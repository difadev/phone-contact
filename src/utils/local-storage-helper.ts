export const loadFromLocalStorage = (key: string) => {
  const item = typeof window !== undefined &&  window.localStorage.getItem(key);
  try {
    if (item) return JSON.parse(item);
    else throw new Error();
  } catch {
    return undefined;
  }
};

export const saveToLocalStorage:any = (key: string, state: string) => {
  if (state === undefined) {
    window.localStorage.removeItem(key);
  } else {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem(key, serializedState);
  }
};

export const clearLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
