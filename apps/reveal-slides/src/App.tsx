import { CSSProperties, useEffect, useState } from "react";
import { RevealSlides } from "./Reveal";

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";

import "./App.css";
import { Slide } from "./components/Slide";
import { PresentationData } from "./components/types";

// import './custom_theme_starter.css';

// Define slide data using our new JSON structure
const slides: PresentationData = [
  // Welcome slide (world-1)
  {
    id: "world-1",
    type: "vertical",
    background: "/theme-world/bg1.jpeg",
    content: [
      {
        type: "heading1",
        text: "Welcome to",
        fragment: true,
        fragmentAnimation: "fade-in",
      },
      {
        type: "heading1",
        text: "My Story",
        fragment: true,
        fragmentAnimation: "fade-in",
      },
      {
        type: "paragraph",
        text: "A journey through words and images",
        fragment: true,
        fragmentAnimation: "fade-in",
      },
    ],
  },

  // My Planet section with nested slides
  {
    id: "my-planet",
    slides: [
      {
        id: "world-2",
        type: "vertical",
        background: "/theme-world/bg2.jpeg",
        autoAnimate: true,
        content: [
          {
            type: "heading1",
            text: "My Planet Earth",
            fragment: true,
            fragmentAnimation: "fade-in",
          },
          {
            type: "paragraph",
            text: "",
            fragment: true,
            fragmentAnimation: "fade-in",
          }, // This creates space for the image
        ],
      },
      {
        id: "world-3",
        type: "two-column",
        background: "/theme-world/bg2.jpeg",
        autoAnimate: true,
        imagePosition: "right",
        image: {
          src: "/world-content/planet_earth.png",
          alt: "Planet Earth",
          dataId: "world",
        },
        content: {
          title: "My Planet Earth",
          items: [
            {
              type: "paragraph",
              text: "This is Earth. For billions of years, Earth has been our amazing home, with just the right temperature for plants, animals, and people to thrive.",
            },
          ],
        },
      },
    ],
  },

  // Two-column slide with content on left (world-4)
  {
    id: "world-4",
    type: "two-column",
    background: "/theme-world/bg3.jpeg",
    imagePosition: "right",
    image: {
      src: "/world-content/planet_earth.png",
      alt: "Planet Earth",
    },
    content: {
      title: "My Planet Earth",
      items: [
        { type: "listItem", text: "This is Earth. For billions of years, " },
        {
          type: "listItem",
          text: "Earth has been our amazing home, with just the right temperature for plants, animals, and people to thrive.",
        },
        { type: "listItem", text: "Some more text here" },
      ],
    },
  },

  // Two-column slide with content on right (world-5)
  {
    id: "world-5",
    type: "two-column",
    background: "/theme-world/bg3.jpeg",
    imagePosition: "left",
    image: {
      src: "/world-content/planet_earth.png",
      alt: "Planet Earth",
    },
    content: {
      title: "My Planet Earth",
      items: [
        { type: "listItem", text: "This is Earth. For billions of years, " },
        {
          type: "listItem",
          text: "Earth has been our amazing home, with just the right temperature for plants, animals, and people to thrive.",
        },
        { type: "listItem", text: "Some more text here" },
      ],
    },
  },
];

function App() {
  const [theme, setTheme] = useState("black");
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

  useEffect(() => {
    setCustomTheme("world");
  }, []);

  console.log("PresState: ", presState);

  return (
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
      {/* Render slides using our component system */}
      {slides.map((slideData) => (
        <Slide key={slideData.id} data={slideData} />
      ))}

      {customTheme && (
        <link rel="stylesheet" href={`/theme.${customTheme}.css`} />
      )}
    </RevealSlides>
  );
}

export default App;
