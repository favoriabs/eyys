<template>
  <nav 
    class="sticky top-0 z-50 flex justify-between items-center py-6 px-8 bg-black text-white shadow-lg backdrop-blur-sm transition-all duration-300"
    :class="{ 'navbar-glow': isScrolled }"
  >
    <h1 class="text-lg font-bold">
      END YOUR <br /> YEAR STRONG
    </h1>
    <ul class="flex gap-8">
      <li><a href="#home" class="hover:text-yellow-400 transition-colors duration-200">Home</a></li>
      <li><a href="#about" class="hover:text-yellow-400 transition-colors duration-200">About</a></li>
      <li><a href="#why" class="hover:text-yellow-400 transition-colors duration-200">Why Attend</a></li>
      <li><a href="#contact" class="hover:text-yellow-400 transition-colors duration-200">Contact</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
