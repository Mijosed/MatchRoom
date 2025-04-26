<script setup lang="ts">
import LayoutShell from '@/components/layout/BackOfficeLayout.vue'
import { Tag, CalendarCheck, Gauge, Calendar } from 'lucide-vue-next'

const ownerMenu = [
  { 
    title: 'Offres', icon: Tag, to: '/owner/offres',
    children: [
      { title: 'Toutes les offres', to: '/owner/offres' },
      { title: 'Nouvelle offre',   to: '/owner/offres/create' },
    ]
  },
  { title: 'Réservations',   icon: CalendarCheck, to: '/owner/reservations' },
  { title: 'Seuils',         icon: Gauge,        to: '/owner/seuil' },
  { title: 'Saisonalité',    icon: Calendar,     to: '/owner/saisonalite' },
]
</script>

<template>
  <LayoutShell prefix="/owner" title="Owner" :menu="ownerMenu">
    <NuxtPage />
  </LayoutShell>
</template>
