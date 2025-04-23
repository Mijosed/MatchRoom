<template>
  <header class="py-4 border-b">
    <nav class="flex container items-center">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <NuxtImg width="56px" src="/icon-green.png" format="webp" alt="" />
        <span class="text-3xl ">MatchRoom</span>
      </NuxtLink>
      <ul class="flex items-center gap-6 ml-auto text-xl font-bold capitalize">
        <li v-if="!user">
          <NuxtLink to="/login"><Icon name="material-symbols:account-circle" />
        </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>