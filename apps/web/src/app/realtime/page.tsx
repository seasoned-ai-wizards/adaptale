"use client";

import TempChat from "~/components/views/TempChat";
import {TranscriptProvider} from "~/contexts/TranscriptContext";
import {EventProvider} from "~/contexts/EventContext";

export default function Page() {
  return (
    <div>
      <TranscriptProvider>
        <EventProvider>
          <TempChat />
        </EventProvider>
      </TranscriptProvider>
    </div>
  );
}
