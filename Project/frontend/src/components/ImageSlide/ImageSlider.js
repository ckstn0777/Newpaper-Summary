import React from 'react';
// import styled from 'styled-components';
// import { color, responsive } from '../../lib/styles/utils';
// import { Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import './ImageSlider.scss';

const images = [
  {
    original: '/images/gallery_img1.jpg',
    thumbnail: '/images/gallery_img1.jpg',
    title: 'Feel the beauty of Africa',
    detail: `Get in touch with all the nature, life, meanings of africa only by
    reading articles, watching fotos and living the life you can see on
    "TRAVELER"`,
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
    title: 'Feel the beauty of Africa',
    detail: `Get in touch with all the nature, life, meanings of africa only by
    reading articles, watching fotos and living the life you can see on
    "TRAVELER"`,
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
    title: 'Feel the beauty of Africa',
    detail: `Get in touch with all the nature, life, meanings of africa only by
    reading articles, watching fotos and living the life you can see on
    "TRAVELER"`,
  },
];

const ImageSlider = () => {
  return (
    <ImageGallery
      items={images}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showNav={true}
      showBullets={true}
      autoPlay={true}
      slideInterval={30000}
      slideDuration={1000}
    />
  );
};

export default ImageSlider;
