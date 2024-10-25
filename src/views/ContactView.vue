<template>
    <HeroSection/>
    <Footer/>
  </template>
  
  <script>
  
  import Footer from '../components/Footer.vue';
  import HeroSection from '../components/HeroSection.vue'
  
  export default {
    name: 'ContactView',
    components: {
      HeroSection,
      Footer,
    }
  }
  </script>
  