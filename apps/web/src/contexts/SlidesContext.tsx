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

export interface SlideTemplate {
  template: string;
  slug?: string;
  background?: string;
  title?: string;
  items?: string[];
  imageUrl?: string;
}

export interface SlidesContextValue {
  revealRef?: React.Ref<RevealHandle>;
  goTo: (h: number, v?: number) => void;
  slides: SlideTemplate[];
  setSlides: React.Dispatch<React.SetStateAction<SlideTemplate[]>>;
  addSlide: (slide: SlideTemplate) => void;
  modifySlide: (slide: SlideTemplate) => void;
  removeSlide: (slug: string) => void;
  presState: {
    indexh: number;
    indexv: number;
    indexf: number;
    paused: boolean;
    overview: boolean;
  };
  setPresState: React.Dispatch<React.SetStateAction<{
    indexh: number;
    indexv: number;
    indexf: number;
    paused: boolean;
    overview: boolean;
  }>>;
}

const SlidesContext = createContext<SlidesContextValue | undefined>(undefined);

export const SlidesProvider: FC<PropsWithChildren> = ({ children }) => {
  const revealRef = useRef<RevealHandle>(null);
  const [slides, setSlides] = useState<SlideTemplate[]>([]);
  const [presState, setPresState] = useState({
    indexh: -1,
    indexv: -1,
    indexf: -1,
    paused: false,
    overview: false,
  });

  const goTo = useCallback(
    (h: number, v = 0) => {
      const reveal = revealRef.current?.getReveal();
      if (!reveal) return;
      const slide = reveal.getSlide(h, v);
      const coordinates = reveal.getIndices(slide);
      console.log(coordinates);
      return reveal.slide(h, v, 100);
    },
    [revealRef],
  );

  const addSlide = useCallback((slide: SlideTemplate) => {
    setSlides((prevSlides) => [...prevSlides.map(s => ({...s})), slide]);
  }, []);

  const modifySlide = useCallback((slide: SlideTemplate) => {
    setSlides((prevSlides) =>
      prevSlides.map((s) => {
        if (s.slug === slide.slug) {
          return {
            ...s,
            title: slide.title ?? s.title,
            items: slide.items ?? s.items,
            template: slide.template ?? s.template,
            imageUrl: slide.imageUrl ?? s.imageUrl,
            background: slide.background ?? s.background,
          };
        }
        return {...s};
      }),
    );
  }, []);

  const removeSlide = useCallback((slug: string) => {
    setSlides((prevSlides) => prevSlides.filter((slide) => slide.slug !== slug));
  }, []);

  return (
    <SlidesContext.Provider 
      value={{ 
        revealRef, 
        goTo, 
        slides, 
        setSlides, 
        addSlide,
        modifySlide,
        removeSlide,
        presState,
        setPresState
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
