import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { type RevealHandle } from "~/components/elements/reveal/Reveal";

export interface SlidesContextValue {
  revealRef?: React.Ref<RevealHandle>;
  goTo: (horizontal: number, vertical?: number, fragment?: number) => void;
  refresh: () => void;
}


const SlidesContext = createContext<SlidesContextValue | undefined>(undefined);

export const SlidesProvider: FC<PropsWithChildren> = ({ children }) => {
  const revealRef = useRef<RevealHandle>(null);

  const goTo = useCallback(
    (h: number, v = 0, f = 100) => {
      const reveal = revealRef.current?.getReveal();
      if (!reveal) return;
      return reveal.slide(h, v, f);
    },
    [revealRef],
  );

  const refresh = useCallback(() => {
    const reveal = revealRef.current?.getReveal();
    if (!reveal) return;
    const slide = reveal.getCurrentSlide();
    const coordinates = reveal.getIndices(slide);
    const { h, v, f } = coordinates;
    console.log('Refresh coordinates', coordinates);
    return reveal.slide(h, v, f);
  }, [revealRef]);

  return (
    <SlidesContext.Provider
      value={{
        revealRef,
        goTo,
        refresh,
      }}
    >
      {children}
    </SlidesContext.Provider>
  );
};

export function useSlides(): SlidesContextValue {
  const context = useContext(SlidesContext);
  if (!context) {
    throw new Error("useSlides must be used within a SlidesProvider");
  }
  return context;
}
