<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4"
    >
      <div
        class="bg-neutral-900 text-white w-full max-w-md rounded-2xl p-6 relative"
      >
        <!-- Close Button -->
        <button class="absolute top-3 right-3" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Title -->
        <h2 class="text-xl font-bold font-clash">Register for {{ plan?.title }}</h2>

        <p class="text-gray-300 text-sm mt-1">
          You're registering for:
          <strong class="text-yellow-400">{{ plan?.title }}</strong>
        </p>

        <!-- Form -->
        <form @submit.prevent="submit" class="mt-6 space-y-4">

          <!-- Name -->
          <div>
            <label class="text-sm text-gray-300">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg p-3 outline-none"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="text-sm text-gray-300">Phone Number</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg p-3 outline-none"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="text-sm text-gray-300">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg p-3 outline-none"
            />
          </div>

          <!-- Plan (readonly) -->
          <div>
            <label class="text-sm text-gray-300">Plan</label>
            <input
              :value="plan?.title"
              readonly
              class="w-full mt-1 bg-neutral-700 text-gray-300 rounded-lg p-3"
            />
          </div>

          <!-- Submit -->
          <!-- <button
            type="submit"
            class="w-full bg-blue-700 hover:bg-blue-800 transition rounded-lg py-3 mt-2 font-semibold"
          >
            Continue to Payment →
          </button> -->
          <RegisterButton
            :loading="loading"
            :disabled="loading"
            @register="submit"
          >
            Continue to Payment
          </RegisterButton>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  plan: Object
})
const emit = defineEmits(["close"])

const loading = ref(false)

const form = reactive({
  name: "",
  phone: "",
  email: ""
})

// CHANGE THESE TO YOUR REAL ENTRY IDs
const entryName   = "entry.1867354617"
const entryPhone  = "entry.1266331690"
const entryEmail  = "entry.767569417"
const entryPlan   = "entry.872512691"

// GOOGLE FORM ACTION URL
const googleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJ9-PdRigfqJSded9df67AOPccRMhNi91_xRDF3OSAeln8lg/formResponse"

const submit = async () => {
  loading.value = true

  const formData = new FormData()

  formData.append(entryName,  form.name)
  formData.append(entryPhone, form.phone)
  formData.append(entryEmail, form.email)
  formData.append(entryPlan,  props.plan.title)

  await fetch(googleFormUrl, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  })

  // Paystack redirect
  const amount = props.plan.price * 100 // in kobo
  const email  = form.email

  // EXAMPLE: Replace with your Paystack link
  const paystackRef = "eyys2025"

  window.location.href = `https://paystack.com/pay/${paystackRef}?amount=${amount}&email=${email}`
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
