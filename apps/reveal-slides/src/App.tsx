import { CSSProperties, useEffect, useState } from "react"
import { RevealSlides } from "./Reveal"
import { RenderSlides } from "./Slides"
import { slides } from "./slideData"

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';

import "./App.css";

// import './custom_theme_starter.css';

function App() {
  const [theme, setTheme] = useState("black")
  const [presState, setPresState] = useState({"indexh": -1, "indexv": -1, "indexf": -1, "paused": false, "overview": false })
  const [customTheme, setCustomTheme] = useState<string | undefined>(undefined);
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>("bottom-right");

  const handleOnStateChange = (state: Reveal.RevealState) => {
    console.log(state);
  }

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
      <RenderSlides slides={slides} />
      {customTheme && <link rel="stylesheet" href={`/theme.${customTheme}.css`} />}
    </RevealSlides> 
  )
}

export default App