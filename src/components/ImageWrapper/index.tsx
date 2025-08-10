import styles from "./index.module.css";

interface ImageWrapperProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const ImageWrapper = ({ src, alt, width, height }: ImageWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default ImageWrapper;
