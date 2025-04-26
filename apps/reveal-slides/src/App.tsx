import { CSSProperties, useEffect, useState } from "react"
import { RevealSlides } from "./Reveal"

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
    <RevealSlides key="rs-2" scrollSnap="proximity" minScale={1} maxScale={1} transition="slide" width={"100%"} margin={0.01} controlsLayout={controlsLayout} presState={presState} plugins={[RevealZoom, RevealNotes]} theme={theme} onStateChange={handleOnStateChange}  >
        <section key="world-1" data-background="/theme-world/bg1.jpeg">
            <h1 className="fragment fade-in">Welcome to</h1>
            <h1 className="fragment fade-in">My Story</h1>
            <p className="fragment fade-in">A journey through words and images</p>
        </section>
        <section key="my-planet">
          <section key="world-2" data-auto-animate data-background="/theme-world/bg2.jpeg">
              <h1 className="fragment fade-in">My Planet Earth</h1>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <img data-id="world" className="fragment fade-in" src="/world-content/planet_earth.png" alt="Planet Earth" />
              </div>
          </section>
          <section key="world-3" data-auto-animate data-background="/theme-world/bg2.jpeg">
              <h1>My Planet Earth</h1>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ flex: "1", padding: "0 20px", justifyContent: "left" }}>
                  <p>This is Earth. For billions of years, Earth has been our amazing home, with just the right temperature for plants, animals, and people to thrive.</p>
                </div>
                <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
                  <img data-id="world" src="/world-content/planet_earth.png" alt="Planet Earth" />
                </div>
              </div>
          </section>
        </section>
        <section key="world-4" data-background="/theme-world/bg3.jpeg">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div style={{ flex: "1", padding: "0 20px", justifyContent: "left" }}>
                <h2>My Planet Earth</h2>
                <ul>
                  <li>This is Earth. For billions of years, </li>
                  <li>Earth has been our amazing home, with just the right temperature for plants, animals, and people to thrive.</li>
                  <li>Some more text here</li>
                </ul>
              </div>
              <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
                <img src="/world-content/planet_earth.png" alt="Planet Earth" />
              </div>
            </div>
        </section>
        <section key="world-5" data-background="/theme-world/bg3.jpeg">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
                <img src="/world-content/planet_earth.png" alt="Planet Earth" />
              </div>
              <div style={{ flex: "1", padding: "0 20px", justifyContent: "left" }}>
                <h2>My Planet Earth</h2>
                <ul>
                  <li>This is Earth. For billions of years, </li>
                  <li>Earth has been our amazing home, with just the right temperature for plants, animals, and people to thrive.</li>
                  <li>Some more text here</li>
                </ul>
              </div>
            </div>
        </section>
      {customTheme && <link rel="stylesheet" href={`/theme.${customTheme}.css`} />}
    </RevealSlides> 
  )
}

export default App