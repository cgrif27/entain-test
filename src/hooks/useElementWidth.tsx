import { MutableRefObject, useLayoutEffect, useState } from 'react';

const useElementWidth = (ref: MutableRefObject<HTMLDivElement>): number => {
  const [height, setHeight] = useState(ref.current?.offsetWidth);

  useLayoutEffect(() => {
    const updateHeight = () => {
      setHeight(ref.current?.offsetWidth);
    };
    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, [ref]);

  return height;
};

export default useElementWidth;
