import React from "react";

// Import template components
import { HeadlineImageTemplate } from "./templates/HeadlineImageTemplate";
import { HeadlineTemplate } from "./templates/HeadlineTemplate";
import { TitleImageParagraphTemplate } from "./templates/TitleImageParagraphTemplate";
import { TitleParagraphTemplate } from "./templates/TitleParagraphTemplate";
import { TitleImageTemplate } from "./templates/TitleImageTemplate";
import { TitleImageBulletsTemplate } from "./templates/TitleImageBulletsTemplate";
import { DefaultTemplate } from "./templates/DefaultTemplate";

export enum SlideTemplate {
  HEADLINE_IMAGE = "headline-image",
  HEADLINE = "headline",
  TITLE_IMAGE_PARAGRAPH = "title-image-paragraph", 
  TITLE_PARAGRAPH = "title-paragraph",
  TITLE_IMAGE = "title-image",
  TITLE_IMAGE_BULLETS = "title-image-bullets",
  DEFAULT = "default"
}

export interface SlideData {
  slug?: string;
  template: SlideTemplate;
  title?: string;
  items?: string[];
  paragraph?: string;
  background?: string;
  imageUrl?: string;
}

export function Slide({
  slug,
  template,
  title,
  items,
  background = "adaptale-content/adaptale_slide_background_1.jpg",
  imageUrl = "/adaptale.png",
  paragraph
}: SlideData) {
  const keyPrefix = slug 
    ? btoa(slug
          // Sanitize title by removing non-Latin1 characters first
          .replace(/[^\x00-\xFF]/g, '')
        )
        .replace(/[+/=]/g, '') // Remove non-alphanumeric chars
        .substring(0, 8) 
    : '';
  
  // Render the appropriate template based on the template type
  switch (template) {
    case SlideTemplate.HEADLINE_IMAGE:
      return <HeadlineImageTemplate 
        keyPrefix={keyPrefix} 
        title={title} 
        imageUrl={imageUrl} 
        background={background} 
      />;
    case SlideTemplate.HEADLINE:
      return <HeadlineTemplate 
        keyPrefix={keyPrefix} 
        title={title} 
        background={background} 
      />;
    case SlideTemplate.TITLE_IMAGE_PARAGRAPH:
      return <TitleImageParagraphTemplate 
        keyPrefix={keyPrefix} 
        title={title} 
        imageUrl={imageUrl} 
        paragraph={paragraph} 
        background={background} 
      />;
    case SlideTemplate.TITLE_PARAGRAPH:
      return <TitleParagraphTemplate 
        keyPrefix={keyPrefix} 
        title={title} 
        paragraph={paragraph} 
        background={background} 
      />;
    case SlideTemplate.TITLE_IMAGE:
      return <TitleImageTemplate 
        keyPrefix={keyPrefix} 
        title={title} 
        imageUrl={imageUrl} 
        background={background} 
      />;
    case SlideTemplate.TITLE_IMAGE_BULLETS:
      return <TitleImageBulletsTemplate 
        keyPrefix={keyPrefix} 
        title={title} 
        imageUrl={imageUrl} 
        items={items} 
        background={background} 
      />;
    default:
      return <DefaultTemplate 
        keyPrefix={keyPrefix} 
        title={title} 
        items={items} 
        background={background} 
      />;
  }
}