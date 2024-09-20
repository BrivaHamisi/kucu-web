<template>
  <div class="home">
    <HeroSection/>
    <LandingSection/>
    <FeatureSection/>
    <FaqSection/>
    <SubscribeSection/>
    <Footer/>
  </div>
</template>

<script>

import Footer from '../components/Footer.vue';
import HeroSection from '../components/HeroSection.vue'
import FeatureSection from '../components/MissionVisionSection.vue'
import SubscribeSection from '../components/SubscribeSection.vue'
import FaqSection from '../components/FaqSection.vue'
import LandingSection from '../components/LandingSection.vue';


export default {
  name: 'HomeView',
  components: {
    HeroSection,
    Footer,
    FeatureSection,
    SubscribeSection,
    FaqSection,
    LandingSection
  }
}
</script>
