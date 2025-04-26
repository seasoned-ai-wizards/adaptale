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
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>("edges");

  const handleOnStateChange = (state: Reveal.RevealState) => {
    console.log(state);
  }

  useEffect(() => {
    setCustomTheme("world");
  }, []);


  console.log("PresState: ", presState);

  return (
    <RevealSlides key="rs-2" scrollSnap="proximity" minScale={1} maxScale={1} transition="slide" width={"100%"} margin={0.01} view="scroll" controlsLayout={controlsLayout} presState={presState} plugins={[RevealZoom, RevealNotes]} theme={theme} onStateChange={handleOnStateChange}  >
        <section key="0">
          <section key="0-0" data-auto-animate data-background-color="#0c1821">
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
              <div style={{position: "absolute", left: "-100vw", top: "0px", width: "100vw", height: "100vh", backgroundColor: "#e9e7e6", zIndex: "3"}}></div>
              <h2 style={{color: "#E7AD52", opacity: 1, height: "5.8vw", fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw", zIndex: "3"}}>react-reveal-slides</h2>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "0px", backgroundColor: "black", overflow: "hidden", borderRadius: "0rem", zIndex: "3"}}>
                <img src="man-walking.jpg" alt="man-walking" style={{filter: "brightness(0.75)", maxWidth: "unset", minWidth: "100vw", maxHeight: "unset"}} />
              </div>
            </div>
          </section>
          <section key="0-0-a" data-auto-animate data-background-color="#0c1821">
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>  
              <div style={{position: "absolute", left: "0px", top: "0px", width: "100vw", height: "100vh", backgroundColor: "#e9e7e6", zIndex: "3", animation: "bgSlideInFromLeft 1.2s ease-in-out"}}></div>
              <h2 style={{color: "#E7AD52", opacity: 0, height: 0, fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw", zIndex: "3", animation: "firstTitleOut 1s ease-in-out"}}>react-reveal-slides</h2>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "64vw", height: "32vw", backgroundColor: "black", overflow: "hidden", borderRadius: "1.2rem", animation: "growWindow 1s ease-in-out", zIndex: "3"}}>
                <img src="man-walking.jpg" alt="man-walking" style={{filter: "brightness(0.75)", maxWidth: "unset", minWidth: "90vw", maxHeight: "unset", animation: "imgZoomOut 1s ease-in-out"}} />
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", transform: "translate(-50%, -64%)", animation: "fadeIn2 1.2s ease-in-out"}}>REACT</div>
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", transform: "translate(-50%, 2%)", animation: "fadeIn2 1.2s ease-in-out"}}>+</div>
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", transform: "translate(-50%, 70%)", animation: "fadeIn2 1.2s ease-in-out"}}>REVEAL.JS</div>
              </div>
            </div>
          </section>
          <section data-background-color="#222222" key="0-1" style={{fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw"}}>
              <p className="fragment fade-in-then-semi-out" data-fragment-index="0" style={{lineHeight: "0.9"}}>ADD PRESENTATIONS TO REACT APPS</p>
              <p className="fragment fade-in-then-semi-out" style={{lineHeight: "0.9"}}>ADD REACT COMPONENTS TO PRESENTATIONS</p>
              <p className="fragment fade-in-then-semi-out" style={{lineHeight: "0.9"}}>MAKE REVEAL PRESENTATIONS EVEN MORE DYNAMIC</p>
          </section>
        </section>
        <section key="1" >
          <section key="1-0">
            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2.5rem"}}>
              <div style={{height: "100%", maxWidth: "43rem", padding: "2rem", display: "flex", flexDirection: "column"}}>
                <h4 style={{color: "#f17a52", textAlign: "left"}}> 
                Free reign over your projects
                </h4>
                <p style={{textAlign: "left"}}> 
                  <span className="fragment fade-in-then-semi-out" style={{marginLeft: "0.35rem", marginRight: "0.35rem"}}>
                  This package makes no efforts to impead or restrict what you can or cannot do.
                  </span>
                  <span className="fragment fade-in-then-semi-out" style={{marginLeft: "0.35rem", marginRight: "0.35rem"}}>
                  You can still add javascript in the usual ways inside and outside the React framework.
                  </span>
                  <span className="fragment fade-in-then-semi-out" style={{marginLeft: "0.35rem", marginRight: "0.35rem"}}>
                    And the same goes for styling.
                  </span>
                </p>
              </div>
              <div id="liquid-image2" style={{maxHeight: "75vh", maxWidth: "50vh", minWidth: "200px", minHeight: "300px", height: "450px", width: "300px", marginRight: "3rem", borderRadius: "1rem", overflow: "hidden"}}>
                <img src="/black-notebook.jpg" alt="some image" />
              </div>
            </div>
          </section>
          <section key="1-1" data-auto-animate="" data-background-color="#222222">
            <p style={{padding: "1vh 16vw"}}>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
          </section>
          <section key="1-2" data-auto-animate="" data-background-color="#222222">  
            <p style={{padding: "1vh 16vw"}}>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
            <p style={{padding: "1vh 16vw"}}>Simply put, React already takes care of converting JSX into something Reveal.js can work with.</p>
          </section>
          <section key="1-3" data-auto-animate="" data-background-color="#222222">
            <p style={{padding: "1vh 16vw"}}>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
            <p style={{padding: "1vh 16vw"}}>Simply put, React already takes care of converting JSX into something Reveal.js can work with.</p>
            <p style={{padding: "1vh 16vw"}}>So, if you can make a React component, you can make a Reveal.js slide.</p>
          </section>
        </section>
        <section key="2" data-background-color="#dedede" style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "4rem"}}>
          <h4 style={{color: "#f17a52", textAlign: "center", marginBottom: "3rem"}}> 
            Related projects
          </h4>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "3rem", maxWidth: "100%", maxHeight: "70vh", flexWrap: "wrap"}}>
            <div>test</div>
            <div>test1</div>
            <div>test2</div>
          </div>
        </section>
        <section key="3" data-background-color="#dedede">
          <h2>The end</h2>
        </section>
      {customTheme && <link rel="stylesheet" href={`/theme.${customTheme}.css`} />}
    </RevealSlides> 
  )
}

export default App