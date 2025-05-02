"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";

import { RevealSlides } from "~/components/elements/reveal/Reveal";
import { useSlides } from "~/contexts/SlidesContext";
import { Slide, type SlideData, SlideTemplate } from "~/components/elements/slides/Slide";

const RevealZoom = dynamic(() => import("reveal.js/plugin/zoom/zoom"), {
  ssr: false,
});
const RevealNotes = dynamic(() => import("reveal.js/plugin/notes/notes"), {
  ssr: false,
});

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
// import RevealNotes from "reveal.js/plugin/notes/notes";
// import RevealZoom from "reveal.js/plugin/zoom/zoom";

// import './custom_theme_starter.css';

export interface SlidesProps {
  slides?: SlideData[];
}

function Slides({ slides = [] }: SlidesProps) {
  const [theme, setTheme] = useState("adaptale");

  const [presState, setPresState] = useState({
    indexh: -1,
    indexv: -1,
    indexf: -1,
    paused: false,
    overview: false,
  });
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>(
    "bottom-right",
  );

  const { revealRef } = useSlides();

  const handleOnStateChange = useCallback((state: Reveal.RevealState) => {
    // setPresentationState(state);
  }, []);


  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center basis-4/5">
      <RevealSlides
        ref={revealRef}
        key="rs-2"
        scrollSnap="proximity"
        minScale={1}
        maxScale={1}
        transition="slide"
        width={"100%"}
        margin={0.01}
        controlsLayout={controlsLayout}
        presState={presState}
        plugins={[RevealZoom, RevealNotes]}
        theme={theme}
        onStateChange={handleOnStateChange}
      >
        {
          !slides?.length && 
          <>
            <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
              <div className="flex flex-col items-center justify-center">
                <img data-id="world" src="/adaptale.png" alt="Adaptable" />
                <h2>
                  We believe that people&apos;s ideas deserve better than static slides.
                </h2>
                <p>
                  There are no slides yet. Talk to your Adaptale agent to create some!
                </p>
              </div>
            </section>
            
          </>
        }
       

        {slides.map((slide, index) => (
          <Slide
            key={index}
            slug={slide.slug}
            template={slide.template}
            title={slide.title}
            items={slide.items}
            background={slide.background}
            imageUrl={slide.imageUrl}
            paragraph={slide.paragraph}
          />
        ))}
        </RevealSlides>
    </div>
  );
}

export default Slides;
