import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from "react";
import { RevealHandle } from "~/components/elements/reveal/Reveal";

export interface SlidesContextValue {
  revealRef?: React.Ref<RevealHandle>;
  goTo: (h: number, v?: number) => void;
}

const SlidesContext = createContext<SlidesContextValue | undefined>(undefined);

export const SlidesProvider: FC<PropsWithChildren> = ({ children }) => {
  const revealRef = useRef<RevealHandle>(null);

  const goTo = useCallback(
    (h: number, v: number = 0) => {
      return revealRef.current?.getReveal()?.slide(h, v, 100);
    },
    [revealRef],
  );

  return (
    <SlidesContext.Provider value={{ revealRef, goTo }}>
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
