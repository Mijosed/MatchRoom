<script setup lang="ts">
import LayoutShell from '@/components/layout/BackOfficeLayout.vue'
import { Users, Hotel, Bed } from 'lucide-vue-next'

const adminMenu = [
  { title: 'Utilisateurs', icon: Users, to: '/admin/users' },
  { title: 'Hôtels',       icon: Hotel, to: '/admin/hotels' },
  { title: 'Chambres',     icon: Bed,   to: '/admin/rooms' },
]
</script>

<template>
  <LayoutShell prefix="/admin" title="Admin" :menu="adminMenu">
    <NuxtPage />
  </LayoutShell>
</template>
