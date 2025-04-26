<script setup>
import { computed } from 'vue'

const props = defineProps({
  min:        { type: Number, required: true },
  max:        { type: Number, required: true },
  modelValue: { type: Number, required: true }
})
const emit = defineEmits(['update:modelValue', 'submit'])

const updateValue = e => {
  emit('update:modelValue', Number(e.target.value))
}

const ratio = computed(() =>
  (props.modelValue - props.min) / (props.max - props.min)
)
const clamped = computed(() =>
  Math.min(Math.max(ratio.value, 0), 1)
)
</script>

<template>
  <div
    class="fixed bottom-24 sm:bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[500px] select-none z-50"
  >
    <div class="flex items-center bg-gray-200 pl-[35px] pr-[20px] h-[70px] rounded-full py-4 shadow-lg">
      
      <div class="relative flex-1">
        <input
          type="range"
          :min="min"
          :max="max"
          :value="modelValue"
          @input="updateValue"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div
          class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-600 text-white rounded-full h-14 w-14 flex items-center justify-center text-sm font-semibold pointer-events-none shadow transition-all duration-150 z-20"
          :style="{ left: clamped * 100 + '%' }"
        >
          {{ modelValue }}€
        </div>

        <div class="flex h-full justify-between items-center -mx-[7px] text-sm text-gray-700">
          <span class="font-bold">{{ min }}€</span>
          <span class="font-bold">{{ max }}€</span>
        </div>
      </div>

      <button
        @click="$emit('submit', modelValue)"
        class="ml-10 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
        style="width: 96px;"
      >
        Négocier
      </button>
    </div>
  </div>
</template>
