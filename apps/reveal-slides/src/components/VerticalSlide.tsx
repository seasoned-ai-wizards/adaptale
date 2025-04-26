import React from 'react';
import { ContentItem, VerticalSlideData } from './types';

interface VerticalSlideProps {
  data: VerticalSlideData;
}

const renderContent = (item: ContentItem, index: number) => {
  const fragmentProps = item.fragment 
    ? { className: `fragment ${item.fragmentAnimation || 'fade-in'}` }
    : {};

  switch (item.type) {
    case 'heading1':
      return <h1 key={index} {...fragmentProps}>{item.text}</h1>;
    case 'heading2':
      return <h2 key={index} {...fragmentProps}>{item.text}</h2>;
    case 'paragraph':
      return <p key={index} {...fragmentProps}>{item.text}</p>;
    case 'listItem':
      return <li key={index} {...fragmentProps}>{item.text}</li>;
    default:
      return null;
  }
};

export const VerticalSlide: React.FC<VerticalSlideProps> = ({ data }) => {
  const { content, background, autoAnimate, id } = data;
  
  // Remove key from slideProps and pass it directly to the section element
  const slideProps: Record<string, any> = {
    'data-background': background,
  };

  if (autoAnimate) {
    slideProps['data-auto-animate'] = true;
  }

  // Group list items to render them in a single ul element
  const contentElements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  
  content.forEach((item, index) => {
    if (item.type === 'listItem') {
      listItems.push(renderContent(item, index));
    } else {
      if (listItems.length > 0) {
        contentElements.push(<ul key={`${id}-list-${index}`}>{listItems}</ul>);
        listItems = [];
      }
      contentElements.push(renderContent(item, index));
    }
  });
  
  // Add any remaining list items
  if (listItems.length > 0) {
    contentElements.push(<ul key={`${id}-list-end`}>{listItems}</ul>);
  }

  return (
    <section key={`vslide-${id}`} {...slideProps}>
      {contentElements}
    </section>
  );
};