/* ImageCarousel.css */
.carousel-container {
    position: relative;
    width: 80%; /* Adjust as needed */
    height: 600px; /* Adjust as needed */
    margin: auto;
    overflow: hidden;
    border: 2px gray solid;
    border-radius: 8px;
  }
  
  .carousel-image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .carousel-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
  }
  
  .carousel-image.slide-in-left {
    animation: slideInLeft 0.5s forwards;
  }
  
  .carousel-image.slide-in-right {
    animation: slideInRight 0.5s forwards;
  }
  
  .carousel-image.slide-out-left {
    animation: slideOutLeft 0.5s forwards;
  }
  
  .carousel-image.slide-out-right {
    animation: slideOutRight 0.5s forwards;
  }
  
  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutLeft {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
  
  @keyframes slideOutRight {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 2;
    border-radius: 50%;
  }
  
  .carousel-button.left {
    left: 10px;
  }
  
  .carousel-button.right {
    right: 10px;
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }

  
  .indicator {
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.5;
    transition: opacity 0.3s;
  }
  
  .indicator.active {
    opacity: 1;
  }
  ,import React, { useEffect, useState } from 'react';
import './style.css';

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    if (images.length === 0) {
      console.warn('No images provided to ImageCarousel.');
    }
  }, [images]);

  const handlePrev = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setDirection('prev');
  };

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    setDirection('next');
  };

  if (images.length === 0) {
    return <div className="carousel-container">No images to display</div>;
  }

  return (
    <div className="carousel-container">
      <button className="carousel-button left" onClick={handlePrev}>
        &lt;
      </button>
      <div className="carousel-image-container">
        <img
          src={images[prevIndex]}
          alt={`Slide ${prevIndex}`}
          className={`carousel-image ${direction === 'next' ? 'slide-out-left' : 'slide-out-right'}`}
        />
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={`carousel-image ${direction === 'next' ? 'slide-in-right' : 'slide-in-left'}`}
        />
      </div>
      <button className="carousel-button right" onClick={handleNext}>
        &gt;
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
сделай так чтобы при наведении на стрелки hover был чтобы задний фон при наведении был темнее, дальше добавь снизу фото что то типа счетчика как на изображении которую я приложил, и пусть снизу примерно на 100px будет компонент и снизу синяя линия который работает как Divider и слева этой линии слово транскрипт и снизу слова транскрпт пусть линия будет тольще на 4-6px и округленная а снизу всей линии текст которую можно передать как transcript. И сделай так чтобы к каждому изображению можно было передавать header такст который будет сверху компонента и отображаться сверху
