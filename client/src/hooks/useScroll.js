import { useState, useEffect } from "react";
export const useScroll = (ref) => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = () => {
    setState(ref.current.scrollTop);
  };
  useEffect(() => {
    const target = ref.current;
    target.addEventListener("scroll", onScroll);
    return () => {
      target.removeEventListener("scroll", onScroll);
    };
  }, []);
  return state;
};
