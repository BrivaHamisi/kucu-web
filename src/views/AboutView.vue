<template>
  <HeroSection/>
  <!-- <LeaedersSection/> -->
   <LeadersSection/>
  <AboutIntroSection/>
  <div class="about">

    <h1>This is an about page</h1>
  </div>
  <SubscribeSection/>
  <Footer/>
</template>

<script>

import Footer from '../components/Footer.vue';
import HeroSection from '../components/HeroSection.vue'
import AboutIntroSection from '../components/AboutIntroSection.vue'
import SubscribeSection from '../components/SubscribeSection.vue'
import LeadersSection from '@/components/LeadersSection.vue';

export default {
  name: 'AboutView',
  components: {
    HeroSection,
    Footer,
    AboutIntroSection,
    SubscribeSection,
    LeadersSection
  }
}
</script>
