import Image from "next/image";
import React from "react";

interface TitleImageBulletsTemplateProps {
  keyPrefix: string;
  title?: string;
  imageUrl?: string;
  items?: string[];
  background?: string;
}

export const TitleImageBulletsTemplate: React.FC<TitleImageBulletsTemplateProps> = ({
  keyPrefix,
  title,
  imageUrl,
  items,
  background
}) => {
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