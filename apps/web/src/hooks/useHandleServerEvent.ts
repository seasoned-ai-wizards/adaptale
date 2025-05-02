"use client";

import { type ServerEvent, ServerEventType, type SessionStatus } from "~/types";
import { useEvent } from "~/contexts/EventContext";
import { useRef } from "react";
import { useTranscript } from "~/contexts/TranscriptContext";

export interface UseHandleServerEventParams {
  onSessionStatus: (status: SessionStatus) => void;
  sendClientEvent: (eventObj: unknown, eventNameSuffix?: string) => void;
  callFunctionHandler: (functionName: string, args: any) => Promise<unknown>;
}

export function useHandleServerEvent({
  onSessionStatus,
  sendClientEvent,
  callFunctionHandler,
}: UseHandleServerEventParams) {
  // TODO for now let's keep it here, but we should move it to the server conversation log
  const {
    transcriptItems,
    addFunctionCall,
    addTranscriptMessage,
    updateTranscriptMessage,
    updateTranscriptItemStatus,
  } = useTranscript();

  const { logServerEvent } = useEvent();

  const handleFunctionCall = async (functionCallParams: {
    name: string;
    call_id?: string;
    arguments: string;
  }) => {
    const functionName = functionCallParams.name;
    try {
      const functionArgs: unknown = JSON.parse(functionCallParams.arguments);
      const fnResult: unknown = await callFunctionHandler(
        functionName,
        functionArgs,
      );

      addFunctionCall(functionCallParams.name, fnResult);

      if (fnResult === undefined) {
        const simulatedResult = { result: true };

        sendClientEvent({
          type: ServerEventType.ConversationItemCreate,
          item: {
            type: "function_call_output",
            call_id: functionCallParams.call_id,
            output: JSON.stringify(simulatedResult),
          },
        });
        sendClientEvent({ type: ServerEventType.ResponseCreate });
        return;
      }

      sendClientEvent({
        type: ServerEventType.ConversationItemCreate,
        item: {
          type: "function_call_output",
          call_id: functionCallParams.call_id,
          output: JSON.stringify(fnResult),
        },
      });
      sendClientEvent({ type: ServerEventType.ResponseCreate });
    } catch (error) {
      console.error(error);
      
      // Create structured error response
      const errorResponse = {
        error: {
          type: error instanceof Error ? error.name : "FunctionCallError",
          message: error instanceof Error ? error.message : String(error),
          details: functionName ? `Error in function: ${functionName}` : undefined
        },
        success: false
      };
      
      // Send error back to the agent using the same channel
      sendClientEvent({
        type: ServerEventType.ConversationItemCreate,
        item: {
          type: "function_call_output",
          call_id: functionCallParams.call_id,
          output: JSON.stringify(errorResponse),
        },
      });
      sendClientEvent({ type: ServerEventType.ResponseCreate });
    }
  };

  const handleServerEvent = (serverEvent: ServerEvent) => {
    logServerEvent(serverEvent);

    switch (serverEvent.type) {
      case ServerEventType.SessionCreated: {
        if (serverEvent.session?.id) {
          onSessionStatus("CONNECTED");
          // addTranscriptBreadcrumb(
          //   `session.id: ${
          //     serverEvent.session.id
          //   }\nStarted at: ${new Date().toLocaleString()}`,
          // );
        }
        break;
      }

      case ServerEventType.ConversationItemCreated: {
        if (serverEvent.item) {
          let text =
            serverEvent.item.content?.[0]?.text ??
            serverEvent.item?.content?.[0]?.transcript ??
            "";
          const role = serverEvent.item.role;
          const itemId = serverEvent.item.id;

          if (
            itemId &&
            transcriptItems.some((item) => item.itemId === itemId)
          ) {
            break;
          }

          if (itemId && role) {
            if (role === "user" && !text) {
              text = "[Transcribing...]";
            }
            addTranscriptMessage(itemId, role, text);
          }
        }

        break;
      }

      case ServerEventType.ConversationItemInputAudioTranscriptionCompleted: {
        const itemId = serverEvent.item_id;
        const finalTranscript =
          !serverEvent.transcript || serverEvent.transcript === "\n"
            ? "[inaudible]"
            : serverEvent.transcript;
        if (itemId) {
          updateTranscriptMessage(itemId, finalTranscript, false);
        }
        break;
      }

      case ServerEventType.ResponseAudioTranscriptDelta: {
        const itemId = serverEvent.item_id;
        const deltaText = serverEvent.delta ?? "";
        if (itemId) {
          updateTranscriptMessage(itemId, deltaText, true);
        }
        break;
      }

      case ServerEventType.ResponseDone: {
        if (serverEvent.response?.output) {
          serverEvent.response.output.forEach((outputItem) => {
            if (
              outputItem.type === "function_call" &&
              outputItem.name &&
              outputItem.arguments
            ) {
              void handleFunctionCall({
                name: outputItem.name,
                call_id: outputItem.call_id,
                arguments: outputItem.arguments as string,
              });
            }
          });
        }
        break;
      }

      case ServerEventType.ResponseOutputItemDone: {
        const itemId = serverEvent.item?.id;
        if (itemId) {
          updateTranscriptItemStatus(itemId, "DONE");
        }
        break;
      }

      default:
        break;
    }
  };

  const handleServerEventRef = useRef(handleServerEvent);
  handleServerEventRef.current = handleServerEvent;

  return handleServerEventRef;
}
