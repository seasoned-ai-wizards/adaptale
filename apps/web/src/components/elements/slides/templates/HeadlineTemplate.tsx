import React from "react";

interface HeadlineTemplateProps {
  keyPrefix: string;
  title?: string;
  background?: string;
}

export const HeadlineTemplate: React.FC<HeadlineTemplateProps> = ({
  keyPrefix,
  title,
  background
}) => {
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