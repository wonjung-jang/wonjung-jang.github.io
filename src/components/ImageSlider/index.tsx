import React, { useState } from "react";
import styles from "./index.module.css";

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
    height: string;
  }[];
  description?: string;
}

const ImageSlider = ({ images, description }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={styles.imageContainer}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              height={image.height}
              className={styles.image}
            />
          ))}
        </div>

        {images.length > 1 && isHovered && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={goToPrevious}
              aria-label="이전 이미지"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={goToNext}
              aria-label="다음 이미지"
            >
              ›
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className={styles.indicators}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.active : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`이미지 ${index + 1}로 이동`}
              />
            ))}
          </div>
        )}
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default ImageSlider;
