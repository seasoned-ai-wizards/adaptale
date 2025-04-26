import React, { ReactNode } from 'react';

// Define the item types for slide content
export type SlideItemType = 'heading' | 'paragraph' | 'list-item';
export type SlideTemplate = 'one-column' | 'two-columns';
export type SlideListType = 'ul' | 'ol';
export type ImageOrientation = 'left' | 'right';

// Interface for individual content items
export interface SlideItem {
  type: SlideItemType;
  content: string;
}

// Main slide data interface - simplified without children
export interface SlideData {
  id: string;
  template: SlideTemplate;
  items: SlideItem[];
  listType?: SlideListType;
  image?: string;
  imageOrientation?: ImageOrientation;
  fragment?: boolean;
  titleInColumn?: boolean;
  background?: string;
}

// Component to render a single slide based on the data
export const Slide: React.FC<SlideData> = ({
  id: id,
  template,
  items,
  listType = 'ol',
  image,
  imageOrientation = 'right',
  fragment = false,
  titleInColumn = false,
  background
}) => {
  // Helper to render content items with optional fragments
  const renderItems = (items: SlideItem[], withFragment: boolean = false) => {
    return items.map((item, index) => {
      const content = (() => {
        switch (item.type) {
          case 'heading':
            return <h1>{item.content}</h1>;
          case 'paragraph':
            return <p>{item.content}</p>;
          case 'list-item':
            return item.content;
          default:
            return null;
        }
      })();

      // Apply fragment class if needed (skip the first item if it's a heading)
      const shouldFragment = withFragment && !(index === 0 && item.type === 'heading');
      const className = shouldFragment ? 'fragment fade-in' : '';

      if (item.type === 'list-item') {
        // List items will be collected and rendered as a list
        return null;
      }

      return React.cloneElement(content as React.ReactElement, { 
        key: `item-${index}`,
        className 
      });
    });
  };

  // Render list items if any
  const renderList = (items: SlideItem[], withFragment: boolean = false) => {
    const listItems = items.filter(item => item.type === 'list-item');
    
    if (listItems.length === 0) return null;
    
    const ListComponent = listType === 'ul' ? 'ul' : 'ol';
    
    return (
      <ListComponent key="list">
        {listItems.map((item, index) => (
          <li 
            key={`list-item-${index}`} 
            className={withFragment ? 'fragment fade-in' : ''}
          >
            {item.content}
          </li>
        ))}
      </ListComponent>
    );
  };

  // Render a one-column layout
  const renderOneColumn = () => {
    return (
      <div>
        {renderItems(items, fragment)}
        {renderList(items, fragment)}
        {image && (
          <img className='r-stretch' src={image} alt="Slide image" />
        )}
      </div>
    );
  };

  // Render a two-column layout
  const renderTwoColumns = () => {
    const headingItems = items.filter(item => item.type === 'heading');
    const contentItems = items.filter(item => item.type !== 'heading' || titleInColumn);

    const imageColumn = (
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
        {image && <img data-id="image" src={image} alt="Slide image" />}
      </div>
    );

    const contentColumn = (
      <div style={{ flex: '1', padding: '0 20px', justifyContent: 'left' }}>
        {titleInColumn && headingItems.map((item, index) => (
          <h2 data-id={`heading`} key={`heading-${index}`}>{item.content}</h2>
        ))}
        {renderItems(contentItems.filter(item => item.type !== 'list-item' && item.type !== 'heading'), fragment)}
        {renderList(contentItems, fragment)}
      </div>
    );

    return (
      <>
        <section key={`${id}-part1`} data-auto-animate>
          {!titleInColumn && headingItems.map((item, index) => (
            <h1 key={`heading-${index}`}>{item.content}</h1>
          ))}
          {titleInColumn && headingItems.map((item, index) => (
            <h2 data-id={`heading`} key={`heading-${index}`}>{item.content}</h2>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            {image && <img data-id="image" src={image} alt="Slide image" />}
          </div>
        </section>
        <section key={`${id}-part2`} data-auto-animate>
            {!titleInColumn && headingItems.map((item, index) => (
              <h1 key={`heading-${index}`}>{item.content}</h1>
            ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              {imageOrientation === 'left' ? imageColumn : null}
              {contentColumn}
              {imageOrientation === 'right' ? imageColumn : null}
          </div>
        </section>
      </>
    );
  };

  return (
    <section key={id} data-background={background}>
      {template === 'one-column' ? renderOneColumn() : renderTwoColumns()}
    </section>
  );
};

// Component to render multiple slides
export const RenderSlides: React.FC<{ slides: SlideData[] }> = ({ slides }) => {
  return (
    <>
      {slides.map((slide, index) => (
        <Slide key={`slide=${index}`} {...slide} />
      ))}
    </>
  );
};