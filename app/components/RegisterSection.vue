<template>
  <section
    id="accommodation"
    class="bg-black text-white px-6 py-20
           md:px-12 lg:px-20
           max-w-6xl mx-auto"
  >

    <!-- Heading -->
    <h2
      class="text-3xl font-extrabold font-clash
             md:text-4xl lg:text-5xl"
    >
      REGISTER NOW
    </h2>

    <!-- Countdown -->
    <div class="mt-6 flex justify-center">
      <Countdown class="w-full md:w-auto" :backgroundColor="'bg-white'" :numberColor="'text-black'" />
    </div>

    <!-- Subtitle -->
    <h3
      class="text-lg font-semibold mt-10 mb-4 font-syne
             md:text-xl lg:text-2xl"
    >
      Registration Categories
    </h3>

    <!-- Pricing Cards -->
    <div
      class="flex flex-col gap-6 mt-4
             md:grid md:grid-cols-2 md:gap-6
             lg:grid-cols-3"
    >
      <div
        v-for="(plan, index) in plans"
        :key="index"
        class="relative bg-neutral-900 border border-white/20 rounded-2xl
               p-4 md:p-6 lg:p-8 flex flex-col"
      >
        <!-- Title -->
        <h4 class="uppercase text-sm md:text-base font-bold font-clash leading-tight">
          {{ plan.title }}
        </h4>

        <!-- Description -->
        <p class="text-gray-300 text-sm md:text-base mt-2 mb-5 font-inter">
          {{ plan.desc }}
        </p>

        <!-- Price -->
        <p class="text-4xl md:text-5xl font-extrabold font-clash mb-5">
          ₦{{ plan.price.toLocaleString() }}
        </p>

        <!-- Button -->
        <RegisterButton :plan="plan" @register="openRegisterModal" />

        <!-- Vector -->
        <NuxtImg
          v-if="index === plans.length - 1"
          src="/images/vectors/Vector (3).png"
          class="absolute bottom-0 right-0 w-32 md:w-36 opacity-20"
        />
      </div>
    </div>
  </section>

  <!-- ACCOMMODATION MODAL -->
  <AccommodationModal
    :show="showModal"
    :plan="selectedPlan"
    @close="showModal = false"
    @success="onSubmitted"
  />
</template>

<script setup>
import RegisterButton from '~/components/RegisterButton.vue'
import AccommodationModal from '~/components/AccommodationModal.vue'
import Countdown from '~/components/Countdown.vue'

const plans = [
  { title: 'Shared Standard Room', desc: 'Affordable 3-person shared accommodation.', price: 20000 },
  { title: 'Shared Comfort Room', desc: 'Upgraded 3-person shared stay with added comfort.', price: 25000 },
  { title: 'Shared Apartment (Short-Let)', desc: '4-person serviced apartment with sitting room, dining, and kitchen.', price: 30000 },
  { title: 'Double Deluxe Room', desc: '2-person semi-private room. Designed for comfort and quiet.', price: 35000 },
  { title: 'Executive Solo Suite', desc: 'Private single-occupancy room. Premium, peaceful, and exclusive.', price: 75000 }
]

const showModal = ref(false)
const selectedPlan = ref(null)

const openRegisterModal = (plan) => {
  selectedPlan.value = plan
  showModal.value = true
}

const onSubmitted = (data) => {
  console.log("Saved + Paid:", data)
}
</script>
