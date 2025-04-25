<script setup>
definePageMeta({ layout: 'default' })
const selectedTab = ref('En cours')
import NegotiationTabs from '~/components/negotiations/NegotiationTabs.vue'
import NegotiationList from '~/components/negotiations/NegotiationList.vue'
const allOffers = [
  {
    id: 1,
    title: "Austin’s Saint Lazare Hotel",
    city: "Paris",
    date: "27/11 au 04/12/2024",
    people: 2,
    price: "675€",
    urgency: "Moins de 20 minutes pour confirmer",
    image: "https://picsum.photos/id/1018/400/200",
    status: "En cours",
    waiting_hotelier: true,
    counter_offer: false
  },
  {
    id: 2,
    title: "Le Faubourg Paris",
    city: "Paris",
    date: "27/12/2024",
    people: 2,
    price: "60€",
    urgency: "Contre-offre disponible",
    image: "https://picsum.photos/id/1015/400/200",
    status: "En cours",
    waiting_hotelier: false,
    counter_offer: true,
    counter_price: "55€"
  },
  {
    id: 3,
    title: "Hôtel de la Plage",
    city: "Biarritz",
    date: "05/08 au 12/08/2024",
    people: 3,
    price: "780€",
    urgency: "À régler",
    image: "https://picsum.photos/id/1019/400/200",
    status: "Validée",
    is_paid: false
  },
  {
    id: 4,
    title: "Hôtel du Lac",
    city: "Annecy",
    date: "10/09 au 17/09/2024",
    people: 2,
    price: "470€",
    urgency: "Déjà payé",
    image: "https://picsum.photos/id/1036/400/200",
    status: "Validée",
    is_paid: true
  },
  {
    id: 5,
    title: "Hôtel des Alpes",
    city: "Chamonix",
    date: "12/01 au 15/01/2025",
    people: 2,
    price: "620€",
    urgency: "Offre expirée",
    image: "https://picsum.photos/id/1038/400/200",
    status: "Perdues"
  }
]

</script>

<template>
  <section class="p-4 space-y-6">
    <h1 class="text-xl font-semibold">Mes négociations</h1>

    <NegotiationTabs v-model="selectedTab" />
    <p class="text-gray-600">Ne tardez pas, confirmer ces offres avant qu'elles n'expirent.</p>
    <NegotiationList :status="selectedTab" />
  </section>
</template>
