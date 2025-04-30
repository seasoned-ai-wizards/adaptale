"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { RevealSlides } from "~/components/elements/reveal/Reveal";
import { useSlides, type SlideTemplate } from "~/contexts/SlidesContext";

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
  imageUrl = "/adaptable.png"
}: SlideProps) {
  const keyPrefix = title 
    ? btoa(title)
        .replace(/[+/=]/g, '') // Remove non-alphanumeric chars
        .substring(0, 8) 
    : '';
  return imageUrl && imageUrl != '/adaptable.png' ? <>
    <section key={keyPrefix}
      data-background={background}
      >
      <section key={`${keyPrefix}-1`} data-auto-animate>
          <h2 data-id={`${keyPrefix}-heading`}>{title}</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <img data-id={`${keyPrefix}-image`} src={imageUrl} style={{
                maxHeight: '500px'
              }} />
          </div>
      </section>
      <section key={`${keyPrefix}-2`} data-auto-animate>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
              <img data-id={`${keyPrefix}-image`} src={imageUrl} style={{
                maxHeight: '400px'
              }} />
            </div>
            <div style={{ flex: "1", padding: "0 20px", justifyContent: "left" }}>
              <h2 data-id={`${keyPrefix}-heading`}>{title}</h2>
              {items?.map((item, index) => (
                <p key={index}>
                  {item}
                </p>
              ))}
            </div>
          </div>
      </section>
    </section>
  </> :(
    <section key={keyPrefix} data-background={background}
      // {... isNewSlide ? {hidden: true, className: "future", "aria-hidden": "true"} : {}}
      >
      <h1 className="fragment fade-in">{title}</h1>
      {items?.map((item, index) => (
        <p key={index} className={`fragment${ index !== 0 ? ' fade-in': '' }`}>
          {item}
        </p>
      ))}
    </section>
  );
}

function Slides() {
  const [theme, setTheme] = useState("adaptale");
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>(
    "bottom-right",
  );

  const { revealRef, slides, presState, setPresState } = useSlides();

  const handleOnStateChange = useCallback((state: Reveal.RevealState) => {
    console.log('Presentation state', state);
    setPresState(state);
    // Optionally add theme changing logic here if needed
    // if (state.indexh > 4) {
    //   console.log("world");
    //   setTheme("world");
    // } else {
    //   console.log("demo");
    //   setTheme("demo");
    // }
  }, [setPresState]);

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
          <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
            <h2>
              The world&apos;s most important ideas are being held hostage by
              PowerPoint
            </h2>
          </section>
          <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
            <div className="flex flex-col items-center justify-center">
              <img data-id="world" src="/adaptable.png" alt="Adaptable" />
              <h2>
                We believe that people&apos;s ideas deserve better than static slides.
              </h2>
            </div>
          </section>
          <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
            <h2>
              It's for expert people with immense impact, above all – educators.
            </h2>
          </section>
          <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
            <h2>
              An AI-powered storytelling assistant that transforms ideas into
              impactful visuals on the go!
            </h2>
          </section>

          <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
            <h2>DEMO TIME!</h2>
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

          <section key="3" data-background="/adaptale-content/adaptale_slide_background_2.jpg">
            <h2>The end</h2>
          </section>
        </RevealSlides>
    </div>
  );
}

export default Slides;
