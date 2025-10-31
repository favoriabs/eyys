<template>
  <section id="why" class="bg-black text-white px-6 md:px-20 py-20">
    <div class="flex flex-col md:flex-row justify-between items-start">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 md:mb-0 font-clash">WHY ATTEND?</h2>
      <p class="text-gray-300 md:max-w-xs font-syne">
        Discover why End Your Year Strong is a must-attend retreat for all.
      </p>
    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <div v-for="(reason, index) in reasonsTop" :key="index"
        class="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
        <div class="z-10 relative float-left">
          <h3 class="text-sm font-bold mb-4 text-white">REASON {{ index + 1 }}</h3>
        </div>

        <div class="w-1/2 absolute top-25 left-8">
          <p class="text-gray-200 text-lg leading-relaxed font-syne">{{ reason.text }}</p>
        </div>
        
        <div class="absolute bottom-0 right-0">
          <NuxtImg 
            :src="`/images/0${index + 1}.png`" 
            :alt="`Number ${index + 1}`"
            class="w-52 h-48 object-contain opacity-80"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <div v-for="(reason, index) in reasonsBottom" :key="index"
        class="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
        <div class="z-10 relative float-left">
          <h3 class="text-sm font-bold mb-4 text-white">REASON {{ index + 3 }}</h3>
        </div>

        <div class="w-1/2 absolute top-25 right-4">
          <p class="text-gray-200 text-lg leading-relaxed font-syne">{{ reason.text }}</p>
        </div>
        
        <div class="absolute bottom-0 left-0">
          <NuxtImg 
            :src="`/images/0${index + 3}.png`" 
            :alt="`Number ${index + 3}`"
            class="w-52 h-48 object-contain opacity-80"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reasonsTop = [
  { text: 'To Realign Your Heart, Vision, and Purpose Divinely Before the New Year' },
  { text: 'To Encounter God Deeply Through Worship, Word, and Intense Prayer' },
]
const reasonsBottom = [
  { text: 'To Receive Kingdom Blueprints to Influence and Transform Your World' },
  { text: 'To End the Year Strong and Step Boldly Into a Victorious 2026' },
]
</script>
