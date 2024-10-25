<template>
  <div class="home">
    <HeroSection/>
    <!-- <LandingSection/> -->
    <FeatureSection/>
    <!-- <FaqSection/> -->
    <!-- <SubscribeSection/> -->
     <BlogsandInspiration/>
    <Footer/>
  </div>
</template>

<script>

import Footer from '../components/Footer.vue';
import HeroSection from '../components/HeroSection.vue'
import FeatureSection from '../components/MissionVisionSection.vue'
import BlogsandInspiration from '../components/BlogsandInspiration.vue'


export default {
  name: 'HomeView',
  components: {
    HeroSection,
    Footer,
    BlogsandInspiration,
    FeatureSection,
  }
}
</script>
