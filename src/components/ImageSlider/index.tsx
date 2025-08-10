import styles from "./index.module.css";

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
    height: string;
  }[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  return (
    <div className={styles.slider}>
      {images.map((image) => (
        <img src={image.src} alt={image.alt} height={image.height} />
      ))}
    </div>
  );
};

export default ImageSlider;
