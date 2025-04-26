// Types for our slide system
export type ContentItem = {
  type: 'heading1' | 'heading2' | 'paragraph' | 'listItem';
  text: string;
  fragment?: boolean;
  fragmentAnimation?: 'fade-in' | 'fade-out' | 'slide-up' | 'zoom-in';
}

export type ImageContent = {
  src: string;
  alt: string;
  dataId?: string;
}

export type SlideData = {
  id: string;
  background?: string;
  autoAnimate?: boolean;
  nested?: boolean;
}

// Basic slide with vertical content (headings, paragraphs, etc.)
export type VerticalSlideData = SlideData & {
  type: 'vertical';
  content: ContentItem[];
}

// Two-column layout with content and image
export type TwoColumnSlideData = SlideData & {
  type: 'two-column';
  imagePosition: 'left' | 'right';
  image: ImageContent;
  content: {
    title?: string;
    items: ContentItem[];
  };
}

// Combined type for all slide types
export type SlideDataType = 
  | VerticalSlideData
  | TwoColumnSlideData;

// Type for nested slides (sections)
export type SectionData = {
  id: string;
  slides: SlideDataType[];
}

// Type for the overall presentation data
export type PresentationData = (SlideDataType | SectionData)[];