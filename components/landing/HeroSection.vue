<template>
  <section class="relative h-screen w-full bg-blanc overflow-hidden text-white">
    <!-- Slider en fond -->
    <div class="absolute inset-0 z-0">
      <Swiper
        :autoplay="{ delay: 5000 }"
        :loop="true"
        :pagination="{ clickable: true }"
        class="h-full"
      >
        <SwiperSlide v-for="(img, i) in images" :key="i">
          <img :src="img" class="w-full h-full object-cover opacity-50" /> <!-- J'aimerais mettre un effet transparent sur l'image -->
        </SwiperSlide>
      </Swiper>
      <div class="absolute inset-0 bg-bleu bg-opacity-50 backdrop-blur-sm" />
    </div>

    <!-- Contenu au-dessus -->
    <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
      <h1 class="text-3xl sm:text-5xl font-bold mb-6 max-w-2xl">
        Trouvez. Négociez. Réservez. <br />
        <span class="text-orange">Reprenez le pouvoir</span> sur vos séjours.
      </h1>

      <div class="flex gap-4 flex-wrap justify-center">
        <button
          @click="router.push('/offers')"
          class="bg-orange text-white px-6 py-3 rounded-full text-lg hover:brightness-110 transition shadow-lg "
        >
          Découvrir l'expérience
        </button>
        <button
          @click="router.push('/register')"
          class="bg-white text-bleu px-6 py-3 rounded-full text-lg hover:bg-gray-100 transition shadow-lg"
        >
          S'inscrire
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
//router
import { useRouter } from 'vue-router'

// Initialiser le router correctement
const router = useRouter()

const images = [
  'https://picsum.photos/id/1036/1200/800',
  'https://picsum.photos/id/1011/1200/800',
  'https://picsum.photos/id/1015/1200/800'
]
</script>

<style scoped>
.bg-blanc {
  background-color: #blanc;
}
.text-orange {
  color: #EE890C;
}
.bg-orange {
  background-color: #EE890C;
}
</style>
