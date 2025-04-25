<script setup>
import { computed } from 'vue'

const props = defineProps({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  modelValue: { type: Number, required: true }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const updateValue = (e) => {
  emit('update:modelValue', Number(e.target.value))
}

const rangePercent = computed(() => {
  const raw = (props.modelValue - props.min) / (props.max - props.min)
  return Math.min(Math.max(raw, 0), 0.92)
})

const thumbOffset = computed(() => {
  return `calc(${rangePercent.value * 100}% - 28px)` // 28px = moitié du cercle
})
</script>

<template>
  <div class="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[500px] z-50">
    <div class="flex bg-gray-200 rounded-full px-4 py-4 shadow-lg relative">
      
      <div class="flex-1 relative">
        <input
          type="range"
          :min="min"
          :max="max"
          :value="modelValue"
          @input="updateValue"
          class="absolute w-full h-full opacity-0 z-10 cursor-pointer"
        />

        <div
          class="absolute top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full h-14 w-14 flex items-center justify-center text-sm font-semibold pointer-events-none shadow transition-all duration-150"
          :style="{ left: thumbOffset }"
        >
          {{ modelValue }}€
        </div>

        <div class="flex justify-between px-2 text-sm text-gray-700 relative z-0">
          <span>{{ min }}€</span>
          <span>{{ max }}€</span>
        </div>
      </div>

      <div class="pl-3 flex items-center">
        <button
          @click="$emit('submit', modelValue)"
          class="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
          style="width: 96px;"
        >
          Négocier
        </button>
      </div>
    </div>
  </div>
</template>
