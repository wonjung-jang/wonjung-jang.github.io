import styles from "./index.module.css";

interface ImageWrapperProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  description?: string;
}

const ImageWrapper = ({
  src,
  alt,
  width,
  height,
  description,
}: ImageWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt={alt} width={width} height={height} />
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default ImageWrapper;
