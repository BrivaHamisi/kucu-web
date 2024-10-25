<template>
  <HeroSection/>
   <LeadersSection/>
  <Footer/>
</template>

<script>

import Footer from '../components/Footer.vue';
import HeroSection from '../components/HeroSection.vue'
import LeadersSection from '@/components/LeadersSection.vue';

export default {
  name: 'AboutView',
  components: {
    HeroSection,
    Footer,
    LeadersSection
  }
}
</script>
