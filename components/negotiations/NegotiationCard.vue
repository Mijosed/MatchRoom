<script setup>
const props = defineProps({
  offer: Object
})

const acceptOffer = (id) => alert(`✅ Offre ${id} acceptée`)
const declineOffer = (id) => alert(`❌ Offre ${id} refusée`)
import { loadStripe } from '@stripe/stripe-js'

const config = useRuntimeConfig()
const stripePromise = loadStripe(config.public.stripePublishableKey)

const payer = async (offer) => {
  try {
    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe not loaded')
    }

    const res = await $fetch('/api/create-checkout-session', {
      method: 'POST',
      body: {
        hotelName: offer.title,
        amount: parseInt(offer.price),
        origin: window.location.origin,
      },
    })

    console.log('✅ Session créée:', res)

    const result = await stripe.redirectToCheckout({ sessionId: res.sessionId })

    if (result.error) {
      console.error('❌ Erreur Stripe:', result.error.message)
      alert(result.error.message)
    }
  } catch (error) {
    console.error('❌ Erreur de paiement :', error)
    alert("Erreur lors du paiement. Veuillez réessayer.")
  }
}

</script>

<template>
  <div
    class="relative border rounded-xl overflow-hidden shadow transition-all"
    :class="{
      'bg-gray-100 opacity-60': offer.status === 'Perdues' || (offer.status === 'Validée' && offer.is_paid)
    }"
  >
    <div class="absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-semibold text-white"
      :class="{
        'bg-orange-500': offer.status === 'En cours' && !offer.counter_offer,
        'bg-indigo-500': offer.status === 'En cours' && offer.counter_offer,
        'bg-blue-600': offer.status === 'Validée' && !offer.is_paid,
        'bg-green-600': offer.status === 'Validée' && offer.is_paid,
        'bg-gray-500': offer.status === 'Perdues'
      }"
    >
      {{
        offer.status === 'En cours'
          ? offer.counter_offer ? 'Contre-offre' : 'En attente'
          : offer.status === 'Validée' && !offer.is_paid
            ? 'À régler'
            : offer.status === 'Validée' && offer.is_paid
              ? 'Payée'
              : 'Perdue'
      }}
    </div>

    <div class="flex gap-4 p-3 pt-6">
      <img
        :src="offer.image"
        alt=""
        class="w-24 h-24 object-cover rounded-lg"
        :class="{ 'grayscale opacity-70': offer.status !== 'En cours' && offer.is_paid }"
      />
      <div class="flex-1 space-y-1">
        <h3 class="text-base font-semibold text-noir">{{ offer.title }}</h3>
        <div class="text-xs text-gray-600 flex items-center gap-2">
          <Icon name="mdi:map-marker" class="w-4 h-4" /> {{ offer.city }}
        </div>
        <div class="text-xs text-gray-600 flex items-center gap-2">
          <Icon name="mdi:calendar" class="w-4 h-4" /> {{ offer.date }}
        </div>
        <div class="text-xs text-gray-600 flex items-center gap-2">
          <Icon name="mdi:account-group" class="w-4 h-4" /> {{ offer.people }} personnes
        </div>

        <div v-if="offer.status === 'En cours'" class="text-sm mt-1 font-medium">
          <template v-if="offer.waiting_hotelier">
            <span class="text-orange-600">En attente de validation de l’hôtelier</span>
          </template>
          <template v-else-if="offer.counter_offer">
            <div class="flex justify-between items-center mt-1">
              <span class="text-sm text-gray-700">
                Proposition : <span class="font-bold text-orange-600">{{ offer.counter_price }}</span>
              </span>
              <div class="flex gap-2">
                <button @click="acceptOffer(offer.id)" class="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  <Icon name="mdi:check" class="w-4 h-4" />
                </button>
                <button @click="declineOffer(offer.id)" class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  <Icon name="mdi:close" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center px-4 py-2 bg-gray-100">
      <span class="text-sm text-gray-700 font-medium">
        Offre à <span class="text-noir">{{ offer.price }}</span>
      </span>
      <button
    v-if="offer.status === 'Validée' && !offer.is_paid"
    @click="payer(offer)"
    class="bg-orange text-white text-xs px-4 py-1 rounded-full hover:bg-orange-600 transition"
  >
        Payer maintenant
      </button>
    </div>

    <div
      class="text-white text-center text-xs py-1 font-medium"
      :class="{
        'bg-orange-500': offer.status === 'En cours',
        'bg-blue-500': offer.status === 'Validée',
        'bg-gray-500': offer.status === 'Perdues'
      }"
    >
      {{ offer.urgency }}
    </div>
  </div>
</template>
