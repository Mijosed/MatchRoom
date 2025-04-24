<script setup>
const unlocked = ref(false)
const dragging = ref(false)
const progress = ref(0)
const unlockThreshold = 0.9
const sliderRef = ref(null)
let animationFrame

const startDrag = (e) => {
  dragging.value = true
  const bar = sliderRef.value

  const move = (event) => {
    const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX
    const rect = bar.getBoundingClientRect()
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
    window.removeEventListener('touchmove', move)
    window.removeEventListener('touchend', stopDrag)

    if (!unlocked.value && progress.value < unlockThreshold) {
      animateBack()
    }
  }

  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', move)
  window.addEventListener('touchend', stopDrag)
}

const animateBack = () => {
  cancelAnimationFrame(animationFrame)
  const animate = () => {
    if (progress.value > 0) {
      progress.value -= 0.02
      animationFrame = requestAnimationFrame(animate)
    } else {
      progress.value = 0
    }
  }
  animate()
}
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
          Faites glisser pour découvrir l’offre du jour
        </p>

        <div
          ref="sliderRef"
          class="relative w-full max-w-sm h-12 bg-white bg-opacity-20 rounded-full overflow-hidden"
        >
          <!-- Barre de fond -->
          <div
            class="absolute top-0 left-0 h-full bg-white bg-opacity-30 rounded-full transition-all duration-100"
            :style="{ width: `${progress * 100}%` }"
          />

          <!-- Cadenas glissable -->
          <div
            class="absolute top-0 h-full w-12 flex items-center justify-center text-black text-xl font-bold z-10 cursor-pointer"
            :style="{ transform: `translateX(calc(${progress * 100}% - 0))`, transition: dragging ? 'none' : 'transform 0.2s ease' }"
            @mousedown="startDrag"
            @touchstart="startDrag"
          >
            {{ progress >= unlockThreshold ? '🔓' : '🔒' }}
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
