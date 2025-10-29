<template>
  <section id="register" class="bg-black text-white px-6 md:px-20 py-20">
    <div class="flex flex-col md:flex-row justify-between items-start">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 md:mb-0">REGISTER NOW</h2>
      <p class="text-gray-300 md:max-w-xs">
        Secure your spot at this year’s EYYS retreat, and join believers to seek God’s face.
      </p>
    </div>

    <h3 class="text-2xl font-semibold mt-12 mb-8">Registration Options</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <div v-for="(plan, index) in plans" :key="index"
        class="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between">
        <div>
          <h4 class="uppercase text-sm font-bold mb-4">{{ plan.title }}</h4>
          <p class="text-gray-300 text-sm mb-6">{{ plan.desc }}</p>
          <p class="text-3xl font-extrabold mb-6">₦{{ plan.price.toLocaleString() }}</p>
        </div>
        <a href="#" class="inline-block text-center bg-linear-to-r from-blue-700 to-blue-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300">
          Register now →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const plans = [
  { title: 'Early Bird Pass', desc: 'Registration Only with no accommodation.', price: 20000 },
  { title: 'Standard Pass', desc: 'Registration and accommodation for 4 people in a room.', price: 20000 },
  { title: 'Standard Pass', desc: 'Registration and accommodation for 3 people in a room.', price: 30000 },
  { title: 'Standard Pass', desc: 'Registration and accommodation for 2 people in a room.', price: 40000 },
  { title: 'Standard Pass', desc: 'Registration and accommodation for 1 person in a room.', price: 50000 },
]
</script>
