import { FC, PropsWithChildren, createContext, useContext, useRef } from 'react';

export const BreadboardSvgContext = createContext<React.MutableRefObject<SVGSVGElement | null>>(
  {} as React.MutableRefObject<SVGSVGElement>
);

export const useBreadboardSvgRef = () => useContext(BreadboardSvgContext);

export const BreadboardSvgProvider: FC<PropsWithChildren> = ({ children }) => {
  const breadboardSvgRef = useRef<SVGSVGElement>(null);

  return (
    <BreadboardSvgContext.Provider value={breadboardSvgRef}>
      {children}
    </BreadboardSvgContext.Provider>
  );
};
