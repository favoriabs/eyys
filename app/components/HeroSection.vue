<template>
  <section
    ref="heroRef"
    id="home"
    class="bg-black text-white 
           min-h-[calc(100vh-80px)]
           px-6 pt-28 pb-32 relative
           md:px-12 lg:px-20
           flex flex-col items-center text-center
           max-w-6xl mx-auto"
  >

    <!-- Dates -->
    <p class="text-yellow-400 text-sm mt-8 md:text-base">
      26th - 30th December, 2025
    </p>

    <!-- Title -->
    <h1
      class="font-extrabold font-clash
             text-3xl leading-tight mt-6 tracking-tight
             md:text-5xl md:leading-tight
             lg:text-6xl lg:leading-[1.15]"
    >
      OCCUPY:
      <br class="md:hidden" /> INFILTRATING
      <br class="md:hidden" /> COSMOS WITH
      <br class="md:hidden" /> GOD’S KINGDOM
    </h1>

    <!-- Description -->
    <p
      class="text-gray-300 mt-5 leading-relaxed text-sm font-inter
             md:text-base md:max-w-xl
             lg:max-w-2xl"
    >
      A PROPHETIC RETREAT FOR RECALIBRATION, REVIVAL, ALIGNMENT,
      TRANSFORMATION, AND EMPOWERMENT.
    </p>

    <!-- Countdown -->
    <Countdown class="mt-10 w-full md:w-auto" />

    <!-- Register Button -->
    <div class="mt-10 flex justify-center">
      <button
        @click="scrollToRegister"
        class="bg-linear-to-r from-blue-600 to-blue-800 text-white 
               px-8 py-4 rounded-full font-semibold text-lg shadow-md
               active:scale-95 transition
               md:px-10 md:py-5 md:text-xl"
      >
        Book Now →
      </button>
    </div>

    <!-- WhatsApp Floating Button -->
    <a
      v-if="showWhatsapp"
      :href="`https://wa.me/${whatsappNumber}`"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-20 right-5 bg-green-500 w-14 h-14 rounded-full
            flex justify-center items-center shadow-lg active:scale-95 transition
            md:w-16 md:h-16 md:right-10"
    >
      <img src="../assets/whatsapp.png" alt="WhatsApp" class="w-8 h-8 md:w-9 md:h-9" />
    </a>

    <!-- Scroll Down Indicator -->
    <div
      @click="scrollToNext"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 
             text-sm cursor-pointer md:text-base"
    >
      Scroll Down
      <br />
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-4 h-4 mx-auto mt-1 md:w-5 md:h-5"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
      </svg>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import Countdown from '~/components/Countdown.vue'
import { useScrollVisibility } from '~/composables/useScrollVisibility'

const whatsappNumber = "2348141625841"

// Next section after hero
const nextSection = '#about'
const registerSection = '#accommodation'

const heroRef = ref(null)
const { isVisible: showWhatsapp } = useScrollVisibility(150)

/* Scroll to next section */
const scrollToNext = () => {
  const el = document.querySelector(nextSection)
  if (!el) return

  window.scrollTo({
    top: el.offsetTop - 20,
    behavior: "smooth"
  })
}

/* Scroll to register section */
const scrollToRegister = () => {
  const el = document.querySelector(registerSection)
  if (!el) return

  window.scrollTo({
    top: el.offsetTop - 20,
    behavior: "smooth"
  })
}
</script>

<style scoped>
html, body {
  overflow-y: auto !important;
}
</style>
