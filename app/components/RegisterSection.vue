<template>
  <section id="register" class="bg-black text-white px-6 md:px-20 py-20">
    <div class="flex flex-col md:flex-row justify-between items-start">
      <h2 class="text-5xl md:text-7xl font-extrabold mb-6 md:mb-0 font-clash">REGISTER NOW</h2>
      <p class="text-gray-300 md:max-w-xs font-syne">
        Secure your spot at this year’s EYYS retreat, and join believers to seek God’s face.
      </p>
    </div>

    <h3 class="text-2xl font-semibold mt-12 mb-8 font-syne">Registration Options</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 auto-rows-fr">
      <div v-for="(plan, index) in plans" :key="index"
        class="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-white min-h-[320px]">
        <div class="z-10">
          <h4 class="uppercase text-sm font-bold mb-4 font-clash">{{ plan.title }}</h4>
          <p class="text-gray-300 text-sm mb-6 font-inter">{{ plan.desc }}</p>
          <p class="text-4xl md:text-5xl font-extrabold mb-6 font-clash">₦{{ plan.price.toLocaleString() }}</p>
        </div>

        <register-button />
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
