import { SlideData } from './Slides';

// Define all the slides using a flat structure without nesting
export const slides: SlideData[] = [
  // world-1: one-column template with fragments
  {
    id: 'world-1',
    template: 'one-column',
    items: [
      { type: 'heading', content: 'Welcome to my' },
      { type: 'heading', content: 'My Story' },
      { type: 'paragraph', content: 'A journey through words and images' }
    ],
    fragment: true,
    background: '/theme-world/bg1.jpeg'
  },
  
  // my-planet: two-columns template with image on right and paragraph
  {
    id: 'my-planet',
    template: 'two-columns',
    items: [
      { type: 'heading', content: 'My Planet Earth' },
      { type: 'paragraph', content: 'This is Earth. For billions of years, Earth has been our amazing home, with just the right temperature for plants, animals, and people to thrive.' }
    ],
    image: '/world-content/planet_earth.png',
    imageOrientation: 'right',
    background: '/theme-world/bg2.jpeg'
  },
  
  // my-planet-3: two-columns with title in column, image on left, paragraph and list
  {
    id: 'my-planet-3',
    template: 'two-columns',
    background: '/theme-world/bg3.jpeg',
    items: [
      { type: 'heading', content: 'My Planet Earth' },
      { type: 'paragraph', content: 'some paragraph' },
      { type: 'list-item', content: 'One' },
      { type: 'list-item', content: 'Two' },
      { type: 'list-item', content: 'Three' }
    ],
    listType: 'ul',
    image: '/world-content/planet_earth.png',
    imageOrientation: 'right',
    titleInColumn: true
  }
];
