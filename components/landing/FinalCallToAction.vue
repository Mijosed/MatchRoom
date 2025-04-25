<template>
  <section class="bg-[#457891] px-4 py-20 text-white">
    <div class="max-w-2xl mx-auto text-center space-y-6">
      <h2 class="text-3xl font-bold leading-snug">
        Prêt à <span class="text-orange">matcher</span> votre prochaine chambre ?
      </h2>
      <p class="text-white text-sm opacity-90">
        Inscrivez-vous pour accéder à l'expérience Match Room en avant-première.
      </p>

      <!-- Email + bouton -->
      <div class="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6">
        <input
          type="email"
          placeholder="Votre e-mail"
          class="w-full sm:w-auto flex-1 px-4 py-3 rounded-full text-[#333] placeholder-gray-400"
        />
        <button
          class="bg-orange text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
        >
          Recevoir un accès bêta
        </button>
      </div>

      <p class="text-xs text-white/70 mt-4">
        Nous ne partageons jamais vos données. 🔒
      </p>
    </div>
  </section>
</template>

<style scoped>
.text-orange {
  color: #EE890C;
}
.bg-orange {
  background-color: #EE890C;
}
</style>
