<template>
  <div class="home">
    <HeroSection/>
    <FeatureSection/>
    <Gallery/>
     <BlogsandInspiration/>
     <Testimonies/>
     <ContactUs/>
    <Footer/>
  </div>
</template>

<script>

import Footer from '../components/Footer.vue';
import HeroSection from '../components/HeroSection.vue'
import FeatureSection from '../components/MissionVisionSection.vue'
import BlogsandInspiration from '../components/BlogsandInspiration.vue'
import Gallery from '../components/Gallery.vue'
import ContactUs from '../components/ContactUs.vue'
import Testimonies from '../components/Testimonies.vue'


export default {
  name: 'HomeView',
  components: {
    HeroSection,
    Footer,
    BlogsandInspiration,
    Gallery,
    FeatureSection,
    ContactUs,
    Testimonies
  }
}
</script>
