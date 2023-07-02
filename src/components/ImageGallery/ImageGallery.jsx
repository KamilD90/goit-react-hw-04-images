import css from './ImageGallery.module.css';
import GalleryItem from 'components/GalleryItem/GalleryItem';

function ImageGallery({ children, images, onImageClick }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <GalleryItem key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </ul>
  );
}

export default ImageGallery;
