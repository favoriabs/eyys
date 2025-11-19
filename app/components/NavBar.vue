<template>
  <header
    class="w-full bg-black text-white fixed top-0 left-0 z-50
           px-6 py-4 md:px-12 lg:px-20 flex justify-between items-center">

    <!-- Logo -->
    <a @click="navigateToSection('#home')" class="cursor-pointer">
      <img
        src="../assets/logo.png"
        alt="EYYS Logo"
        class="h-9 md:h-12 object-contain"
      />
    </a>

    <!-- Desktop Menu -->
    <nav class="hidden md:flex items-center gap-10 lg:gap-14 text-sm font-medium">
      <a
        v-for="item in navItems" 
        :key="item.href"
        @click="navigateToSection(item.href)"
        class="hover:text-yellow-400 transition duration-300 cursor-pointer">
        {{ item.label }}
      </a>
    </nav>

    <!-- Mobile Hamburger -->
    <button @click="toggleMenu" class="md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
      </svg>
    </button>
  </header>

  <!-- Mobile Menu Overlay -->
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/95 text-white px-6 py-20
             flex flex-col gap-10 text-xl font-semibold z-40 md:hidden">

      <!-- Close Button -->
      <button
        @click="toggleMenu"
        class="absolute top-6 right-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Mobile Nav Links -->
      <a
        v-for="item in navItems"
        :key="item.href"
        @click="navigateToSection(item.href)"
        class="cursor-pointer hover:text-yellow-400 transition duration-300">
        {{ item.label }}
      </a>

    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About EYYS", href: "#about" },
  { label: "Convener's Desk", href: "#convener" },
  { label: "Accommodation Options", href: "#accommodation" },
  { label: "Contact", href: "#contact" },
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const navigateToSection = (id) => {
  const section = document.querySelector(id)
  if (section) section.scrollIntoView({ behavior: "smooth" })
  isOpen.value = false
}
</script>

<style scoped>
/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
