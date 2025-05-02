import React from "react";

interface DefaultTemplateProps {
  keyPrefix: string;
  title?: string;
  items?: string[];
  background?: string;
}

export const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  keyPrefix,
  title,
  items,
  background
}) => {
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