<template>
    <HeroSection/>
    
    <SubscribeSection/>
    <Footer/>
  </template>
  
  <script>
  
  import Footer from '../components/Footer.vue';
  import HeroSection from '../components/HeroSection.vue'
  import SubscribeSection from '../components/SubscribeSection.vue'
  
  export default {
    name: 'ContactView',
    components: {
      HeroSection,
      Footer,
      SubscribeSection,
    }
  }
  </script>
  