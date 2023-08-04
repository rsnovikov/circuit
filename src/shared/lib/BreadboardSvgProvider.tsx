import { FC, PropsWithChildren, createContext, useContext, useRef } from 'react';

export const BreadboardSvgContext = createContext<
  React.MutableRefObject<SVGSVGElement | undefined>
>({} as React.MutableRefObject<SVGSVGElement | undefined>);

export const useBreadboardSvgRef = () => useContext(BreadboardSvgContext);

export const BreadboardSvgProvider: FC<PropsWithChildren> = ({ children }) => {
  const breadboardSvgRef = useRef<SVGSVGElement>();

  return (
    <BreadboardSvgContext.Provider value={breadboardSvgRef}>
      {children}
    </BreadboardSvgContext.Provider>
  );
};
