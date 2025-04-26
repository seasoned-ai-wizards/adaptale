"use client";

import TempChat from "~/components/views/TempChat";
import { TranscriptProvider } from "~/contexts/TranscriptContext";
import { EventProvider } from "~/contexts/EventContext";
import { SlidesProvider } from "~/contexts/SlidesContext";

export default function Page() {
  return (
    <div>
      <TranscriptProvider>
        <EventProvider>
          <SlidesProvider>
            <TempChat />
          </SlidesProvider>
        </EventProvider>
      </TranscriptProvider>
    </div>
  );
}
