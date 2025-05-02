import Image from "next/image";
import React from "react";

interface HeadlineImageTemplateProps {
  keyPrefix: string;
  title?: string;
  imageUrl?: string;
  background?: string;
}

export const HeadlineImageTemplate: React.FC<HeadlineImageTemplateProps> = ({
  keyPrefix,
  title,
  imageUrl,
  background
}) => {
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