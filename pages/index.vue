<script setup>
definePageMeta({
  layout: 'void'
})
import HeroSection from '@/components/landing/HeroSection.vue'
import ConceptSection from '@/components/landing/ConceptSection.vue'
import WhyMatchRoom from '~/components/landing/WhyMatchRoom.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import GamifiedExperience from '~/components/landing/GamifiedExperience.vue'
import FeaturedHotels from '~/components/landing/FeaturedHotels.vue'
import FinalCallToAction from '~/components/landing/FinalCallToAction.vue'
import FooterSection from '@/components/landing/FooterSection.vue'
</script>

<template>
<HeroSection />
<ConceptSection />
<WhyMatchRoom />
<TestimonialsSection />
<GamifiedExperience />
<FeaturedHotels />
<FinalCallToAction />
<FooterSection />
</template>
