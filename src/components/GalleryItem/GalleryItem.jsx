import css from './GalleryItem.module.css';

function GalleryItem({ image, onImageClick }) {
  return (
    <li className={css.GalleryItem}>
      <img
        src={image.webformatURL}
        alt=""
        className={css.GalleryItem_image}
        onClick={() => onImageClick(image)}
      />
    </li>
  );
}

export default GalleryItem;
