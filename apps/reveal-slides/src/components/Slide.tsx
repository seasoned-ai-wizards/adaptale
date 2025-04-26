import React from 'react';
import { SlideDataType, SectionData } from './types';
import { VerticalSlide } from './VerticalSlide';
import { TwoColumnSlide } from './TwoColumnSlide';

interface SlideProps {
  data: SlideDataType | SectionData;
}

export const Slide: React.FC<SlideProps> = ({ data }) => {
  // Check if this is a section with nested slides
  if ('slides' in data) {
    return (
      <section key={data.id}>
        {data.slides.map((slideData) => {
          if (slideData.type === 'vertical') {
            return <VerticalSlide key={slideData.id} data={slideData} />;
          } else if (slideData.type === 'two-column') {
            return <TwoColumnSlide key={slideData.id} data={slideData} />;
          }
          return null;
        })}
      </section>
    );
  }

  // Regular slide
  if (data.type === 'vertical') {
    return <VerticalSlide data={data} />;
  } else if (data.type === 'two-column') {
    return <TwoColumnSlide data={data} />;
  }

  return null;
};