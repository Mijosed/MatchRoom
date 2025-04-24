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
    status: "En cours"
  },
  {
    id: 2,
    title: "Le Faubourg Paris",
    city: "Paris",
    date: "27/12/2024",
    people: 2,
    price: "60€",
    urgency: "Plus que 3 heures pour confirmer",
    image: "https://picsum.photos/id/1015/400/200",
    status: "Validée"
  },
    {
        id: 3,
        title: "Hôtel de la Plage",
        city: "Biarritz",
        date: "27/11 au 04/12/2024",
        people: 2,
        price: "675€",
        urgency: "Moins de 20 minutes pour confirmer",
        image: "https://picsum.photos/id/1019/400/200",
        status: "Perdues"
    },
    {
        id: 4,
        title: "Hôtel du Lac",
        city: "Annecy",
        date: "27/11 au 04/12/2024",
        people: 2,
        price: "675€",
        urgency: "Moins de 20 minutes pour confirmer",
        image: "https://picsum.photos/id/1036/400/200",
        status: "En cours"
    },
    {
        id: 5,
        title: "Hôtel de la Mer",
        city: "Nice",
        date: "27/11 au 04/12/2024",
        people: 2,
        price: "675€",
        urgency: "Moins de 20 minutes pour confirmer",
        image: "https://picsum.photos/id/1037/400/200",
        status: "Validée"
    },
    {
        id: 6,
        title: "Hôtel des Alpes",
        city: "Chamonix",
        date: "27/11 au 04/12/2024",
        people: 2,
        price: "675€",
        urgency: "Moins de 20 minutes pour confirmer",
        image: "https://picsum.photos/id/1038/400/200",
        status: "Perdues",
    },
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
