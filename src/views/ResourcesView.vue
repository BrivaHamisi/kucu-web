<template>
    <HeroSection/>
    <SubscribeSection/>
    <Footer/>
  </template>
  
  <script>
  
  import Footer from '../components/Footer.vue';
  import HeroSection from '../components/HeroSection.vue'
  import SubscribeSection from '../components/SubscribeSection.vue'
  import LandingSection from '../components/LandingSection.vue';
  
  export default {
    name: 'ResourcesView',
    components: {
      HeroSection,
      Footer,
      SubscribeSection,
      LandingSection
    }
  }
  </script>
  