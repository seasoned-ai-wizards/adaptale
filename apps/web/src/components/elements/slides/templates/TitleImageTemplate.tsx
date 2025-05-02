import Image from "next/image";
import React from "react";

interface TitleImageTemplateProps {
  keyPrefix: string;
  title?: string;
  imageUrl?: string;
  background?: string;
}

export const TitleImageTemplate: React.FC<TitleImageTemplateProps> = ({
  keyPrefix,
  title,
  imageUrl,
  background
}) => {
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