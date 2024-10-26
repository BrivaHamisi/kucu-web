<template>
    <div class="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-indigo-700 text-center mb-2">Insights & Inspirations:</h2>
        <h3 class="text-xl text-indigo-600 text-center mb-8">Top Blogs</h3>
        <Carousel :items-to-show="1" :breakpoints="breakpoints" :wrap-around="true">
          <Slide v-for="post in blogPosts" :key="post.id">
            <div class="carousel__item bg-white rounded-2xl shadow-lg overflow-hidden mx-2 border border-gray-200 transform transition duration-300 hover:scale-105">
              <img :src="post.image" :alt="post.title" class="w-full h-56 object-cover" />
              <div class="p-6">
                <h4 class="text-xl font-semibold text-indigo-700 mb-3">{{ post.title }}</h4>
                <p class="text-gray-600 text-sm mb-4">{{ post.excerpt }}</p>
                <button class="bg-[#cd3700] text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-[#cd3700]/90 transition duration-300 shadow-md hover:shadow-lg">More</button>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </template>
  
  <script>
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  
  export default {
    name: 'BlogCarousel',
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
    data() {
      return {
        blogPosts: [
          {
            id: 1,
            title: 'Thy will and Not Mine',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            image: 'https://via.assets.so/img.jpg?w=400&h=300&tc=%23cecece&bg=%23cecece'
          },
          {
            id: 2,
            title: 'Thy will and Not Mine',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            image: 'https://via.assets.so/img.jpg?w=400&h=300&tc=%23cecece&bg=%23cecece'
          },
          {
            id: 3,
            title: 'Thy will and Not Mine',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            image: 'https://via.assets.so/img.jpg?w=400&h=300&tc=%23cecece&bg=%23cecece'
          },
          {
            id: 4,
            title: 'Thy will and Not Mine',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            image: 'https://via.assets.so/img.jpg?w=400&h=300&tc=%23cecece&bg=%23cecece'
          }
        ],
        breakpoints: {
          640: {
            itemsToShow: 2,
            snapAlign: 'center',
          },
          1024: {
            itemsToShow: 3,
            snapAlign: 'start',
          },
          1280: {
            itemsToShow: 4,
            snapAlign: 'start',
          },
        },
      }
    }
  }
  </script>
  
  <style scoped>
  .carousel__slide {
    padding: 10px;
  }
  .carousel__viewport {
    perspective: 2000px;
  }
  .carousel__track {
    transform-style: preserve-3d;
  }
  .carousel__slide--sliding {
    transition: 0.5s;
  }
  .carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
  }
  .carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
  }
  .carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
  }
  .carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
  }
  .carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
  }
  .carousel__pagination {
    padding-top: 20px;
  }
  .carousel__pagination-button::after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #2e3192;
  }
  .carousel__pagination-button--active::after {
    background-color: #cd3700;
  }
  </style>