"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "reveal.js/dist/reveal.css";
import "reveal.js/plugin/highlight/monokai.css";
import "./Reveal.css";

import type RevealType from "reveal.js";


// import "../node_modules/reveal.js/dist/theme/moon.css";

const defaultConfigProps = {
  // The "normal" size of the presentation, aspect ratio will be preserved
  // when the presentation is scaled to fit different resolutions
  width: 900,
  height: 860,

  // Factor of the display size that should remain empty around the content
  margin: 0.05,

  // Bounds for smallest/largest possible scale to apply to content
  minScale: 0.1,
  maxScale: 3.0,

  // Display presentation control arrows
  controls: true,

  // Help the user learn the controls by providing hints, for example by
  // bouncing the down arrow when they first encounter a vertical slide
  controlsTutorial: true,

  // Determines where controls appear, "edges" or "bottom-right"
  controlsLayout: "edges",

  embedded: true,

  // Visibility rule for backwards navigation arrows; "faded", "hidden"
  // or "visible"
  controlsBackArrows: "faded",

  // Display a presentation progress bar
  progress: true,

  // Display the page number of the current slide
  // - true:    Show slide number
  // - false:   Hide slide number
  //
  // Can optionally be set as a string that specifies the number formatting:
  // - "h.v":	  Horizontal . vertical slide number (default)
  // - "h/v":	  Horizontal / vertical slide number
  // - "c":	  Flattened slide number
  // - "c/t":	  Flattened slide number / total slides
  //
  // Alternatively, you can provide a function that returns the slide
  // number for the current slide. The function should take in a slide
  // object and return an array with one string [slideNumber] or
  // three strings [n1,delimiter,n2]. See #formatSlideNumber().
  slideNumber: false,

  // Can be used to limit the contexts in which the slide number appears
  // - "all":      Always show the slide number
  // - "print":    Only when printing to PDF
  // - "speaker":  Only in the speaker view
  showSlideNumber: "all",

  // Use 1 based indexing for # links to match slide number (default is zero
  // based)
  hashOneBasedIndex: false,

  // Add the current slide number to the URL hash so that reloading the
  // page/copying the URL will return you to the same slide
  hash: false,

  // Flags if we should monitor the hash and change slides accordingly
  respondToHashChanges: true,

  // Enable support for jump-to-slide navigation shortcuts
  jumpToSlide: true,

  // Push each slide change to the browser history.  Implies `hash: true`
  history: false,

  // Enable keyboard shortcuts for navigation
  keyboard: true,

  // Optional function that blocks keyboard events when retuning false
  //
  // If you set this to 'focused', we will only capture keyboard events
  // for embedded decks when they are in focus
  keyboardCondition: null,

  // Disables the default reveal.js slide layout (scaling and centering)
  // so that you can use custom CSS layout
  disableLayout: false,

  // Enable the slide overview mode
  overview: true,

  // Vertical centering of slides
  center: true,

  // Enables touch navigation on devices with touch input
  touch: true,

  // Loop the presentation
  loop: false,

  // Change the presentation direction to be RTL
  rtl: false,

  // Changes the behavior of our navigation directions.
  //
  // "default"
  // Left/right arrow keys step between horizontal slides, up/down
  // arrow keys step between vertical slides. Space key steps through
  // all slides (both horizontal and vertical).
  //
  // "linear"
  // Removes the up/down arrows. Left/right arrows step through all
  // slides (both horizontal and vertical).
  //
  // "grid"
  // When this is enabled, stepping left/right from a vertical stack
  // to an adjacent vertical stack will land you at the same vertical
  // index.
  //
  // Consider a deck with six slides ordered in two vertical stacks:
  // 1.1    2.1
  // 1.2    2.2
  // 1.3    2.3
  //
  // If you're on slide 1.3 and navigate right, you will normally move
  // from 1.3 -> 2.1. If "grid" is used, the same navigation takes you
  // from 1.3 -> 2.3.
  navigationMode: "default",

  // Randomizes the order of slides each time the presentation loads
  shuffle: false,

  // Turns fragments on and off globally
  fragments: true,

  // Flags whether to include the current fragment in the URL,
  // so that reloading brings you to the same fragment position
  fragmentInURL: true,

  // Flags if we should show a help overlay when the question-mark
  // key is pressed
  help: true,

  // Flags if it should be possible to pause the presentation (blackout)
  pause: true,

  // Flags if speaker notes should be visible to all viewers
  showNotes: false,

  // Flags if slides with data-visibility="hidden" should be kep visible
  showHiddenSlides: false,

  // Global override for autoplaying embedded media (video/audio/iframe)
  // - null:   Media will only autoplay if data-autoplay is present
  // - true:   All media will autoplay, regardless of individual setting
  // - false:  No media will autoplay, regardless of individual setting
  autoPlayMedia: null,

  // Global override for preloading lazy-loaded iframes
  // - null:   Iframes with data-src AND data-preload will be loaded when within
  //           the viewDistance, iframes with only data-src will be loaded when visible
  // - true:   All iframes with data-src will be loaded when within the viewDistance
  // - false:  All iframes with data-src will be loaded only when visible
  preloadIframes: null,

  // Can be used to globally disable auto-animation
  autoAnimate: true,

  // Optionally provide a custom element matcher that will be
  // used to dictate which elements we can animate between.
  autoAnimateMatcher: null,

  // Default settings for our auto-animate transitions, can be
  // overridden per-slide or per-element via data arguments
  autoAnimateEasing: "ease",
  autoAnimateDuration: 1.0,
  autoAnimateUnmatched: true,

  // CSS properties that can be auto-animated. Position & scale
  // is matched separately so there's no need to include styles
  // like top/right/bottom/left, width/height or margin.
  autoAnimateStyles: [
    "opacity",
    "color",
    "background-color",
    "padding",
    "font-size",
    "line-height",
    "letter-spacing",
    "border-width",
    "border-color",
    "border-radius",
    "outline",
    "outline-offset",
  ],

  // Controls automatic progression to the next slide
  // - 0:      Auto-sliding only happens if the data-autoslide HTML attribute
  //           is present on the current slide or fragment
  // - 1+:     All slides will progress automatically at the given interval
  // - false:  No auto-sliding, even if data-autoslide is present
  autoSlide: 0,

  // Stop auto-sliding after user input
  autoSlideStoppable: true,

  // Use this method for navigation when auto-sliding (defaults to navigateNext)
  autoSlideMethod: null,

  // Specify the average time in seconds that you think you will spend
  // presenting each slide. This is used to show a pacing timer in the
  // speaker view
  defaultTiming: null,

  // Enable slide navigation via mouse wheel
  mouseWheel: false,

  // Opens links in an iframe preview overlay
  // Add `data-preview-link` and `data-preview-link="false"` to customise each link
  // individually
  previewLinks: false,

  // Exposes the reveal.js API through window.postMessage
  postMessage: true,

  // Dispatches all reveal.js events to the parent window through postMessage
  postMessageEvents: false,

  // Focuses body when page changes visibility to ensure keyboard shortcuts work
  focusBodyOnPageVisibilityChange: true,

  // Transition style
  transition: "slide", // none/fade/slide/convex/concave/zoom

  // Transition speed
  transitionSpeed: "default", // default/fast/slow

  // Transition style for full page slide backgrounds
  backgroundTransition: "fade", // none/fade/slide/convex/concave/zoom

  // Parallax background image
  parallaxBackgroundImage: "", // CSS syntax, e.g. "a.jpg"

  // Parallax background size
  parallaxBackgroundSize: "", // CSS syntax, e.g. "3000px 2000px"

  // Parallax background repeat
  parallaxBackgroundRepeat: "", // repeat/repeat-x/repeat-y/no-repeat/initial/inherit

  // Parallax background position
  parallaxBackgroundPosition: "", // CSS syntax, e.g. "top left"

  // Amount of pixels to move the parallax background per slide step
  parallaxBackgroundHorizontal: null,
  parallaxBackgroundVertical: null,

  // Can be used to initialize reveal.js in one of the following views:
  // - print:   Render the presentation so that it can be printed to PDF
  // - scroll:  Show the presentation as a tall scrollable page with scroll
  //            triggered animations
  view: null,

  // Adjusts the height of each slide in the scroll view.
  // - full:       Each slide is as tall as the viewport
  // - compact:    Slides are as small as possible, allowing multiple slides
  //               to be visible in parallel on tall devices
  scrollLayout: "full",

  // Control how scroll snapping works in the scroll view.
  // - false:   	No snapping, scrolling is continuous
  // - proximity:  Snap when close to a slide
  // - mandatory:  Always snap to the closest slide
  //
  // Only applies to presentations in scroll view.
  scrollSnap: "mandatory",

  // Enables and configure the scroll view progress bar.
  // - 'auto':    Show the scrollbar while scrolling, hide while idle
  // - true:      Always show the scrollbar
  // - false:     Never show the scrollbar
  scrollProgress: "auto",

  // Automatically activate the scroll view when we the viewport falls
  // below the given width.
  scrollActivationWidth: 435,

  // The maximum number of pages a single slide can expand onto when printing
  // to PDF, unlimited by default
  pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,

  // Prints each fragment on a separate slide
  pdfSeparateFragments: true,

  // Offset used to reduce the height of content within exported PDF pages.
  // This exists to account for environment differences based on how you
  // print to PDF. CLI printing options, like phantomjs and wkpdf, can end
  // on precisely the total height of the document whereas in-browser
  // printing has to end one pixel before.
  pdfPageHeightOffset: -1,

  // Number of slides away from the current that are visible
  viewDistance: 3,

  // Number of slides away from the current that are visible on mobile
  // devices. It is advisable to set this to a lower number than
  // viewDistance in order to save resources.
  mobileViewDistance: 2,

  // The display mode that will be used to show slides
  display: "block",

  // Hide cursor if inactive
  hideInactiveCursor: true,

  // Time before the cursor is hidden (in ms)
  hideCursorTime: 5000,

  // Should we automatically sort and set indices for fragments
  // at each sync? (See Reveal.sync)
  sortFragmentsOnSync: true,

  // Script dependencies to load
  dependencies: [],

  // Plugin objects to register and use for this presentation
  plugins: [],
};

const themes = [
  "adaptale",
  "black",
  "white",
  "league",
  "beige",
  "sky",
  "night",
  "serif",
  "simple",
  "solarized",
  "blood",
  "moon",
  "night",
  "world",
  "demo",
  "none",
];

// https://mzl.la/2LP6mjP
// Comparison function to JSON.stringify that can handle
// circular references and ignores internal React properties.
const circular = () => {
  const seen = new WeakSet();
  return (key: string, value: unknown) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};

export type RevealHandle = {
  getReveal: () => Reveal.Api | null;
};

interface RevealExtendedOptions extends Reveal.Options {
  // Can be used to initialize reveal.js in one of the following views:
  // - print:   Render the presentation so that it can be printed to PDF
  // - scroll:  Show the presentation as a tall scrollable page with scroll
  //            triggered animations
  view?: "print" | "scroll" | null;

  // Adjusts the height of each slide in the scroll view.
  // - full:       Each slide is as tall as the viewport
  // - compact:    Slides are as small as possible, allowing multiple slides
  //               to be visible in parallel on tall devices
  scrollLayout?: "full" | "compact";

  // Control how scroll snapping works in the scroll view.
  // - false:   	No snapping, scrolling is continuous
  // - proximity:  Snap when close to a slide
  // - mandatory:  Always snap to the closest slide
  //
  // Only applies to presentations in scroll view.
  scrollSnap?: false | "proximity" | "mandatory";

  // Enables and configure the scroll view progress bar.
  // - 'auto':    Show the scrollbar while scrolling, hide while idle
  // - true:      Always show the scrollbar
  // - false:     Never show the scrollbar
  scrollProgress?: "auto" | boolean;

  // Automatically activate the scroll view when we the viewport falls
  // below the given width.
  scrollActivationWidth?: number;
}

interface RevealSlidesProps extends RevealExtendedOptions {
  theme?: string;
  presState?: Reveal.RevealState;
  disable?: boolean;
  transitionOnThemeLoaded?: string;
  onStateChange?: (state: Reveal.RevealState) => void;
  children?: React.ReactNode[] | React.ReactNode;
}

// RevealSlides is the main component.
export const RevealSlides = forwardRef<RevealHandle, RevealSlidesProps>(
  (
    {
      theme = "black",
      presState = {
        indexh: -1,
        indexv: -1,
        indexf: -1,
        paused: false,
        overview: false,
      },
      disable = false,
      transitionOnThemeLoaded = "opacity 500ms ease-in-out",
      onStateChange,
      children,
      ...configProps
    }: RevealSlidesProps,
    ref: React.Ref<RevealHandle>,
  ) => {
    const [visible, setVisible] = useState(false);

    const revealDivRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<Reveal.Api | null>(null);

    const presStateStr = JSON.stringify(presState);
    const childrenStr = JSON.stringify(children, circular());

    // Expose the Reveal API to the parent component
    useImperativeHandle(ref, () => ({
      getReveal: () => {
        return revealRef.current;
      },
    }));

    // This function is likely to be removed in the future.
    const setupConfig = (config: Reveal.Options): object => {
      return { ...defaultConfigProps, ...config };
    };

    // The numerous useEffect calls are because Reveal is not a React function and yet it makes
    // changes to the DOM and has its own state (independently). So it is important to make
    // sure react has rendered the elements before Reveal alters them. To put it another way,
    // Reveal API will cause effects. This makes useEffect the best place to call the Reveal API
    // functions such as initialize, configure, and setState.

    // Initialize reveal.js
    useEffect(() => {
      if (revealRef.current) return;
      const configuration = setupConfig(configProps);
      import("reveal.js").then((mod) => {
        const RevealClass = mod.default;
        revealRef.current = new RevealClass(revealDivRef.current!, configuration);
        revealRef.current.initialize().then(() => {
          // reveal.js is ready
          // For some yet to be determined reason, the highlight plugin is not initializing.
          // Setting highlight config option highlightOnLoad to true (before passing to initialize function)
          // does not work
          // To Do: make sure the highlight plugin only changes the HTML involving the code once instead of many times.
          // Possible solution is to make a change to the plugin init function.
          const highlighter = revealRef.current!.getPlugin("highlight");
          if (highlighter) {
            highlighter.init && highlighter.init(revealRef.current!);
          }

          // Add state change handling
          if (onStateChange) {
            // Send slide position indecies back to Streamlit on initialization and on slide change
            onStateChange(revealRef.current!.getState());

            revealRef.current!.on("slidechanged", () => {
              onStateChange(revealRef.current!.getState());
            });
            revealRef.current!.on("fragmentshown", () => {
              // event.fragment = the fragment DOM element
              console.log("fragment shown");
              onStateChange(revealRef.current!.getState());
            });
            revealRef.current!.on("fragmenthidden", () => {
              // event.fragment = the fragment DOM element
              onStateChange(revealRef.current!.getState());
            });
            revealRef.current!.on("overviewshown", () => {
              // event.overview = the overview DOM element
              onStateChange(revealRef.current!.getState());
            });
            revealRef.current!.on("overviewhidden", () => {
              // event.overview = the overview DOM element
              onStateChange(revealRef.current!.getState());
            });
            revealRef.current!.on("paused", () => {
              // event.fragment = the fragment DOM element
              onStateChange(revealRef.current!.getState());
            });
            revealRef.current!.on("resumed", () => {
              // event.fragment = the fragment DOM element
              onStateChange(revealRef.current!.getState());
            });
          }

          const presState = JSON.parse(presStateStr);
          if (Object.keys(presState).length !== 0) {
            revealRef.current!.setState(presState);
          }

          console.log("Reveal initialized");
        });
      });

      return () => {
        if (!revealRef.current) return;
        try {
          revealRef.current.destroy();
          revealRef.current = null;
        } catch (e) {
          console.warn("Reveal.destroy() call failed.");
        }
      };
    }, []);

    useLayoutEffect(() => {
      console.log("theme adjust");
      if (!theme || theme === "none" || !themes.includes(theme)) return;
      // Dynamically import the theme CSS file
      import(`./reveal-themes/${theme}.css`)
        .then(() => {
          console.log("Theme loaded: ", theme);
          try {
            revealRef.current!.layout();
            setVisible(true);
          } catch (e) {
            console.warn("Reveal.layout() call failed.");
            setVisible(true);
          }
        })
        .catch((err) => {
          console.warn("Failed CSS import: ", err);
          setVisible(true);
        });
    }, [theme]);

    useEffect(() => {
      if (revealRef.current?.isReady()) {
        revealRef.current.configure(configProps);
        revealRef.current.layout();
      }
    }, [configProps]);

    // When reveal.js is ready (after initialization or reconfiguration),
    // set the initial state if it is passed in from Streamlit.
    useEffect(() => {
      const presState = JSON.parse(presStateStr);
      if (revealRef.current?.isReady() && Object.keys(presState).length !== 0) {
        revealRef.current.setState(presState);
      }
    }, [presStateStr]);

    // Disable reveal.js if disable is true
    useEffect(() => {
      if (revealRef.current?.isReady()) {
        if (disable) {
          revealRef.current.togglePause(true);
          const viewport = revealRef.current.getViewportElement();
          if (viewport) {
            viewport.style.pointerEvents = "none";
          }
        } else {
          revealRef.current.togglePause(false);
          const viewport = revealRef.current.getViewportElement();
          if (viewport) {
            viewport.style.pointerEvents = "auto";
          }
        }
      }
    }, [disable]);

    // When the children change, sync slides and adjust the layout
    useEffect(() => {
      console.log("children adjust");
      const children = JSON.parse(childrenStr);
      console.log('Prev indices', revealRef.current?.getIndices());
      console.log('Prev horizontal slides', revealRef.current?.getHorizontalSlides());
      console.log('Prev state', revealRef.current?.getState());
      if (revealRef.current?.isReady() && children) {
        revealRef.current.sync();
        revealRef.current.layout();
        console.log('Current indices', revealRef.current.getIndices());
        console.log('Current horizontal slides', revealRef.current.getHorizontalSlides());
        console.log('Current state', revealRef.current.getState());
        const currentSlide = revealRef.current.getCurrentSlide();
        const coordinates = revealRef.current.getIndices(currentSlide);
        const { h, v, f } = coordinates;
        console.log('Refresh coordinates', coordinates);
        revealRef.current.slide(h, v, f);
      }
    }, [childrenStr]);

    // Adjust layout after every render.
    // There are many things that can cause the layout to change,
    // including changes in the parent, configuration options,
    // container size, and changes in the child elements.
    useLayoutEffect(() => {
      console.log("layout adjust");
      if (revealRef.current?.isReady()) {
        revealRef.current.layout();
      }
    });

    return (
      <div
        className="reveal"
        ref={revealDivRef}
        style={{
          opacity: visible ? 1 : 0,
          transition: transitionOnThemeLoaded,
        }}
      >
        <div className="slides">{children}</div>
      </div>
    );
  },
);

RevealSlides.displayName = 'RevealSlides';
