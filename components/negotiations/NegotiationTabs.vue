<script setup>
const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const tabs = ['En cours', 'Validée', 'Perdues']

const selectTab = (tab) => {
  emit('update:modelValue', tab)
}
</script>

<template>
  <div class="flex gap-2 mb-4">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="selectTab(tab)"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium',
        modelValue === tab ? 'bg-bleu text-white' : 'bg-gray-100 text-gray-600'
      ]"
    >
      {{ tab }}
    </button>
  </div>
</template>
