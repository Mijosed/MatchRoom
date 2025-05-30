<script setup>
const unlocked = ref(false)
const dragging = ref(false)
const initialProgress = 0.06  // Variable pour stocker la position initiale
const progress = ref(initialProgress)
const unlockThreshold = 0.9
const sliderRef = ref(null)
let animationFrame
let startX = 0
let lastX = 0
const blurAmount = ref(8) // Valeur initiale du flou

// Fonction pour faire vibrer l'appareil
const vibrate = () => {
  if (window.navigator && window.navigator.vibrate) {
    // Vibrer pendant 100ms
    window.navigator.vibrate(100)
  }
}

const startDrag = (e) => {
  e.preventDefault()
  dragging.value = true
  const bar = sliderRef.value
  const rect = bar.getBoundingClientRect()
  
  // Capture la position initiale
  startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
  lastX = startX

  const move = (event) => {
    // Empêcher le défilement de la page lors du glissement
    event.preventDefault()
    
    // Obtenir la position actuelle
    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX
    lastX = clientX
    
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    progress.value = percent
    
    // Réduire progressivement le flou en fonction de la progression
    blurAmount.value = Math.max(8 - (percent * 9), 0)

    if (percent >= unlockThreshold) {
      unlocked.value = true
      blurAmount.value = 0 // Supprimer complètement le flou
      vibrate() 
      stopDrag()
    }
  }

  const stopDrag = () => {
    dragging.value = false
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', stopDrag)
    window.removeEventListener('touchmove', move, { passive: false })
    window.removeEventListener('touchend', stopDrag)

    if (!unlocked.value && progress.value < unlockThreshold) {
      animateBack()
    }
  }

  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', move, { passive: false })
  window.addEventListener('touchend', stopDrag)
}

const animateBack = () => {
  cancelAnimationFrame(animationFrame)
  const animate = () => {
    if (progress.value > initialProgress) {
      progress.value -= 0.05
      blurAmount.value = Math.min(8, blurAmount.value + 0.3) // Rétablir le flou progressivement
      animationFrame = requestAnimationFrame(animate)
    } else {
      progress.value = initialProgress
      blurAmount.value = 8 // Rétablir le flou complet
    }
  }
  animate()
}

// Surveiller les changements de statut pour les animations
watch(unlocked, (newValue) => {
  if (newValue) {
    // Animation de défloutage complet
    blurAmount.value = 0
  }
})
</script>

<template>
  <div class="relative h-72 rounded-xl overflow-hidden shadow-lg">
    <!-- Background blur avec transition -->
    <img
      src="/chambre.png"
      class="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-300"
      :class="unlocked ? '' : 'bg-opacity-90'"
      :style="{ filter: `blur(${blurAmount}px)` }"
    />
    <div 
      class="absolute inset-0 bg-black transition-opacity duration-300" 
      :class="{ 'bg-opacity-50': !unlocked, 'bg-opacity-0': unlocked }"
    />

    <!-- Content -->
    <div class="relative z-10 h-full w-full flex flex-col justify-center items-center text-white px-4">
      <template v-if="!unlocked">
        <p class="mb-6 text-lg font-semibold text-center">
          Faites glisser pour découvrir l'offre du jour
        </p>

        <div
  ref="sliderRef"
  class="relative w-full max-w-md h-14 bg-[#2E2E2E] border border-bleu rounded-full overflow-hidden px-1"
>
  <!-- Barre de progression -->
  <div 
    class="absolute top-0 left-0 h-full bg-bleu bg-opacity-25 z-0 transition-all"
    :style="{ width: `${progress * 100}%` }"
  ></div>
  
  <!-- Curseur draggable -->
  <div
    class="absolute top-1/2 -translate-y-1/2 h-12 w-12 bg-bleu rounded-full z-10 flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all"
    :style="{ left: `calc(${progress * 100}% - 1.5rem)` }"
    @mousedown.prevent="startDrag"
    @touchstart.prevent="startDrag"
  >
    <transition name="flip" mode="out-in">
    </transition>
  </div>
</div>

      </template>

      <template v-else>
        <h2 class="text-3xl font-bold mb-2 text-shadow-xl">Offre du jour !</h2>
        <p class="text-center text-md text-shadow-xl">Hôtel Cheval Blanc à -30% à seulement 2km de votre position.</p>
        <button class="mt-4 px-4 py-2 bg-bleu text-white rounded-full shadow">
          Réserver
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.flip-enter-active, .flip-leave-active {
  transition: all 0.3s ease;
}
.flip-enter-from, .flip-leave-to {
  transform: rotateY(90deg);
  opacity: 0;
}
</style>
