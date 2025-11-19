<template>
  <button
    :disabled="disabled || loading"
    @click="handleClick"
    class="relative flex items-center justify-center gap-2 rounded-lg font-semibold
           transition-all duration-200 w-full
           active:scale-95
           disabled:opacity-50 disabled:cursor-not-allowed
           focus:outline-none
           select-none
           px-6 py-3
           bg-blue-700 hover:bg-blue-800 text-white"
  >

    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10"
              stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>

    <!-- Leading Icon (if provided) -->
    <component
      :is="icon"
      v-if="icon && !loading"
      class="w-5 h-5"
    />

    <!-- Button Text -->
    <span :class="{ 'opacity-0': loading }">
      <slot>Proceed to book</slot>
    </span>

    <!-- Trailing Arrow (if no custom icon & not loading) -->
    <ArrowRight v-if="showArrow && !icon && !loading" class="w-5 h-5" />
  </button>
</template>

<script setup>
import { ArrowRight } from "lucide-vue-next"

const props = defineProps({
  plan: Object,
  icon: [String, Object, Function], // Optional custom icon component
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  showArrow: { type: Boolean, default: true } // Hide if using custom icon
})

const emit = defineEmits(["register"])

const handleClick = () => {
  if (props.disabled || props.loading) return
  emit("register", props.plan)
}
</script>
