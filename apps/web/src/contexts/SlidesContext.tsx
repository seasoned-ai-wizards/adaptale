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

  return (
    <SlidesContext.Provider
      value={{
        revealRef,
        goTo
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
