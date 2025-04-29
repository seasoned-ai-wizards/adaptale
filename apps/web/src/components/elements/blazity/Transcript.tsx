"use-client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { SendHorizonalIcon, MicIcon, MicOffIcon } from "lucide-react";
import { type TranscriptItem } from "~/types";
import { useTranscript } from "~/contexts/TranscriptContext";

export interface TranscriptProps {
  userText: string;
  setUserText: (val: string) => void;
  onSendMessage: () => void;
  canSend: boolean;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
}

function Transcript({
  userText,
  setUserText,
  onSendMessage,
  canSend,
  handleTalkButtonDown,
  handleTalkButtonUp
}: TranscriptProps) {
  const [ isListening, setIsListening ] = useState(false);
  const { transcriptItems, toggleTranscriptItemExpand } = useTranscript();
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [prevLogs, setPrevLogs] = useState<TranscriptItem[]>([]);
  const [justCopied, setJustCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function scrollToBottom() {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    const hasNewMessage = transcriptItems.length > prevLogs.length;
    const hasUpdatedMessage = transcriptItems.some((newItem, index) => {
      const oldItem = prevLogs[index];
      return (
        oldItem &&
        (newItem.title !== oldItem.title || newItem.data !== oldItem.data)
      );
    });

    if (hasNewMessage || hasUpdatedMessage) {
      scrollToBottom();
    }

    setPrevLogs(transcriptItems);
  }, [transcriptItems]);

  // Autofocus on text box input on load
  useEffect(() => {
    if (canSend && inputRef.current) {
      inputRef.current.focus();
    }
  }, [canSend]);

  const handleCopyTranscript = async () => {
    if (!transcriptRef.current) return;
    try {
      await navigator.clipboard.writeText(transcriptRef.current.innerText);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy transcript:", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col basis-1/5">
      <div className="relative flex-1 min-h-0">
        {/*<button*/}
        {/*  onClick={handleCopyTranscript}*/}
        {/*  className={`absolute w-20 top-3 right-2 mr-1 z-10 text-sm px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300`}*/}
        {/*>*/}
        {/*  {justCopied ? "Copied!" : "Copy"}*/}
        {/*</button>*/}

        <div
          ref={transcriptRef}
          className="h-full overflow-auto p-4 flex flex-col gap-y-4"
        >
          {transcriptItems.map((item) => {
            const {
              itemId,
              type,
              role,
              data,
              expanded,
              timestamp,
              title = "",
              isHidden,
            } = item;

            if (isHidden) {
              return null;
            }

            if (type === "MESSAGE") {
              const isUser = role === "user";
              const baseContainer = "flex justify-end flex-col";
              const containerClasses = `${baseContainer} ${isUser ? "items-end" : "items-start"}`;
              const bubbleBase = `max-w-lg p-3 rounded-xl ${isUser ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-black"}`;
              const isBracketedMessage =
                title.startsWith("[") && title.endsWith("]");
              const messageStyle = isBracketedMessage
                ? "italic text-gray-400"
                : "";
              const displayTitle = isBracketedMessage
                ? title.slice(1, -1)
                : title;

              return (
                <div key={itemId} className={containerClasses}>
                  <div className={bubbleBase}>
                    <div
                      className={`text-xs ${isUser ? "text-gray-400" : "text-gray-500"} font-mono`}
                    >
                      {timestamp}
                    </div>
                    <div className={`whitespace-pre-wrap ${messageStyle}`}>
                      <ReactMarkdown>{displayTitle}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            } else if (type === "FUNCTION_CALL") {
              return (
                <div key={itemId} className={"items-center"}>
                  <div
                    className={"max-w-lg rounded-xl bg-blue-50 p-3 text-white"}
                  >
                    <div
                      className={`flex items-center whitespace-pre-wrap text-sm font-bold ${
                        data ? "cursor-pointer" : ""
                      }`}
                      onClick={() => data && toggleTranscriptItemExpand(itemId)}
                    >
                      {data && (
                        <span
                          className={`mr-1 transform select-none font-mono text-gray-400 transition-transform duration-200 ${
                            expanded ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          ▶
                        </span>
                      )}
                      {title}
                    </div>
                    {expanded && data && (
                      <div className="text-left text-gray-800">
                        <pre className="mb-2 ml-1 mt-2 whitespace-pre-wrap break-words border-l-2 border-gray-200 pl-2 font-mono text-xs">
                          {JSON.stringify(data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            } else if (type === "BREADCRUMB") {
              return (
                <div
                  key={itemId}
                  className="flex flex-col items-start justify-start text-sm text-gray-500"
                >
                  <span className="font-mono text-xs">{timestamp}</span>
                  <div
                    className={`flex items-center whitespace-pre-wrap font-mono text-sm text-gray-800 ${
                      data ? "cursor-pointer" : ""
                    }`}
                    onClick={() => data && toggleTranscriptItemExpand(itemId)}
                  >
                    {data && (
                      <span
                        className={`mr-1 transform select-none font-mono text-gray-400 transition-transform duration-200 ${
                          expanded ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        ▶
                      </span>
                    )}
                    {title}
                  </div>
                  {expanded && data && (
                    <div className="text-left text-gray-800">
                      <pre className="mb-2 ml-1 mt-2 whitespace-pre-wrap break-words border-l-2 border-gray-200 pl-2 font-mono text-xs">
                        {JSON.stringify(data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            } else {
              // Fallback if type is neither MESSAGE nor BREADCRUMB
              return (
                <div
                  key={itemId}
                  className="flex justify-center font-mono text-sm italic text-gray-500"
                >
                  Unknown item type: {type}{" "}
                  <span className="ml-2 text-xs">{timestamp}</span>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <div className="textarea-gradient-border relative p-4">
          <div className="absolute top-4 left-4 flex items-center gap-x-2 z-10">
            <button
              onClick={() => {
                if (isListening) {
                  handleTalkButtonUp();
                } else {
                  handleTalkButtonDown();
                }
                setIsListening(!!isListening);
              }}
              className="rounded-full bg-gray-900 px-2 py-2 text-white disabled:opacity-50"
            >
              { isListening ? <MicOffIcon /> : <MicIcon />}
            </button>
            <button
              onClick={onSendMessage}
              disabled={!canSend || !userText.trim()}
              className="rounded-full bg-gray-900 px-2 py-2 text-white disabled:opacity-50"
            >
              <SendHorizonalIcon />
            </button>
          </div>
          
          <textarea
            ref={inputRef}
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSend) {
                onSendMessage();
              }
            }}
            className="w-full px-4 py-2 focus:outline-none bg-white pt-14"
            placeholder="Respond to Adaptale..."
            style={{ resize: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Transcript;
