<template>
  <section class="bg-white px-4 py-20">
    <div class="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
      <!-- Visuel de l'appli -->
      <div class="flex-1 relative w-full">
        <img
          src="https://picsum.photos/id/1036/1200/800"
          alt="Interface Match Room"
          class="w-full max-w-md mx-auto rounded-2xl shadow-lg border border-[#D6DEE1]"
        />

        <!-- Badge gamifié -->
        <div class="absolute top-0 right-6 bg-[#457891] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          Niveau 2 · Voyageur futé 🧠
        </div>
      </div>

      <!-- Texte + Slider interactif -->
      <div class="flex-1 space-y-6">
        <h2 class="text-2xl font-bold text-[#457891]">L'expérience gamifiée</h2>
        <p class="text-gray-700 text-sm">
          Parce que réserver un hôtel ne doit pas être ennuyeux. Sur Match Room, vous négociez en glissant un curseur. Si l’hôtel accepte, vous gagnez des points, des badges, et des offres exclusives.
        </p>

        <!-- Slider fictif -->
        <div class="w-full max-w-sm h-12 bg-blanc rounded-full relative overflow-hidden px-1">
          <div
            class="absolute top-1/2 left-[40%] -translate-y-1/2 bg-[#457891] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow"
          >
            120€
          </div>
          <div class="absolute inset-y-0 left-0 bg-[#D6DEE1]" style="width: 80%"></div>
        </div>

        <p class="text-sm italic text-[#EE890C] font-medium mt-2">
          “Négocier n’a jamais été aussi simple (et stylé).”
        </p>
      </div>
    </div>
  </section>
</template>
