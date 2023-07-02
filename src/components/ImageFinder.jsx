import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from '../utils/API/fetchImages';
import css from './ImageFinder.module.css';
import Notiflix from 'notiflix';
// import GalleryItem from './GalleryItem/GalleryItem';
import ImageGallery from './ImageGallery/ImageGallery';
import { Audio } from 'react-loader-spinner';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

import Modal from './Modal/Modal';

export class ImageFinder extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0,
      searchTerm: '',
      images: [],
      isLoading: false,
      error: null,
      showModal: false,
      selectedImage: null,
    };
  }

  handleSubmit = async (searchTerm, currentPage) => {
    try {
      this.setState({ isLoading: true, error: null });

      const images = await fetchImages(searchTerm, currentPage);
      console.log(images);

      this.setState({ images, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false, error });

      Notiflix.Notify.warning(
        'Wystąpił błąd podczas pobierania obrazów',
        error
      );
    }
  };

  handleLoadMore = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchTerm, currentPage, images } = this.state;
      const nextPage = currentPage + 1;
      const newImages = await fetchImages(searchTerm, nextPage);
      this.setState({
        images: [...images, ...newImages],
        currentPage: nextPage,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
      console.error('Error fetching more images:', error);
    }
  };

  clearImages = () => {
    this.setState({ images: [] });
  };

  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  getSearchTerm = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage } = this.state;

    return (
      <div className={css.App}>
        <SearchBar
          className={css.Searchbar}
          onSubmit={this.handleSubmit}
          onClearImages={this.clearImages}
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
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {images.length > 0 && !isLoading && (
          <LoadMoreBtn onClick={this.handleLoadMore}>Load More</LoadMoreBtn>
        )}

        {showModal && (
          <Modal onClose={this.handleCloseModal}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </div>
    );
  }
}
