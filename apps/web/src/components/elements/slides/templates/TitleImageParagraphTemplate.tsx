import Image from "next/image";
import React from "react";

interface TitleImageParagraphTemplateProps {
  keyPrefix: string;
  title?: string;
  imageUrl?: string;
  paragraph?: string;
  background?: string;
}

export const TitleImageParagraphTemplate: React.FC<TitleImageParagraphTemplateProps> = ({
  keyPrefix,
  title,
  imageUrl,
  paragraph,
  background
}) => {
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