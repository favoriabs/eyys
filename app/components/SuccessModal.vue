<template>
  <transition name="slide-up">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <!-- BACKDROP -->
      <div class="absolute inset-0 bg-black/40" @click="close"></div>

      <!-- MODAL -->
      <div
        class="relative w-full max-w-md bg-white text-gray-900 rounded-t-3xl md:rounded-3xl shadow-xl p-8 mx-4 z-10 text-center"
      >
        <!-- Icon -->
        <div class="flex justify-center">
          <div
            class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-inner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold mt-5 text-[#1d2739]">
          Registration Successful!
        </h2>

        <!-- Message -->
        <p class="text-gray-600 mt-2 leading-relaxed">
          Thank you for registering for EYYS 2025.
          <span v-if="payload?.plan">Your plan: <b>{{ payload.plan }}</b>.</span>
        </p>

        <!-- Paystack Reference -->
        <p
          v-if="payload?.reference"
          class="mt-3 text-sm text-gray-500"
        >
          Payment Ref: <span class="font-semibold">{{ payload.reference }}</span>
        </p>

        <!-- Button -->
        <button
          @click="close"
          class="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  show: { type: Boolean, default: false },
  payload: { type: Object, default: () => ({}) }
})

const emit = defineEmits(["close"])

function close() {
  emit("close")
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
