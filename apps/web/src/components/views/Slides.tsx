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
  template?: string;
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
                  <h1 style={{ fontSize: "64px", textAlign: "center", padding: "20px" }}>
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

            {/* Headline template */}
            <section data-background="/adaptale-content/adaptale_slide_background_2.jpg"> {/* data-autoslide="1000" */}
              <div className="flex flex-col items-center justify-center">
                <h1 style={{ fontSize: "64px", textAlign: "center", padding: "20px" }}>
                  We believe that people&apos;s ideas deserve better than static slides.
                </h1>
              </div>
            </section>

            {/* Title Image Paragraph template */}
            <section data-background="/adaptale-content/adaptale_slide_background_3.jpg">
              <div className="flex flex-col h-full">
                {/* Title row - 1/4 of slide height */}
                <div className="flex items-center justify-center" style={{ height: "25%" }}>
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    Meet Adaptale
                  </h1>
                </div>
                
                {/* Content row - 3/4 of slide height */}
                <div className="flex flex-row" style={{ height: "75%" }}>
                  {/* Image column - left side */}
                  <div className="flex items-center justify-center" style={{ flex: 1 }}>
                    <Image 
                      src="/adaptale-content/adaptale_mascot.png" 
                      alt="Adaptale Chameleon" 
                      width={640}
                      height={460}
                      layout="responsive"
                    />
                  </div>
                  
                  {/* Text column - right side */}
                  <div className="flex items-center justify-center" style={{ flex: 1 }}>
                    <h2 style={{ 
                      fontSize: "48px", 
                      textAlign: "left", 
                      padding: "20px", 
                      fontWeight: "500"
                    }}>
                      An AI-powered storytelling assistant that transforms ideas into impactful visuals on the go.
                    </h2>
                  </div>
                </div>
              </div>
            </section>

            {/* Title Paragraph template */}
            <section data-background="/adaptale-content/adaptale_slide_background_3.jpg">
              <div className="flex flex-col h-full">
                {/* Title row - takes up about 30% of the height */}
                <div className="flex items-center justify-center" style={{ height: "30%" }}>
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    Our vision
                  </h1>
                </div>
                
                {/* Content row - takes up about 70% of the height */}
                <div className="flex items-center justify-center" style={{ height: "70%" }}>
                  <h2 style={{ 
                    fontSize: "48px", 
                    textAlign: "left", 
                    padding: "0 60px", 
                    fontWeight: "500"
                  }}>
                    Is to deliver a seamless, no-hassle product that 
                    enables everyone to unleash their creativity without limitations of any tool.
                  </h2>
                </div>
              </div>
            </section>
            
            {/* Title Image template */}
            <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
              <div className="flex flex-col h-full">
                {/* Title row - takes up about 30% of the height */}
                <div className="flex items-center justify-center" style={{ height: "30%" }}>
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    Three stages
                  </h1>
                </div>
                
                {/* Image row - takes up about 70% of the height */}
                <div className="flex items-center justify-center" style={{ height: "70%" }}>
                  <Image 
                    src="/adaptale-content/adaptale_process_create_coach_present.png" 
                    alt="Three stages: Create, Coach, Present" 
                    width={800}
                    height={400}
                    layout="responsive"
                    style={{ maxWidth: "80%", height: "auto" }}
                  />
                </div>
              </div>
            </section>
            
            {/* Improved Title Image template with better aspect ratio handling */}
            <section data-background="/adaptale-content/adaptale_slide_background_1.jpg">
              <div className="flex flex-col h-full">
                {/* Title row - takes up about 30% of the height */}
                <div className="flex items-center justify-center" style={{ height: "30%" }}>
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    Three stages (improved)
                  </h1>
                </div>
                
                {/* Image row - takes up about 70% of the height */}
                <div className="flex items-center justify-center" style={{ height: "70%", position: "relative" }}>
                  <div style={{ width: "80%", maxWidth: "1400px", position: "relative", aspectRatio: "1251/593" }}>
                    <Image 
                      src="/adaptale-content/adaptale_process_create_coach_present.png" 
                      alt="Three stages: Create, Coach, Present" 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      style={{ 
                        objectFit: "contain",
                        objectPosition: "center"
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Title Image Bullets template */}
            <section data-background="/adaptale-content/adaptale_slide_background_3.jpg">
              <div className="flex flex-col h-full">
                {/* Title row - takes up about 25% of the height */}
                <div className="flex items-center justify-center" style={{ height: "25%" }}>
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    1: Create
                  </h1>
                </div>
                
                {/* Content row - takes up about 75% of the height */}
                <div className="flex flex-row" style={{ height: "75%" }}>
                  {/* Image column - left side */}
                  <div className="flex items-center justify-center" style={{ flex: 1 }}>
                    <div style={{ position: "relative", width: "80%", aspectRatio: "1/1" }}>
                      <Image 
                        src="/adaptale-content/adaptale_create.png" 
                        alt="Create Icon" 
                        fill
                        sizes="(max-width: 768px) 60vw, 400px"
                        style={{ 
                          objectFit: "contain",
                          objectPosition: "center"
                        }}
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Bullets column - right side */}
                  <div className="flex items-center justify-center title-image-bullets" style={{ flex: 1 }}>
                    <ul>
                      <li>AI creates content and accurate visuals in uniform style</li>
                      <li>Great layouts, easy to edit with text or voice prompts</li>
                      <li>No design skills required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            {/* 2: Coach slide using Title Image Bullets template */}
            <section data-background="/adaptale-content/adaptale_slide_background_3.jpg">
              <div className="flex flex-col h-full">
                {/* Title row - takes up about 25% of the height */}
                <div className="flex items-center justify-center" style={{ height: "25%" }}>
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    2: Coach
                  </h1>
                </div>
                
                {/* Content row - takes up about 75% of the height */}
                <div className="flex flex-row" style={{ height: "75%" }}>
                  {/* Image column - left side */}
                  <div className="flex items-center justify-center" style={{ flex: 1 }}>
                    <div style={{ position: "relative", width: "80%", aspectRatio: "1/1" }}>
                      <Image 
                        src="/adaptale-content/adaptale_coach.png" 
                        alt="Coach Icon" 
                        fill
                        sizes="(max-width: 768px) 60vw, 400px"
                        style={{ 
                          objectFit: "contain",
                          objectPosition: "center"
                        }}
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Bullets column - right side */}
                  <div className="flex items-center justify-center title-image-bullets" style={{ flex: 1 }}>
                    <ul>
                      <li>Interactive training with live feedback</li>
                      <li>Performance insights and improvement suggestions</li>
                      <li>Practice delivery in realistic virtual environments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            {/* 3: Present slide using Title Image Bullets template */}
            <section data-background="/adaptale-content/adaptale_slide_background_3.jpg">
              <div className="flex flex-col h-full">
                {/* Title row - takes up about 25% of the height */}
                <div className="flex items-center justify-center" style={{ height: "25%" }}>
                  <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                    3: Present
                  </h1>
                </div>
                
                {/* Content row - takes up about 75% of the height */}
                <div className="flex flex-row" style={{ height: "75%" }}>
                  {/* Image column - left side */}
                  <div className="flex items-center justify-center" style={{ flex: 1 }}>
                    <div style={{ position: "relative", width: "80%", aspectRatio: "1/1" }}>
                      <Image 
                        src="/adaptale-content/adaptale_present.png" 
                        alt="Present Icon" 
                        fill
                        sizes="(max-width: 768px) 60vw, 400px"
                        style={{ 
                          objectFit: "contain",
                          objectPosition: "center"
                        }}
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Bullets column - right side */}
                  <div className="flex items-center justify-center title-image-bullets" style={{ flex: 1 }}>
                    <ul>
                      <li>Dynamic presentation tools that adapt to your audience</li>
                      <li>Seamless transitions between different content formats</li>
                      <li>Real-time analytics to measure engagement</li>
                    </ul>
                  </div>
                </div>
              </div>
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
