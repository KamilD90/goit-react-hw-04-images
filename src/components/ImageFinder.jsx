import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from '../utils/API/fetchImages';
import React, { useState, useEffect } from 'react';
import css from './ImageFinder.module.css';
import Notiflix from 'notiflix';
// import GalleryItem from './GalleryItem/GalleryItem';
import ImageGallery from './ImageGallery/ImageGallery';
import { Audio } from 'react-loader-spinner';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

import Modal from './Modal/Modal';

const ImageFinder = () => {
 
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError]= useState(false);
  const[showModal, setShowModal]= useState(false);
  const[selectedImage, setSelectedImage]= useState(null);
  const[searchTerm, setSearchTerm]= useState("");
  
  const handleSubmit = async (searchTerm, currentPage) => {
    try {
      setIsLoading(true);
      setError(null);

      const fetchedImages= await fetchImages(searchTerm, currentPage);
      setImages (fetchedImages);

      setIsLoading(false);
    } catch (error) {
      
      setIsLoading(false);
      setError(error);

      Notiflix.Notify.warning(
        'Wystąpił błąd podczas pobierania obrazów',
        error
      );
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const newImages = await fetchImages(searchTerm, nextPage);
      setImages(prevImages => [...prevImages, ...newImages]);
        setCurrentPage(nextPage);
        setIsLoading(false);
        setError(null);
      
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error('Error fetching more images:', error);
    }
  };

  const clearImages = () => {
    setImages([]);
  };

  const handleImageClick = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };


const handleSearchTermChange= e => {
  setSearchTerm(e.target.value); 
  };

  useEffect(() => {
    if (searchTerm) {
      handleSubmit(searchTerm, currentPage);
    }
  }, [searchTerm, currentPage]);


    return (
      <div className={css.App}>
        <SearchBar
          className={css.Searchbar}
          onSubmit={handleSubmit}
          onClearImages={clearImages}
          onSearchTermChange={handleSearchTermChange}
        />

        {error && <p>Error: {error.message}</p>}
        {isLoading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle=""
            wrapperClass={isLoading.toString()} // Convert boolean to string
          />
        )}
        <ImageGallery images={images} onImageClick={handleImageClick} />
        {images.length > 0 && !isLoading && (
          <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
        )}

        {showModal && (
          <Modal onClose={handleCloseModal}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </div>
    );
  }

  export default ImageFinder;