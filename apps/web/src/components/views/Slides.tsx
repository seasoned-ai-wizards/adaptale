"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import "../elements/reveal/Reveal.css";
import { RevealSlides } from "~/components/elements/reveal/Reveal";

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

export interface SlideTemplate {
  template: string;
  slug?: string;
  background?: string;
  title?: string;
  items?: string[];
  imageUrl?: string;
}

export interface SlideProps {
  title?: string;
  items?: string[];
  background?: string;
  imageUrl?: string;
}

function Slide({
  title,
  items,
  background = "/theme-world/bg1.jpeg",
  imageUrl = "/adaptable.png",
}: SlideProps) {
  return (
    <section key="world-1" data-background={background}>
      <h1 className="fragment fade-in">{title}</h1>
      {items?.map((item, index) => (
        <p key={index} className="fragment fade-in">
          {item}
        </p>
      ))}
    </section>
  );
}

interface SlidesProps {
  slides?: SlideTemplate[];
}

function Slides({ slides }: SlidesProps) {
  const [theme, setTheme] = useState("world");

  const [presState, setPresState] = useState({
    indexh: -1,
    indexv: -1,
    indexf: -1,
    paused: false,
    overview: false,
  });
  const [customTheme, setCustomTheme] = useState<string | undefined>(undefined);
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>(
    "bottom-right",
  );

  const handleOnStateChange = (state: Reveal.RevealState) => {
    console.log(state);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <RevealSlides
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
        <section data-background="/background.jpg">
          <h2>
            The world's most important ideas are being held hostage by
            PowerPoint
          </h2>
        </section>
        <section data-background="/background.jpg">
          <div className="flex flex-col items-center justify-center">
            <img data-id="world" src="/adaptable.png" alt="Adaptable" />
            <h2>
              We believe that people's ideas deserve better than static slides.
            </h2>
          </div>
        </section>
        <section data-background="/background.jpg">
          <h2>
            It’s for expert people with immense impact, above all – educators.
          </h2>
        </section>
        <section data-background="/background.jpg">
          <h2>
            An AI-powered storytelling assistant that transforms ideas into impactful visuals
            on the go!
          </h2>
        </section>

        {slides.map((slide, index) => (
          <Slide
            key={index}
            title={slide.title}
            items={slide.items}
            background={slide.background}
            imageUrl={slide.imageUrl}
          />
        ))}

        <section key="3" data-background="/background.jpg">
          <h2>The end</h2>
        </section>
        {customTheme && (
          <link rel="stylesheet" href={`/theme.${customTheme}.css`} />
        )}
      </RevealSlides>
    </div>
  );
}

export default Slides;
