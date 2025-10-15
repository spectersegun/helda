import { useEffect, useState } from "react";

export function useUrlManager() {
  const [params, setParams] = useState<Record<string, string>>({});

  // Parse the URL when it changes
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      currentParams[key] = value;
    });
    setParams(currentParams);
  }, [window.location.search]);

  // Update the URL without reloading the page
  const setUrl = (newParams: Record<string, string>, replace = false) => {
    const url = new URL(window.location.href);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] === null) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, newParams[key]);
      }
    });
    if (replace) {
      window.history.replaceState({}, "", url.toString());
    } else {
      window.history.pushState({}, "", url.toString());
    }

    // Trigger state update
    const updatedParams: Record<string, string> = {};
    url.searchParams.forEach((v, k) => (updatedParams[k] = v));
    setParams(updatedParams);
  };

  return [params, setUrl] as const;
}
