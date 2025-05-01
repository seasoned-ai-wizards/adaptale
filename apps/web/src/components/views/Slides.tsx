"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";

import { RevealSlides } from "~/components/elements/reveal/Reveal";
import { useSlides } from "~/contexts/SlidesContext";

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

export interface SlideTemplate extends SlideProps {
  slug?: string;
}

export interface SlideProps {
  template: string;
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
  const isHidden = true;
  const isFuture = true;
  const keyPrefix = title 
    ? btoa(title)
        .replace(/[+/=]/g, '') // Remove non-alphanumeric chars
        .substring(0, 8) 
    : '';
  return imageUrl && imageUrl != '/adaptable.png' ? <>
    <section key={keyPrefix}
      {... isHidden ? {hidden: true, className: isFuture ? "future": "past", "aria-hidden": "true"} : {}}
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
      {... isHidden ? {hidden: true, className: isFuture ? "future": "past", "aria-hidden": "true"} : {}}
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

export interface SlidesProps {
  slides?: SlideTemplate[];
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
                <img data-id="world" src="/adaptable.png" alt="Adaptable" />
                <h2>
                  We believe that people&apos;s ideas deserve better than static slides.
                </h2>
                <p>
                  There are no slides yet. Talk to your Adaptale agent to create some!
                </p>
              </div>
            </section>

            {/* Headline Image template */}
            <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
              <section data-auto-animate> {/* data-autoslide="1000" */}
                <div className="flex flex-col items-center justify-center">
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    The world&apos;s most important ideas are being held hostage by PowerPoint.
                  </h1>
                </div>
              </section>
              <section data-auto-animate>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex-1 flex items-center justify-center pr-4">
                    <h1 style={{ fontSize: "48px", textAlign: "left", padding: "20px" }}>
                      The world&apos;s most important ideas are being held hostage by PowerPoint.
                    </h1>
                  </div>
                  <div className="flex-1 flex items-center justify-center pl-4">
                    <Image
                      className="fragment fade-right" 
                      src="/adaptale-content/adaptale_ideas_hostage.png" 
                      alt="Ideas behind bars" 
                      // style={{ width: "100%", height: "auto" }} 
                      width={600}
                      height={725}
                      layout="responsive"
                    />
                  </div>
                </div>
              </section>
            </section>

            
            
          </>
        }
       

        {slides.map((slide, index) => (
          <Slide
            key={index}
            title={slide.title}
            items={slide.items}
            background={slide.background}
            imageUrl={slide.imageUrl}
          />
        ))}
        </RevealSlides>
    </div>
  );
}

export default Slides;
