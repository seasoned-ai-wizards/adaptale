import Image from "next/image";
import React from "react";

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
  template?: SlideTemplate;
  title?: string;
  items?: string[];
  paragraph?: string;
  background?: string;
  imageUrl?: string;
}

export function Slide({
  slug,
  template = SlideTemplate.TITLE_PARAGRAPH,
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
      return renderHeadlineImageTemplate(keyPrefix, title, imageUrl, background);
    case SlideTemplate.HEADLINE:
      return renderHeadlineTemplate(keyPrefix, title, background);
    case SlideTemplate.TITLE_IMAGE_PARAGRAPH:
      return renderTitleImageParagraphTemplate(keyPrefix, title, imageUrl, paragraph, background);
    case SlideTemplate.TITLE_PARAGRAPH:
      return renderTitleParagraphTemplate(keyPrefix, title, paragraph, background);
    case SlideTemplate.TITLE_IMAGE:
      return renderTitleImageTemplate(keyPrefix, title, imageUrl, background);
    case SlideTemplate.TITLE_IMAGE_BULLETS:
      return renderTitleImageBulletsTemplate(keyPrefix, title, imageUrl, items, background);
    default:
      return renderDefaultTemplate(keyPrefix, title, items, background);
  }
}

function renderHeadlineImageTemplate(keyPrefix: string, title?: string, imageUrl?: string, background?: string) {
  return (
    <section key={keyPrefix} data-background={background} className="future" aria-hidden="true">
      <section data-auto-animate>
        <div className="flex flex-col items-center justify-center">
          <h1 style={{ fontSize: "64px", textAlign: "center", padding: "20px" }}>
            {title}
          </h1>
        </div>
      </section>
      <section data-auto-animate>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex-1 flex items-center justify-center pr-4">
            <h1 style={{ fontSize: "48px", textAlign: "left", padding: "20px" }}>
              {title}
            </h1>
          </div>
          <div className="flex-1 flex items-center justify-center pl-4">
            {imageUrl && (
              <div style={{ position: "relative", width: "100%", aspectRatio: "600/725" }}>
                <Image
                  className="fragment fade-right" 
                  src={imageUrl}
                  alt={title ?? "Slide image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  style={{ 
                    objectFit: "contain",
                    objectPosition: "center"
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}

function renderHeadlineTemplate(keyPrefix: string, title?: string, background?: string) {
  return (
    <section key={keyPrefix} data-background={background} className="future" aria-hidden="true">
      <div className="flex flex-col items-center justify-center">
        <h1 style={{ fontSize: "64px", textAlign: "center", padding: "20px" }}>
          {title}
        </h1>
      </div>
    </section>
  );
}

function renderTitleImageParagraphTemplate(keyPrefix: string, title?: string, imageUrl?: string, paragraph?: string, background?: string) {
  return (
    <section key={keyPrefix} data-background={background} className="future" aria-hidden="true">
      <div className="flex flex-col h-full">
        {/* Title row - 1/4 of slide height */}
        <div className="flex items-center justify-center" style={{ height: "25%" }}>
          <h1 style={{ fontSize: "64px", textAlign: "center" }}>
            {title}
          </h1>
        </div>
        
        {/* Content row - 3/4 of slide height */}
        <div className="flex flex-row" style={{ height: "75%" }}>
          {/* Image column - left side */}
          <div className="flex items-center justify-center" style={{ flex: 1 }}>
            {imageUrl && (
              <div style={{ position: "relative", width: "80%", aspectRatio: "640/460" }}>
                <Image 
                  src={imageUrl}
                  alt={title ?? "Slide image"}
                  fill
                  sizes="(max-width: 768px) 60vw, 400px"
                  style={{ 
                    objectFit: "contain",
                    objectPosition: "center"
                  }}
                  priority
                />
              </div>
            )}
          </div>
          
          {/* Text column - right side */}
          <div className="flex items-center justify-center" style={{ flex: 1 }}>
            <h2 style={{ 
              fontSize: "48px", 
              textAlign: "left", 
              padding: "20px", 
              fontWeight: "500"
            }}>
              {paragraph}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderTitleParagraphTemplate(keyPrefix: string, title?: string, paragraph?: string, background?: string) {
  return (
    <section key={keyPrefix} data-background={background} className="future" aria-hidden="true">
      <div className="flex flex-col h-full">
        {/* Title row - takes up about 30% of the height */}
        <div className="flex items-center justify-center" style={{ height: "30%" }}>
          <h1 style={{ fontSize: "64px", textAlign: "center" }}>
            {title}
          </h1>
        </div>
        
        {/* Content row - takes up about 70% of the height */}
        <div className="flex items-center justify-center" style={{ height: "70%" }}>
          <h2 style={{ 
            fontSize: "48px", 
            textAlign: "left", 
            padding: "0 60px", 
            fontWeight: "500"
          }}>
            {paragraph}
          </h2>
        </div>
      </div>
    </section>
  );
}

function renderTitleImageTemplate(keyPrefix: string, title?: string, imageUrl?: string, background?: string) {
  return (
    <section key={keyPrefix} data-background={background} className="future" aria-hidden="true">
      <div className="flex flex-col h-full">
        {/* Title row - takes up about 30% of the height */}
        <div className="flex items-center justify-center" style={{ height: "30%" }}>
          <h1 style={{ fontSize: "64px", textAlign: "center" }}>
            {title}
          </h1>
        </div>
        
        {/* Image row - takes up about 70% of the height */}
        <div className="flex items-center justify-center" style={{ height: "70%", position: "relative" }}>
          {imageUrl && (
            <div style={{ width: "80%", maxWidth: "1400px", position: "relative", aspectRatio: "16/9" }}>
              <Image 
                src={imageUrl}
                alt={title ?? "Slide image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                style={{ 
                  objectFit: "contain",
                  objectPosition: "center"
                }}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderTitleImageBulletsTemplate(keyPrefix: string, title?: string, imageUrl?: string, items?: string[], background?: string) {
  return (
    <section key={keyPrefix} data-background={background} className="future" aria-hidden="true">
      <div className="flex flex-col h-full">
        {/* Title row - takes up about 25% of the height */}
        <div className="flex items-center justify-center" style={{ height: "25%" }}>
          <h1 style={{ fontSize: "64px", textAlign: "center" }}>
            {title}
          </h1>
        </div>
        
        {/* Content row - takes up about 75% of the height */}
        <div className="flex flex-row" style={{ height: "75%" }}>
          {/* Image column - left side */}
          <div className="flex items-center justify-center" style={{ flex: 1 }}>
            {imageUrl && (
              <div style={{ position: "relative", width: "80%", aspectRatio: "1/1" }}>
                <Image 
                  src={imageUrl}
                  alt={title ?? "Slide image"}
                  fill
                  sizes="(max-width: 768px) 60vw, 400px"
                  style={{ 
                    objectFit: "contain",
                    objectPosition: "center"
                  }}
                  priority
                />
              </div>
            )}
          </div>
          
          {/* Bullets column - right side */}
          <div className="flex items-center justify-center title-image-bullets" style={{ flex: 1 }}>
            <ul>
              {items?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderDefaultTemplate(keyPrefix: string, title?: string, items?: string[], background?: string) {
  return (
    <section key={keyPrefix} data-background={background} className="future" aria-hidden="true">
      <h1 className="fragment fade-in">{title}</h1>
      {items?.map((item, index) => (
        <p key={index} className={`fragment${index !== 0 ? ' fade-in' : ''}`}>
          {item}
        </p>
      ))}
    </section>
  );
}