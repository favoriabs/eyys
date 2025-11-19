<template>
  <!-- Fully redesigned white iOS-style modal -->
  <transition name="slide-up">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30" @click="close"></div>

      <!-- Modal Container -->
      <div
        class="relative w-full max-w-xl bg-white text-gray-900 rounded-t-3xl md:rounded-3xl shadow-xl
               p-5 md:p-8 mx-4 md:mx-0 overflow-y-auto max-h-[90vh] z-10"
        role="dialog"
        aria-modal="true"
      >
        <!-- HEADER -->
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-xl font-semibold">Accommodation Booking</h3>
            <p class="text-sm text-gray-500 mt-1">Room of choice</p>

            <!-- Room Card -->
            <div class="mt-3">
              <div class="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 7v10a2 2 0 0 0 2 2h14" />
                </svg>

                <div class="text-sm">
                  <div class="font-semibold">{{ plan?.title }}</div>
                  <div class="text-xs text-gray-500 font-medium">
                    ₦{{ plan?.price?.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Close button -->
          <button @click="close" class="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- FORM -->
        <form @submit.prevent="onSubmit" class="mt-6 space-y-5">
          <!-- Full name -->
          <div>
            <label class="text-sm font-medium text-gray-700">Full name *</label>
            <input
              v-model="form.fullName"
              required
              class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50
                     focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- Gender + Age -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="text-sm font-medium text-gray-700">Gender *</label>
              <select
                v-model="form.gender"
                required
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Age Range *</label>
              <select
                v-model="form.ageRange"
                required
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Below 18</option>
                <option>18 - 25</option>
                <option>26 - 35</option>
                <option>36 - Above</option>
              </select>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="text-sm font-medium text-gray-700">Phone number *</label>
            <input
              v-model="form.phone"
              required
              type="tel"
              placeholder="2348012345678"
              class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-xs text-gray-500 mt-1">Include country code (e.g. 234)</p>
          </div>

          <!-- Health conditions -->
          <div>
            <label class="text-sm font-medium text-gray-700">Any health conditions?</label>
            <input
              v-model="form.healthConditions"
              class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Committee -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="text-sm font-medium text-gray-700">EYYS Committee *</label>
              <select
                v-model="form.isCommittee"
                required
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Which unit?</label>
              <input
                v-model="form.committeeUnit"
                placeholder="Media, Music, etc."
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Volunteer -->
          <div>
            <label class="text-sm font-medium text-gray-700">Volunteer? *</label>
            <select
              v-model="form.volunteer"
              required
              class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <!-- Service Unit -->
          <div>
            <label class="text-sm font-medium text-gray-700">Service Unit</label>
            <select
              v-model="form.serviceUnit"
              class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option>Music</option>
              <option>Media</option>
              <option>Protocol & Ushering</option>
              <option>Prayer</option>
              <option>Medical & Health</option>
              <option>Sanitation & Excellence</option>
              <option>Technical & Sound Media</option>
            </select>
          </div>

          <!-- Arrival + Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="text-sm font-medium text-gray-700">Arrival Day</label>
              <select
                v-model="form.arrivalDay"
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Day 1</option>
                <option>Day 2</option>
                <option>Day 3</option>
                <option>Day 4</option>
                <option>Day 5</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Location</label>
              <select
                v-model="form.location"
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Lagos</option>
                <option>Lautech</option>
                <option>Potters House</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          <!-- T-Shirt -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="text-sm font-medium text-gray-700">T-shirt size *</label>
              <select
                v-model="form.tshirtSize"
                required
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">T-shirt inscription *</label>
              <select
                v-model="form.tshirtInscription"
                required
                class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Kingdom infiltrators (Lagos)</option>
                <option>Kingdom oracles (Lautech)</option>
                <option>Kingdom innovators (Lautech)</option>
                <option>Kingdom influencers (Potters House)</option>
                <option>Kingdom legislators (Others)</option>
              </select>
            </div>
          </div>

          <!-- Other details -->
          <div>
            <label class="text-sm font-medium text-gray-700">Other details</label>
            <textarea
              v-model="form.otherDetails"
              rows="3"
              class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Submit button -->
          <div class="pt-2">
            <button
              :disabled="loading || !canSubmit"
              type="submit"
              class="w-full rounded-xl py-3 text-sm font-semibold bg-blue-600 text-white
                     hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">Continue to payment</span>

              <span v-else class="inline-flex items-center gap-2">
                <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue"
import { supabase } from "../lib/superbase"

// Declare PaystackPop as global
declare const PaystackPop: any

const props = defineProps({
  show: Boolean,
  plan: Object
})

const emit = defineEmits(["close", "success"])

const loading = ref(false)

const form = reactive({
  fullName: "",
  gender: "",
  ageRange: "",
  phone: "",
  healthConditions: "",
  isCommittee: "",
  committeeUnit: "",
  volunteer: "",
  serviceUnit: "",
  arrivalDay: "",
  location: "",
  tshirtSize: "",
  tshirtInscription: "",
  otherDetails: "",
})

function reset() {
  for (const key in form) {
    if (key in form) {
      form[key as keyof typeof form] = ""
    }
  }
}

const canSubmit = computed(() =>
  !!(
    form.fullName &&
    form.gender &&
    form.ageRange &&
    form.phone &&
    form.tshirtSize &&
    form.tshirtInscription &&
    form.isCommittee &&
    form.volunteer
  )
)

async function paystack() {
  return new Promise<string>((resolve, reject) => {
    if (typeof PaystackPop === "undefined") {
      return reject("Paystack script missing")
    }

    const handler = PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: form.phone + "@eyys.com",
      amount: (props.plan?.price || 0) * 100,
      currency: "NGN",
      callback: (res: any) => resolve(res.reference),
      onClose: () => reject("Payment closed")
    })

    handler.openIframe()
  })
}

async function saveToSupabase(reference: string) {
  const { error } = await supabase.from("accommodation_bookings").insert([
    {
      full_name: form.fullName,
      gender: form.gender,
      age_range: form.ageRange,
      phone: form.phone,
      health_conditions: form.healthConditions,
      is_committee: form.isCommittee,
      committee_unit: form.committeeUnit,
      volunteer: form.volunteer,
      service_unit: form.serviceUnit,
      arrival_day: form.arrivalDay,
      location: form.location,
      tshirt_size: form.tshirtSize,
      tshirt_inscription: form.tshirtInscription,
      other_details: form.otherDetails,
      plan: props.plan?.title,
      payment_reference: reference
    }
  ])

  if (error) throw error
}

async function onSubmit() {
  loading.value = true
  try {
    const reference = await paystack()
    await saveToSupabase(reference)
    emit("success", { reference })
    close()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function close() {
  reset()
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
