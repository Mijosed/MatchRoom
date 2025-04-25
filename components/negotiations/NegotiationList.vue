<script setup>
import NegotiationCard from './NegotiationCard.vue'

const props = defineProps({
  status: String
})

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
    urgency: "Plus que 1 heure pour confirmer",
    image: "https://picsum.photos/id/1019/400/200",
    status: "Validée",
    is_paid: true
  },
  {
    id: 4,
    title: "Hôtel du Lac",
    city: "Annecy",
    date: "10/09 au 17/09/2024",
    people: 2,
    price: "470€",
    urgency: "Contre-offre validée",
    image: "https://picsum.photos/id/1036/400/200",
    status: "Validée",
    is_paid: false
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
  },
  {
    id: 6,
    title: "Hôtel de la Mer",
    city: "Nice",
    date: "20/07 au 27/07/2024",
    people: 4,
    price: "1050€",
    urgency: "Offre expirée",
    image: "https://picsum.photos/id/1044/400/200",
    status: "Perdues"
  }
]


const filtered = computed(() => allOffers.filter(o => o.status === props.status))
</script>

<template>
  <div class="space-y-4">
    <NegotiationCard
      v-for="offer in filtered"
      :key="offer.id"
      :offer="offer"
    />
    <p v-if="filtered.length === 0" class="text-sm text-gray-400">Aucune offre dans cette catégorie.</p>
  </div>
</template>
