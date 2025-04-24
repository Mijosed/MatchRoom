<script setup>
const unlocked = ref(false)
const dragging = ref(false)
const progress = ref(0.05)
const unlockThreshold = 0.9
const sliderRef = ref(null)
let animationFrame
let startX = 0
let lastX = 0

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

    if (percent >= unlockThreshold) {
      unlocked.value = true
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
    if (progress.value > 0.05) {
      progress.value -= 0.05
      animationFrame = requestAnimationFrame(animate)
    } else {
      progress.value = 0.05
    }
  }
  animate()
}

// Surveiller les changements de statut pour les animations
watch(unlocked, (newValue) => {
  if (newValue) {
    // Aucune animation nécessaire si déjà déverrouillé
  }
})
</script>

<template>
  <div class="relative h-72 rounded-xl overflow-hidden shadow-lg">
    <!-- Background blur -->
    <img
      src="https://picsum.photos/id/1036/800/600"
      class="absolute inset-0 w-full h-full object-cover blur-md scale-105"
    />
    <div class="absolute inset-0 bg-black bg-opacity-50" />

    <!-- Content -->
    <div class="relative z-10 h-full w-full flex flex-col justify-center items-center text-white px-4">
      <template v-if="!unlocked">
        <p class="mb-6 text-lg font-semibold text-center">
          Faites glisser pour découvrir l'offre du jour
        </p>

        <div
          ref="sliderRef"
          class="relative w-full max-w-sm h-12 bg-white bg-opacity-20 rounded-full overflow-hidden"
        >
          <!-- Barre de progression -->
          <div
            class="absolute top-0 left-0 h-full bg-white bg-opacity-30 rounded-full transition-all duration-100"
            :style="{ width: `${progress * 100}%` }"
          />

          <!-- Cadenas glissable avec padding pour le contenir dans la barre -->
          <div
            class="absolute top-0 h-full aspect-square flex items-center justify-center bg-white rounded-full shadow-md text-black text-xl font-bold z-10 cursor-pointer"
            :class="{ 'bg-green-400': progress >= unlockThreshold }"
            :style="{ 
              left: `${progress * 100}%`, 
              transform: 'translateX(-50%)',
              transition: dragging ? 'none' : 'all 0.2s ease'
            }"
            @mousedown.prevent="startDrag"
            @touchstart.prevent="startDrag"
          >
            <transition name="flip" mode="out-in">
              <span v-if="progress >= unlockThreshold" key="unlocked" class="text-2xl">🔓</span>
              <span v-else key="locked" class="text-2xl">🔒</span>
            </transition>
          </div>
          
          <!-- Texte d'indication -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="text-white text-sm font-medium" :class="{ 'opacity-0': progress > 0.15 }">
              Glissez →
            </span>
          </div>
        </div>
      </template>

      <template v-else>
        <h2 class="text-2xl font-bold mb-2">Offre du jour !</h2>
        <p class="text-center text-sm">Hôtel Soleil à -30% à seulement 2km de votre position.</p>
        <button class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full shadow">
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
