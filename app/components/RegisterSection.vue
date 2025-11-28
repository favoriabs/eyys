<template>
  <section
    id="accommodation"
    class="bg-black text-white px-6 py-16 md:px-12 lg:px-20 max-w-6xl mx-auto"
  >
    <!-- Heading -->
    <h2 class="text-3xl font-extrabold font-clash md:text-4xl lg:text-5xl">
      REGISTER NOW
    </h2>

    <!-- Countdown -->
    <div class="mt-6 flex justify-center">
      <Countdown class="w-full md:w-auto" :backgroundColor="'bg-white'" :numberColor="'text-black'" />
    </div>

    <!-- Subtitle -->
    <h3 class="text-lg font-semibold mt-10 mb-4 font-syne md:text-xl lg:text-2xl">
      Registration Categories
    </h3>

    <!-- Pricing Cards -->
    <div class="flex flex-col gap-6 mt-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      <div
        v-for="(plan, index) in plans"
        :key="index"
        class="relative bg-neutral-900 border border-white/20 rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col"
      >
        <h4 class="uppercase text-l md:text-base font-bold font-clash leading-tight">
          {{ plan.title }}
        </h4>

        <p class="text-gray-300 text-sm md:text-base mt-2 mb-5 font-inter">
          {{ plan.desc }}
        </p>

        <p class="text-4xl md:text-5xl font-extrabold font-clash mb-5" v-if="typeof plan.price === 'number' && plan.price > 0">
          ₦{{ plan.price.toLocaleString() }}
        </p>
        <p class="text-4xl md:text-5xl font-extrabold font-clash mb-5" v-else>
          FREE
        </p>

        <!-- Register button opens modal and passes plan -->
        <button
          @click="onPlanClick(plan)"
          class="mt-auto w-full inline-flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-linear-to-r from-blue-600 to-blue-800 text-white font-semibold hover:scale-[.995] active:scale-95 transition"
        >
          <span v-if="typeof plan.price === 'number' && plan.price > 0">Proceed to Book</span>
          <span v-else>Proceed to Register</span>
        </button>

        <!-- Vector -->
        <NuxtImg
          v-if="index === plans.length - 1"
          src="/images/vectors/Vector (3).png"
          class="absolute bottom-0 right-0 w-32 md:w-36 opacity-20 pointer-events-none"
        />
      </div>
    </div>

    <!-- Accommodation modal -->
    <AccommodationModal
      :show="showModal"
      :plan="selectedPlan"
      @close="showModal = false"
      @success="onCompleted"
      @manual="openManualPayment"
    />

    <!-- Manual payment modal -->
    <ManualPaymentModal
      :show="showManual"
      :plan="selectedPlan"
      :form="savedForm"
      @close="showManual = false"
      @success="onCompleted"
    />

    <SuccessModal 
      :show="showSuccess" 
      :payload="successPayload"
      :plan="selectedPlan" 
      @close="showSuccess = false" 
    />

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccommodationModal from '~/components/AccommodationModal.vue'
import ManualPaymentModal from '~/components/ManualPaymentModal.vue'
import Countdown from '~/components/Countdown.vue'
import SuccessModal from '~/components/SuccessModal.vue'
// @ts-ignore
import confetti from "canvas-confetti"


const plans = [
  { title: 'Registration Only without accommodation', desc: 'No accommodation. Registration for the retreat alone.', price: 0 },
  { title: 'Registration & Accommodation', desc: 'Affordable accommodation option.', price: 7000 },
  { title: 'Registration & Shared Standard Room', desc: 'Affordable 3-person shared accommodation.', price: 20000 },
  { title: 'Registration & Shared Comfort Room', desc: 'Upgraded 3-person shared stay with added comfort.', price: 25000 },
  { title: 'Registration & Shared Apartment (Short-Let)', desc: '4-person serviced apartment with sitting room, dining, and kitchen.', price: 30000 },
  { title: 'Registration & Double Deluxe Room', desc: '2-person semi-private room. Designed for comfort and quiet.', price: 35000 },
  { title: 'Registration & Executive Solo Suite', desc: 'Private single-occupancy room. Premium, peaceful, and exclusive.', price: 70000 }
]

const showModal = ref(false)
const showManual = ref(false)
const selectedPlan = ref<any>(null)
const savedForm = ref<any>(null)
const showSuccess = ref(false)
const successPayload = ref<Record<string, any> | undefined>(undefined)

function onPlanClick(plan: any) {
  selectedPlan.value = plan
  showModal.value = true
}

// Called when accommodation flow completes (either paystack success or manual success)
function onCompleted(payload: any) {
  // payload can contain e.g. { reference } or for manual flow no reference
  showModal.value = false
  showManual.value = false
  selectedPlan.value = null
  savedForm.value = null

  successPayload.value = payload
  showSuccess.value = true

  fireConfetti()

  // Optionally show toast, redirect, etc.
  console.log('Registration completed:', payload)
}

// If AccommodationModal emits "manual" (PAYSTACK disabled), open manual modal and pass form data
function openManualPayment(data: any) {
  // data is the form payload collected in AccommodationModal
  console.log('Opening manual payment with data:', data)
  savedForm.value = data
  showManual.value = true
  showModal.value = false

}

function fireConfetti() {
  const duration = 2500
  const end = Date.now() + duration

  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0 }
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1 }
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

</script>

<style scoped>
/* small tweaks */
</style>
