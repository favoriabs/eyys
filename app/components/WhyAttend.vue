<template>
  <section id="why" class="bg-black text-white px-6 md:px-20 py-20">
    <div class="flex flex-col md:flex-row justify-between items-start">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 md:mb-0">WHY ATTEND?</h2>
      <p class="text-gray-300 md:max-w-xs">
        Discover why End Your Year Strong is a must-attend retreat for all.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <div v-for="(reason, index) in reasons" :key="index"
        class="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
        <div>
          <h3 class="text-sm font-bold mb-4">REASON {{ index + 1 }}</h3>
          <p class="text-gray-200">{{ reason.text }}</p>
        </div>
        <span class="absolute bottom-4 right-4 text-[8rem] font-bold text-transparent bg-clip-text bg-linear-to-b from-blue-400 to-blue-800 opacity-10 select-none">
          {{ index + 1 }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const reasons = [
  { text: 'To Realign Your Heart, Vision, and Purpose Divinely Before the New Year' },
  { text: 'To Encounter God Deeply Through Worship, Word, and Intense Prayer' },
  { text: 'To Receive Kingdom Blueprints to Influence and Transform Your World' },
  { text: 'To End the Year Strong and Step Boldly Into a Victorious 2026' },
]
</script>
