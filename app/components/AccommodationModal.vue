<template>
  <transition name="slide-up">
    <div v-if="show" class="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="close"></div>

      <div
        class="relative w-full max-w-xl bg-white text-gray-900 rounded-t-3xl md:rounded-3xl shadow-xl
                overflow-y-auto max-h-[90vh] z-10"
        role="dialog"
        aria-modal="true"
      >
        <!-- header -->
        <!-- TOP BAR -->
        <div class="w-full bg-[#EAF1FB] py-4 px-4 rounded-t-3xl">

          <div class="flex items-center justify-between">

            <!-- Back button -->
            <button @click="goBack" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-[#7B8DA0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <!-- Title -->
            <h3 class="text-[18px] font-semibold text-[#293041]">
              {{ plan.price == 0 ? 'Registration' : 'Accommodation Booking' }}
            </h3>

            <!-- Fake spacer to balance grid -->
            <div class="w-6"></div>
          </div>

        </div>


        <!-- ROOM OF CHOICE -->
        <div class="mt-6 mx-4" v-if="isPaidPlan">
          <span class="text-sm text-[#475466]">Room of choice</span>

          <div class="flex items-center gap-3 bg-[#1E4DB7] text-white px-4 py-3 rounded-xl mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white opacity-90"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>

            <div class="text-[15px]">
              {{ plan.title }} :
              <span class="font-semibold">₦{{ plan.price.toLocaleString() }}</span>
            </div>
          </div>
        </div>



        

        <!-- form -->
        <form @submit.prevent="onSubmit" class="mt-6 space-y-4 p-5 md:p-8 mx-4 md:mx-0">

          <!-- Full name -->
          <div>
            <label class="text-sm font-medium text-gray-700">Full name <span class="text-red-600">*</span></label>
            <input v-model="form.fullName" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
          </div>

          <!-- Gender + Age range -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700">Gender <span class="text-red-600">*</span></label>
              <select v-model="form.gender" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Age range <span class="text-red-600">*</span></label>
              <select v-model="form.ageRange" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option disabled value="">Select</option>
                <option value="Below 18">Below 18</option>
                <option value="18 - 25">18 - 25</option>
                <option value="26 - 35">26 - 35</option>
                <option value="36 - Above">36 - Above</option>
              </select>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="text-sm font-medium text-gray-700">Phone number (WhatsApp enabled) <span class="text-red-600">*</span></label>
            <input v-model="form.phone" required type="tel" placeholder="2348012345678" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
            <!-- <p class="text-xs text-gray-500 mt-1">Include country code (e.g., 2348012345678)</p> -->
          </div>

          <!-- Where are you attending from? + If Others -->
          <div>
            <label class="text-sm font-medium text-gray-700">Where are you attending from? <span class="text-red-600">*</span></label>
            <select v-model="form.attendingFrom" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
              <option value="">Select</option>
              <option value="Lagos">Lagos</option>
              <option value="Lautech">Lautech</option>
              <option value="Potters House">Potters House</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div v-if="form.attendingFrom === 'Others'">
            <label class="text-sm font-medium text-gray-700">If others, kindly specify <span class="text-red-600">*</span></label>
            <input v-model="form.attendingOther" :required="form.attendingFrom === 'Others'" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
          </div>

          <!-- Arrival day -->
          <div>
            <label class="text-sm font-medium text-gray-700">Expected arrival day</label>
            <select v-model="form.arrivalDay" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
              <option value="">Select</option>
              <option>Day 1</option>
              <option>Day 2</option>
              <option>Day 3</option>
              <option>Day 4</option>
              <option>Day 5</option>
            </select>
          </div>

          <!-- Committee + unit -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700">Are you a member of the EYYS committee? <span class="text-red-600">*</span></label>
              <select v-model="form.isCommittee" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div v-if="form.isCommittee === 'Yes'">
              <label class="text-sm font-medium text-gray-700">If yes, which unit are you serving in?</label>
              <input v-model="form.committeeUnit" placeholder="Media, Music, etc." class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <!-- Volunteer + volunteer unit -->
          <div>
            <label class="text-sm font-medium text-gray-700">Would you like to volunteer during EYYS? <span class="text-red-600">*</span></label>
            <select v-model="form.volunteer" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div v-if="form.volunteer === 'Yes'">
            <label class="text-sm font-medium text-gray-700">If yes, which unit would you like to serve in?</label>
            <select v-model="form.volunteerUnit" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
              <option value="">Select unit</option>
              <option>Music</option>
              <option>Media</option>
              <option>Content Team (design & social media)</option>
              <option>Protocol & Ushering</option>
              <option>Bible Study</option>
              <option>Prayer</option>
              <option>Registration Info & Logistics</option>
              <option>Finance</option>
              <option>Sales</option>
              <option>Medicals & Health</option>
              <option>Sanitation & Excellence</option>
              <option>Technical & Sound Media</option>
              <option>Operations</option>
              <option>Instrumentalist</option>
            </select>
          </div>

          <!-- T-shirt size + inscription -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700">T-shirt size <span class="text-red-600">*</span></label>
              <select v-model="form.tshirtSize" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Choose your shirt inscription <span class="text-red-600">*</span></label>
              <select v-model="form.tshirtInscription" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option>Kingdom infiltrators (Lagos)</option>
                <option>Kingdom oracles (Lautech)</option>
                <option>Kingdom innovators (Lautech)</option>
                <option>Kingdom influencers (Potters House)</option>
                <option>Kingdom legislators (Others)</option>
              </select>
            </div>
          </div>

          <!-- Health conditions -->
          <div>
            <label class="text-sm font-medium text-gray-700">Any health conditions? If yes, specify.</label>
            <input v-model="form.healthConditions" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
          </div>

          <!-- Other details -->
          <div>
            <label class="text-sm font-medium text-gray-700">Other details</label>
            <textarea v-model="form.otherDetails" rows="3" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <!-- submit -->
          <div>
            <button
              :disabled="loading || !canSubmit"
              type="submit"
              class="w-full rounded-xl py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">{{ primaryButtonText }}</span>
              <span v-else class="inline-flex items-center gap-2">
                <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
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
import { reactive, ref, computed, watch } from 'vue'
import { supabase } from '~/lib/superbase'
declare const PaystackPop: any

/* props + emits */
const props = defineProps({
  show: { type: Boolean, default: false },
  plan: { type: Object, default: () => ({ title: 'No Room', price: 0 }) }
})
const emit = defineEmits(['close', 'success', 'manual'])

/* loading and config */
const loading = ref(false)
const PAYMENT_MODE = (import.meta.env.VITE_USE_PAYSTACK || 'false') === 'true'

/* form state */
const form = reactive({
  fullName: '',
  gender: '',
  ageRange: '',
  phone: '',
  attendingFrom: '',
  attendingOther: '',
  arrivalDay: '',
  isCommittee: '',
  committeeUnit: '',
  volunteer: '',
  volunteerUnit: '',
  tshirtSize: '',
  tshirtInscription: '',
  healthConditions: '',
  otherDetails: ''
})

/* derived */
const isPaidPlan = computed(() => !!props.plan && !!props.plan.price && props.plan.price !== 'FREE' && Number(props.plan.price) > 0)
const primaryButtonText = computed(() => (isPaidPlan.value ? 'Continue to payment' : 'Save'))

/* Validation: ensure required fields and conditional requireds */
const canSubmit = computed(() => {
  // base requireds
  const base = form.fullName && form.gender && form.ageRange && form.phone && form.attendingFrom && form.tshirtSize && form.tshirtInscription && form.isCommittee && form.volunteer

  if (!base) return false

  // if attendingFrom is Others, attendingOther required
  if (form.attendingFrom === 'Others' && !form.attendingOther) return false

  // if volunteer yes, volunteerUnit should be selected (match screenshot UX)
  if (form.volunteer === 'Yes' && !form.volunteerUnit) return false

  return true
})

/* reset when closed */
watch(() => props.show, (v) => { if (!v) reset() })
function reset() {
  loading.value = false
  for (const k in form) {
    // @ts-ignore
    form[k] = ''
  }
}

/* helper to save registration row to Supabase */
async function saveRegistration(payload: any) {
  const { error } = await supabase.from('registrations').insert([payload])
  if (error) throw error
}

/* main submit handler */
async function onSubmit() {
  if (!canSubmit.value) return
  loading.value = true

  const basePayload = {
    plan: props.plan?.title || 'No Room',
    price: props.plan?.price || 0,
    full_name: form.fullName,
    gender: form.gender,
    age_range: form.ageRange,
    phone: form.phone,
    attending_from: form.attendingFrom,
    attending_other: form.attendingOther || null,
    arrival_day: form.arrivalDay || null,
    is_committee: form.isCommittee,
    committee_unit: form.committeeUnit || null,
    volunteer: form.volunteer,
    volunteer_unit: form.volunteerUnit || null,
    tshirt_size: form.tshirtSize,
    tshirt_inscription: form.tshirtInscription,
    health_conditions: form.healthConditions || null,
    other_details: form.otherDetails || null
  }

  try {
    // Free / registration-only
    if (!isPaidPlan.value) {
      const payload = { ...basePayload, payment_method: null, payment_reference: null, proof_url: null }
      await saveRegistration(payload)
      emit('success', { manual: false, payload })
      close()
      return
    }

    // Paid plan but PAYMENT_MODE disabled -> emit manual (parent should open ManualPayment modal)
    if (!PAYMENT_MODE) {
      // send basePayload up so parent can handle manual payment flow (upload proof + finalize)
      emit('manual', JSON.parse(JSON.stringify(basePayload)))
      loading.value = false
      return
    }

    // Else: Paystack flow
    const reference = await payWithPaystack()
    const payload = { ...basePayload, payment_method: 'paystack', payment_reference: reference, proof_url: null }
    await saveRegistration(payload)
    emit('success', { reference, payload })
    close()
  } catch (err) {
    console.error(err)
    alert('An error occurred while saving registration. Please try again.')
  } finally {
    loading.value = false
  }
}

/* Paystack helper */
function payWithPaystack() {
  return new Promise<string>((resolve, reject) => {
    if (typeof PaystackPop === 'undefined') {
      return reject('Paystack script not loaded')
    }

    const handler = PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: form.phone ? `${form.phone}@eyys.com` : `guest@eyys.com`,
      amount: (Number(props.plan?.price) || 0) * 100,
      currency: 'NGN',
      metadata: {
        custom_fields: [
          { display_name: 'Plan', variable_name: 'plan', value: props.plan?.title || '' },
          { display_name: 'Phone', variable_name: 'phone', value: form.phone }
        ]
      },
      callback: function (response: any) {
        resolve(response.reference)
      },
      onClose: function () {
        reject('Payment closed')
      }
    })

    handler.openIframe()
  })
}

function close() {
  reset()
  emit('close')
}

function goBack() {
  reset()
  emit('close') 
}

</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0; transform: translateY(20px);
}
</style>
