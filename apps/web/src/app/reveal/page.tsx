"use client";

import { TranscriptProvider } from "~/contexts/TranscriptContext";
import { EventProvider } from "~/contexts/EventContext";
import Slides from "~/components/views/Slides";

export default function Page() {
  return (
    <div>
      <TranscriptProvider>
        <EventProvider>
          <div className="flex h-screen flex-col">
            <Slides />
          </div>
        </EventProvider>
      </TranscriptProvider>
    </div>
  );
}
