<script setup>
import downloads from "../data/downloads";
</script>

<template>
    <!-- Download Section Start -->
    <div id="download-section" class="container mx-auto px-5 md:w-4/5">
        <section class="py-16 pt-18">
            <div class="w-full md:w-3/5 mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-theme-heading font-medium mb-4">Download the Extension</h2>
                <p class="text-theme-grayish-blue text-lg font-theme-content">We've got more browsers in the pipeline. Please let us know if you have a favorite you'd like us to prioritize.</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <div v-for="(download,) in downloads" :key="download.id" class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                    <div class="flex justify-center items-center py-6">
                        <img :src="download.icon" alt="Browser Logo" class="w-16 h-16" />
                    </div>
                    <div class="text-center px-6 py-4 flex-1">
                        <h3 class="text-2xl font-theme-heading font-medium mb-2">{{ download.title }}</h3>
                        <p class="text-md font-theme-content text-theme-grayish-blue mb-4">{{ download.subTitle }}</p>
                    </div>
                    <div class="flex justify-center mb-6">
                        <img class="w-full max-w-full" src="/images/bg-dots.svg" alt="Dot Background" />
                    </div>
                    <div class="flex justify-center pb-6">
                        <LinkButton btn-type="primary" :link="download.link" class="text-sm px-4 py-2">Add & Install Extension</LinkButton>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- Download Section End -->

     <!-- Styled Section Start -->
  <div class="container mx-auto px-5 py-16">
    <div class="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Image Section -->
      <div class="flex-1 md:w-1/2">
        <img src="/images/illustration-hero.svg" alt="Descriptive Alt Text" class="w-full h-auto object-cover"/>
      </div>
      <!-- Text Section -->
      <div class="flex-1 md:w-1/2 p-6 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Your Title Here</h2>
        <p class="text-lg text-gray-600">This is a paragraph of text that provides additional information about the section. It can be a description, an introduction, or any other content that complements the image on the left.</p>
      </div>
    </div>
  </div>
  <!-- Styled Section End -->
</template>

