<template>
  <div class="home">
    <HeroSection/>
    <!-- <FeatureSection/> -->
     <MissionVision/>
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
import BlogsandInspiration from '../components/BlogsandInspiration.vue'
import Gallery from '../components/Gallery.vue'
import ContactUs from '../components/ContactUs.vue'
import Testimonies from '../components/Testimonies.vue'
import MissionVision from '../components/MissionVision.vue'


export default {
  name: 'HomeView',
  components: {
    HeroSection,
    Footer,
    MissionVision,
    BlogsandInspiration,
    Gallery,
    ContactUs,
    Testimonies
  }
}
</script>
