<template>
  <section
    id="contact"
    class="bg-black text-white px-6 py-20
           md:px-12 lg:px-20
           max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto"
  >

    <!-- Heading -->
    <h2
      class="text-3xl font-extrabold font-clash
             md:text-4xl lg:text-5xl"
    >
      CONTACT
    </h2>

    <!-- Card -->
    <div
      class="mt-6 bg-neutral-900 rounded-3xl p-6
             md:p-10 lg:p-12"
    >

      <!-- Lead Title -->
      <h3
        class="text-lg font-extrabold font-clash
               md:text-xl lg:text-2xl"
      >
        We’re Here To Assist You
      </h3>

      <p
        class="text-gray-300 text-sm mt-3 leading-relaxed font-inter
               md:text-base md:max-w-xl"
      >
        Have questions about the retreat?<br />
        Need help with registration?<br />
        Our team is ready to assist you.
      </p>

      <!-- Location -->
      <h4
        class="text-lg font-extrabold font-clash mt-8
               md:text-xl"
      >
        LOCATION
      </h4>

      <p
        class="text-gray-300 text-sm mt-2 leading-relaxed font-inter
               md:text-base md:max-w-lg"
      >
        THE POTTER'S HOUSE, OPPOSITE  
        ANTHONY UDOFIA ELEMENTARY  
        SCHOOL, ALONG TECHNICAL  
        COLLEGE, OSHOGBO, OSUN STATE.
      </p>

      <!-- Contact -->
      <h4
        class="text-lg font-extrabold font-clash mt-8
               md:text-xl"
      >
        CONTACT US
      </h4>

      <p
        class="text-gray-300 text-sm mt-2 font-inter leading-relaxed
               md:text-base"
      >
        09053054750 <br />
        09064898160
      </p>

      <!-- Email -->
      <h4
        class="text-lg font-extrabold font-clash mt-8
               md:text-xl"
      >
        EMAIL
      </h4>

      <p
        class="text-gray-300 text-sm mt-2 font-inter
               md:text-base"
      >
        crmglobalhq@gmail.com
      </p>

      <!-- Social -->
      <h4
        class="text-lg font-extrabold font-clash mt-8
               md:text-xl"
      >
        FOLLOW US
      </h4>

      <div
        class="flex items-center gap-5 mt-3
               md:gap-6"
      >
        <a href="#" aria-label="Facebook">
          <Facebook class="w-6 h-6 md:w-7 md:h-7 text-white" />
        </a>

        <a href="#" aria-label="Instagram">
          <Instagram class="w-6 h-6 md:w-7 md:h-7 text-white" />
        </a>

        <a href="#" aria-label="YouTube">
          <Youtube class="w-6 h-6 md:w-7 md:h-7 text-white" />
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { Facebook, Instagram, Youtube } from "lucide-vue-next"
</script>
