<template>
  <section class="bg-black text-white flex flex-col md:flex-row justify-between items-center px-8 py-16">
    <!-- Left text content -->
    <div class="max-w-xl">
      <p class="text-gray-400 mb-2">26th - 30th December, 2025</p>
      <p class="italic text-yellow-400 text-xl">Theme</p>
      <h2 class="text-4xl md:text-5xl font-extrabold leading-tight mt-2">
        OCCUPY: <br />
        INFILTRATING COSMOS <br />
        WITH GOD’S KINGDOM
      </h2>
      <p class="mt-6 text-gray-300">
        A Prophetic Retreat for Alignment, Transformation, and Empowerment. Join believers from across
        the world for 5 days of intense prayer, worship, teaching, and personal revival.
      </p>
      <RegisterButton />
    </div>

    <!-- Right images -->
    <div class="relative mt-10 md:mt-0 flex items-center gap-4">
        <div class="flex flex-col gap-4">
            <NuxtImg src="/images/person2.png" alt="Speaker" class="w-40 h-40" />
            <NuxtImg src="/images/person1.png" alt="Joyful worshipper" class="w-40 h-40 " />
        </div>
        <div>
            <NuxtImg src="/images/person3.png" alt="Crowd" class="w-56 h-84 border-r-4 border-blue-500" />
        </div>
    </div>
  </section>
</template>

<script setup>
import RegisterButton from './RegisterButton.vue'
</script>
