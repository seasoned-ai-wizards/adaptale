import { AgentConfig } from "~/types";
import { injectTransferTools } from "./utils";

//
// 1) Static Presentation Builder
//
const presentationBuilder: AgentConfig = {
  name: "presentationBuilder",
  publicDescription:
    "Agent that helps you define your presentation outline and manage slides before you go live.",
  instructions:
    "You're a presentation builder assistant. First ask the user for their presentation topic. " +
    "Then use the tools to create an outline and let the user add, modify, or remove slides as needed.",
  tools: [
    {
      type: "function",
      name: "createOutline",
      description: "Create a presentation outline based on the user's topic.",
      parameters: {
        type: "object",
        properties: {
          topics: {
            type: "string",
            description: "The topic or title of the presentation.",
          },
        },
        required: ["topics"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "add_slide",
      description:
        "Add a new slide using a named template for the given topic slug.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description:
              "A URL-friendly identifier for the presentation topic (e.g. 'market-analysis').",
          },
          templateName: {
            type: "string",
            description:
              "The name of the slide template to apply (e.g. 'title-and-bullets').",
          },
        },
        required: ["topicSlug", "templateName"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "modify_content_on_slide",
      description:
        "Modify the content on a specific slide identified by topic slug and slide index.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description: "The topic slug for the presentation.",
          },
          slideIndex: {
            type: "number",
            description: "Zero-based index of the slide to modify.",
          },
          newContent: {
            type: "string",
            description: "The updated content for that slide.",
          },
        },
        required: ["topicSlug", "slideIndex", "newContent"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "remove_slide",
      description:
        "Remove a slide from the deck by topic slug and slide index.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description: "The topic slug for the presentation.",
          },
          slideIndex: {
            type: "number",
            description: "Zero-based index of the slide to remove.",
          },
        },
        required: ["topicSlug", "slideIndex"],
        additionalProperties: false,
      },
    },
  ],
};

//
// 2) Live Presentation Assistant
//
const livePresentationAssistant: AgentConfig = {
  name: "livePresentationAssistant",
  publicDescription:
    "Agent that assists you during a live presentation—navigating slides and editing on the fly.",
  instructions:
    "You're a live presentation assistant. During the demo, if the user wants to jump to a slide, use the jump_to_slide tool. " +
    "If they ask to add or modify slides on the spot, call add_slide or modify_content_on_slide respectively.",
  tools: [
    {
      type: "function",
      name: "jump_to_slide",
      description:
        "Navigate instantly to a specific slide by topic slug and slide index.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description: "The topic slug for the presentation.",
          },
          slideIndex: {
            type: "number",
            description: "Zero-based index of the slide to jump to.",
          },
        },
        required: ["topicSlug", "slideIndex"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "add_slide",
      description:
        "Dynamically insert a new slide during the live presentation.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description: "The topic slug for the presentation.",
          },
          templateName: {
            type: "string",
            description: "The name of the slide template to insert.",
          },
        },
        required: ["topicSlug", "templateName"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "modify_content_on_slide",
      description: "Edit the content of an existing slide in real time.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description: "The topic slug for the presentation.",
          },
          slideIndex: {
            type: "number",
            description: "Zero-based index of the slide to update.",
          },
          newContent: {
            type: "string",
            description: "The new content to place on the slide.",
          },
        },
        required: ["topicSlug", "slideIndex", "newContent"],
        additionalProperties: false,
      },
    },
  ],
};

// Inject transfer tools so you can route between agents if needed
const agents = injectTransferTools([
  presentationBuilder,
  livePresentationAssistant,
]);

export default agents;
