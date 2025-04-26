import React from 'react';
import { ContentItem, TwoColumnSlideData } from './types';

interface TwoColumnSlideProps {
  data: TwoColumnSlideData;
}

const renderContentItem = (item: ContentItem, index: number) => {
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

export const TwoColumnSlide: React.FC<TwoColumnSlideProps> = ({ data }) => {
  const { content, image, imagePosition, background, autoAnimate, id } = data;
  
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
  
  // Add title if exists
  if (content.title) {
    contentElements.push(<h2 key="title">{content.title}</h2>);
  }
  
  content.items.forEach((item, index) => {
    if (item.type === 'listItem') {
      listItems.push(renderContentItem(item, index));
    } else {
      if (listItems.length > 0) {
        contentElements.push(<ul key={`list-${index}`}>{listItems}</ul>);
        listItems = [];
      }
      contentElements.push(renderContentItem(item, index));
    }
  });
  
  // Add any remaining list items
  if (listItems.length > 0) {
    contentElements.push(<ul key="list-end">{listItems}</ul>);
  }

  const imageElement = (
    <div key={`image-${id}`} style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
      <img 
        src={image.src} 
        alt={image.alt} 
        {...(image.dataId ? { 'data-id': image.dataId } : {})}
      />
    </div>
  );

  const contentElement = (
    <div key={`content-${id}`} style={{ flex: '1', padding: '0 20px', justifyContent: 'left' }}>
      {contentElements}
    </div>
  );

  return (
    <section key={`colslide-${id}`} {...slideProps}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%' 
      }}>
        {imagePosition === 'left' ? [imageElement, contentElement] : [contentElement, imageElement]}
      </div>
    </section>
  );
};