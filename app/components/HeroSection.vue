<template>
  <section id="home" class="bg-black text-white flex flex-col md:flex-row justify-between items-center px-16 py-16">
    <!-- Left text content -->
    <div class="max-w-xl">
      <p class="text-gray-400 mb-2">26th - 30th December, 2025</p>
      <p class="italic text-yellow-400 text-xl font-aguafina">Theme</p>
      <h2 class="text-4xl md:text-5xl font-extrabold leading-tight mt-2 font-clash">
        OCCUPY: <br />
        INFILTRATING COSMOS <br />
        WITH GOD’S KINGDOM
      </h2>
      <p class="mt-6 text-gray-300 font-inter">
        A Prophetic Retreat for Alignment, Transformation, and Empowerment. Join believers from across
        the world for 5 days of intense prayer, worship, teaching, and personal revival.
      </p>
      
      <!-- Register Button with Vector -->
      <div class="relative mt-6">
        <RegisterButton />
        <NuxtImg 
          src="/images/vectors/Vector 1.png" 
          alt="" 
          class="absolute -bottom-8 -left-9 w-10 h-10" 
        />
      </div>
    </div>

    <!-- Right images -->
    <div class="relative mt-10 md:mt-0 flex items-center gap-4">
        <div class="flex flex-col gap-4 relative">
            <!-- Stars around first image -->
            <div class="relative">
              <NuxtImg src="/images/vectors/Star 1.png" alt="" class="absolute -top-3 -left-3 w-6 h-6 animate-pulse" />
              <NuxtImg src="/images/vectors/Vector.png" alt="" class="absolute -top-2 -right-2 w-4 h-4 animate-bounce" />
              <NuxtImg src="/images/person2.png" alt="Joyful worshipper" class="w-40 h-40 rounded-full" />
              <NuxtImg src="/images/vectors/Vector (1).png" alt="" class="absolute -bottom-2 -right-1 w-5 h-5 animate-pulse" />
            </div>
            
            <!-- Stars around second image -->
            <div class="relative">
              <NuxtImg src="/images/vectors/Vector (2).png" alt="" class="absolute -top-2 -left-2 w-5 h-5 animate-bounce" />
              <NuxtImg src="/images/person1.png" alt="Crowd" class="w-40 h-40 rounded-lg" />
              <NuxtImg src="/images/vectors/Star 1.png" alt="" class="absolute -bottom-2 -left-2 w-6 h-6 animate-pulse" />
              <NuxtImg src="/images/vectors/Vector (4).png" alt="" class="absolute top-1/2 -right-3 w-4 h-4 animate-bounce" />
            </div>
        </div>
        
        <div class="relative">
            <!-- Blue shadow background - positioned to be visible on the left -->
            <div class="absolute -left-2 top-2 w-48 h-84 bg-blue-500 rounded-2xl opacity-80"></div>
            
            <!-- Stars around main image -->
            <NuxtImg src="/images/vectors/Star 1.png" alt="" class="absolute -top-4 -left-4 w-8 h-8 animate-pulse z-20" />
            <NuxtImg src="/images/vectors/Vector (1).png" alt="" class="absolute top-5 -right-3 w-5 h-5 animate-bounce z-20" />

            <NuxtImg src="/images/person3.png" alt="Speaker" class="relative w-56 h-84 rounded-2xl object-cover z-10" />

            <NuxtImg src="/images/vectors/Vector (2).png" alt="" class="absolute -bottom-3 -right-2 w-6 h-6 animate-pulse z-10" />
            <NuxtImg src="/images/vectors/Vector.png" alt="" class="absolute bottom-8 -left-4 w-4 h-4 animate-bounce z-10" />
        </div>
    </div>
  </section>
</template>

<script setup>
import RegisterButton from './RegisterButton.vue'
</script>
