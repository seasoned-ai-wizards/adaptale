import React from "react";

interface TitleParagraphTemplateProps {
  keyPrefix: string;
  title?: string;
  paragraph?: string;
  background?: string;
}

export const TitleParagraphTemplate: React.FC<TitleParagraphTemplateProps> = ({
  keyPrefix,
  title,
  paragraph,
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