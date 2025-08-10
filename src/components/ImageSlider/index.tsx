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
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {images.map((image) => (
          <img src={image.src} alt={image.alt} height={image.height} />
        ))}
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default ImageSlider;
