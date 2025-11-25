<template>
  <div :class="`${backgroundColor} rounded-2xl p-6 text-center`">
    <!-- <p class="uppercase text-gray-400 text-xs tracking-wide mb-3">
      Countdown
    </p> -->

    <!-- Numbers -->
    <div :class="`text-4xl font-bold leading-none tracking-wide ${numberColor}`">
      {{ formattedWeeks }}:
      {{ formattedDays }}:
      {{ formattedHours }}:
      {{ formattedMinutes }}:
      {{ formattedSeconds }}
    </div>

    <!-- Labels -->
    <div class="grid grid-cols-5 text-[10px] text-gray-400 mt-2">
      <span class="text-center">WEEKS</span>
      <span class="text-center">DAYS</span>
      <span class="text-center">HOURS</span>
      <span class="text-center">MINS</span>
      <span class="text-center">SECS</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

defineProps({
  // No props needed for now
  backgroundColor: {
    type: String,
    default: 'bg-neutral-900',
  },
  numberColor: {
    type: String,
    default: 'text-white',
  },
})
// Target Date → 26 Dec 2025, 5:00 PM
const targetDate = new Date('2025-12-26T17:00:00')

// Reactive countdown values
const weeks = ref(0)
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let intervalId = null

const updateCountdown = () => {
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    weeks.value = 0
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    clearInterval(intervalId)
    return
  }

  const totalSeconds = Math.floor(diff / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  weeks.value = Math.floor(totalDays / 7)
  days.value = totalDays % 7
  hours.value = totalHours % 24
  minutes.value = totalMinutes % 60
  seconds.value = totalSeconds % 60
}

// 2-digit formatting
const pad = (num) => String(num).padStart(2, '0')

const formattedWeeks = computed(() => pad(weeks.value))
const formattedDays = computed(() => pad(days.value))
const formattedHours = computed(() => pad(hours.value))
const formattedMinutes = computed(() => pad(minutes.value))
const formattedSeconds = computed(() => pad(seconds.value))

onMounted(() => {
  updateCountdown()
  intervalId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => clearInterval(intervalId))
</script>
