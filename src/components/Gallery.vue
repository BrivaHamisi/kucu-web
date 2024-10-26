<template>
    <div class="container mx-auto px-4 py-8 mt-20 mb-20">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2e3192] mb-10">Latest Photos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tall column -->
        <div class="relative overflow-hidden rounded-3xl shadow-md h-[calc(100vh-20rem)] max-h-[40rem]">
          <img :src="blogs[0].image" :alt="blogs[0].title" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-[#2e3192] to-transparent flex items-end">
            <p class="text-white text-2xl font-semibold p-6">{{ blogs[0].title }}</p>
          </div>
        </div>
        
        <!-- Two columns with two cards each -->
        <div v-for="col in [1, 2]" :key="col" class="space-y-6">
          <div v-for="(blog, index) in blogs.slice(1 + (col - 1) * 2, 1 + col * 2)" :key="index" 
               class="relative overflow-hidden rounded-3xl shadow-md h-[calc((100vh-20rem)/2-1rem)] max-h-[19.5rem]">
            <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-[#2e3192] to-transparent flex items-end">
              <p class="text-white text-xl font-semibold p-6">{{ blog.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        blogs: [
          { title: "Thy will and Not Mine", image: "https://via.assets.so/img.jpg?w=800&h=1600&tc=%23cecece&bg=%23cecece&t=%22%22" },
          { title: "Yield not to thee", image: "https://via.assets.so/img.jpg?w=800&h=800&tc=%23cecece&bg=%23cecece&t=%22%22" },
          { title: "The Bride Who Knows Not Her Wedding Date", image: "https://via.assets.so/img.jpg?w=800&h=800&tc=%23cecece&bg=%23cecece&t=%22%22" },
          { title: "He had me in mind", image: "https://via.assets.so/img.jpg?w=800&h=800&tc=%23cecece&bg=%23cecece&t=%22%22" },
          { title: "I Lost guard", image: "https://via.assets.so/img.jpg?w=800&h=800&tc=%23cecece&bg=%23cecece&t=%22%22" },
        ]
      }
    }
  }
  </script>