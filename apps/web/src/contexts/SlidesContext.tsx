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
  setPresentationState: (state: Reveal.RevealState) => void;
  presentationState: Reveal.RevealState;
}

const defaultPresentationState: Reveal.RevealState = {
  indexh: -1,
  indexv: -1,
  indexf: -1,
  paused: false,
  overview: false,
};

const SlidesContext = createContext<SlidesContextValue | undefined>(undefined);

export const SlidesProvider: FC<PropsWithChildren> = ({ children }) => {
  const revealRef = useRef<RevealHandle>(null);
  const [presentationState, setPresentationState] = useState<Reveal.RevealState>(defaultPresentationState);

  const goTo = useCallback(
    (h: number, v = 0, f = 100) => {
      const reveal = revealRef.current?.getReveal();
      if (!reveal) return;
      const slide = reveal.getSlide(h, v);
      const coordinates = reveal.getIndices(slide);
      console.log(coordinates);
      return reveal.slide(h, v, f);
    },
    [revealRef],
  );
  
  const handleSetPresentationState = useCallback((state: Reveal.RevealState) => {
    console.log('Presentation state', state);
    setPresentationState(state);
  }, []);

  return (
    <SlidesContext.Provider value={{ 
      revealRef, 
      goTo, 
      setPresentationState: handleSetPresentationState,
      presentationState 
    }}>
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
