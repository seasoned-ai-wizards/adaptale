import { type AgentConfig } from "~/types";
import { injectTransferTools } from "./utils";

//
// 1) Static Presentation Builder
//
const presentationBuilder: AgentConfig = {
  name: "presentationBuilder",
  publicDescription:
    "Agent that helps you define your presentation outline and manage slides before you go live.",
  instructions:
    `
    # Important notes
    You're a presentation builder assistant. Don't ask the user for instructions – let them speak first.
    Then use the tools to create an outline and let the user add, modify, or remove slides as needed.
    Do not ask the user for confirmation – just perform his instructions by adding slides and generating content
    Do not repeat instructions to the user before adding slides.
    Do not generate only the title – always add bullets about the topics the user asks.
    Choose a relevant image from the available images. If you can't find a relevant image, don't provide it.

    # Available images for the presentations
    ## Generic theme
    - background.jpg
    ## World theme
    ### Content
    - /world-content/boy_hero_earth_powers_recycling_reduce_waste.png
    - /world-content/sad_planet_earth_temperature_climate_change.png
    - /world-content/boy_hero_earth_powers_knowledge_sharing_knight.png
    - /world-content/sad_animal_turtle.png
    - /world-content/planet_earth.png
    - /world-content/sad_animal_polar_bears.png
    - /world-content/girl_hero_earth_powers_plant_protector.png
    - /world-content/sad_animal_bird.png
    - /world-content/girl_hero_earth_powers_waste_warrior.png
    - /world-content/boy_and_girl_heroes_earth_powers_energy_savers.png
    - /world-content/boy_hero_earth_powers_energy_saver.png
    - /world-content/girl_hero_earth_powers_energy_saver.png
    ### Backgrounds
    - theme-world/bg1.jpeg
    - theme-world/bg2.jpeg
    - theme-world/bg3.jpeg
    ## Adaptale theme
    ### Content
    - adaptale-content/adaptale_process_create_coach_present.png
    - adaptale-content/adaptale_create.png
    - adaptale-content/adaptale_coach.png
    - adaptale-content/adaptale_present.png
    - adaptale-content/adaptale_creativity.png
    - adaptale-content/adaptale_ideas_hostage.png
    - adaptale-content/adaptale_mascot.png
  ### Backgrounds
    - adaptale-content/adaptale_slide_background_1.jpg
    - adaptale-content/adaptale_slide_background_2.jpg
    - adaptale-content/adaptale_slide_background_3.jpg
    `,
  tools: [
    {
      type: "function",
      name: "generateOutline",
      description: "Create a presentation outline based on the user's topic.",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "The topic or title of the presentation.",
          },
          outline: {
            type: "array",
            description:
              "An array of strings representing the titles and slugs for the slides eg. Team (team).",
            items: {
              type: "string",
            },
          }
        },
        required: ["topic", "outline"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "addSlide",
      description:
        "Add a new slide using a named template for the given topic slug.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "The slide slug for this. Needs to be unique",
          },
          title: {
            type: "string",
            description:
              "Add a title for the new slide. This will be the main heading.",
          },
          items: {
            type: "array",
            description:
              "An array of strings representing the content items for the slide.",
            items: {
              type: "string",
            },
          },
          template: {
            type: "string",
            enum: ["one-column", "two-columns"],
            description: "The name of the slide template to apply.",
          },
          imageUrl: {
            type: "string",
            description: "An image to accurately illustrate the slide content."
          }
        },
        required: ["slug", "title", "template"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "navigateSlide",
      description: "Navigate to a specific slide by slide slug.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "The slug of the slide to navigate to.",
          },
        },
        required: ["slug"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "modifySlide",
      description:
        "Modify the content on a specific slide identified by slide-slug.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "The slide slug for this.",
          },
          title: {
            type: "string",
            description:
              "Add a title for the new slide. This will be the main heading.",
          },
          items: {
            type: "array",
            description:
              "An array of strings representing the content items for the slide.",
            items: {
              type: "string",
            },
          },
          template: {
            type: "string",
            enum: ["one-column", "two-columns"],
            description: "The name of the slide template to apply.",
          },
          imageUrl: {
            type: "string",
            description: "An image to accurately illustrate the slide content."
          }
        },
        required: ["slug"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "removeSlide",
      description:
        "Remove a slide from the deck by the slide slug.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "The slide slug for this.",
          },
        },
        required: ["slug"],
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
