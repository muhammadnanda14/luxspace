import { useRef, useLayoutEffect, useCallback } from "react";

export default function useSafeDispatch(dispatch) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  // ... maksudnya di spread
  return useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch]);
}
