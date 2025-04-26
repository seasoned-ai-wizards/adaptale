"use client";

import { TranscriptProvider } from "~/contexts/TranscriptContext";
import { EventProvider } from "~/contexts/EventContext";
import Slides, { SlideTemplate } from "~/components/views/Slides";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function Page() {
  const [slides, setSlides] = useState<SlideTemplate[]>([
    {
      template: "world",
      background: "/theme-world/bg1.jpeg",
      title: "Welcome to",
      items: ["My Story", "A journey through words and images"],
      imageUrl: "/world-content/planet_earth.png",
    },
    {
      template: "world",
      background: "/theme-world/bg2.jpeg",
      title: "Demo time!",
      items: ["Let's generate some slides"],
      imageUrl: "/world-content/planet_earth.png",
    },
  ]);

  return (
    <div>
      <TranscriptProvider>
        <EventProvider>
          <div className="flex h-screen flex-col">
            <div className="mb-4">
              <Button
                onClick={() => {
                  setSlides([
                    ...slides,
                    {
                      template: "world",
                      background: "/theme-world/bg3.jpeg",
                      title: "New slide",
                      items: ["This is Earth."],
                      imageUrl: "/world-content/planet_earth.png",
                    },
                  ]);
                }}
              >
                Add Slide
              </Button>
              {slides.length}
            </div>
            <Slides slides={slides} />
          </div>
        </EventProvider>
      </TranscriptProvider>
    </div>
  );
}
