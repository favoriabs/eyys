<template>
  <transition name="slide-up">
    <div v-if="show" class="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="close"></div>

      <div class="relative w-full max-w-xl bg-white text-gray-900 rounded-t-3xl md:rounded-3xl shadow-xl p-5 md:p-8 mx-4 md:mx-0 overflow-y-auto max-h-[90vh] z-10">
        <!-- header -->
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-xl font-semibold">Registration</h3>
            <p class="text-sm text-gray-500 mt-1">Complete your registration details</p>

            <!-- Plan preview -->
            <div class="mt-3">
              <div class="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 0 0 2 2h14" />
                </svg>

                <div class="text-sm">
                  <div class="font-semibold">{{ plan?.title }}</div>
                  <div class="text-xs text-gray-500 font-medium">
                    <span v-if="plan?.price > 0">₦{{ plan.price.toLocaleString() }}</span>
                    <span v-else>FREE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button @click="close" class="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- form -->
        <form @submit.prevent="onSubmit" class="mt-6 space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700">Full name *</label>
            <input v-model="form.fullName" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700">Gender *</label>
              <select v-model="form.gender" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Age range *</label>
              <select v-model="form.ageRange" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option disabled value="">Select</option>
                <option value="Below 18">Below 18</option>
                <option value="18 - 25">18 - 25</option>
                <option value="26 - 35">26 - 35</option>
                <option value="36 - Above">36 - Above</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Phone number (include country code) *</label>
            <input v-model="form.phone" required type="tel" placeholder="2348012345678" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Any health conditions?</label>
            <input v-model="form.healthConditions" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700">Are you a member of the EYYS committee? *</label>
              <select v-model="form.isCommittee" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">If yes, which unit?</label>
              <input v-model="form.committeeUnit" placeholder="Media, Music, etc." class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Would you like to volunteer during EYYS? *</label>
            <select v-model="form.volunteer" required class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Service unit</label>
            <select v-model="form.serviceUnit" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
              <option value="">Select</option>
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700">Arrival day</label>
              <select v-model="form.arrivalDay" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
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
              <select v-model="form.location" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option>Lagos</option>
                <option>Lautech</option>
                <option>Potters House</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700">T-shirt size *</label>
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
              <label class="text-sm font-medium text-gray-700">T-shirt inscription *</label>
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

          <div>
            <label class="text-sm font-medium text-gray-700">Other details</label>
            <textarea v-model="form.otherDetails" rows="3" class="w-full mt-1 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <div>
            <button :disabled="loading || !canSubmit" type="submit" class="w-full rounded-xl py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
              <span v-if="!loading">Continue</span>
              <span v-else>Processing...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { supabase } from '~/lib/superbase'
declare const PaystackPop: any

const props = defineProps({
  show: { type: Boolean, default: false },
  plan: { type: Object, default: () => ({ title: 'No Room', price: 0 }) }
})
const emit = defineEmits(['close', 'success', 'manual'])

const loading = ref(false)
const PAYMENT_MODE = (import.meta.env.VITE_USE_PAYSTACK || 'false') === 'true'

const form = reactive({
  fullName: '',
  gender: '',
  ageRange: '',
  phone: '',
  healthConditions: '',
  isCommittee: '',
  committeeUnit: '',
  volunteer: '',
  serviceUnit: '',
  arrivalDay: '',
  location: '',
  tshirtSize: '',
  tshirtInscription: '',
  otherDetails: ''
})

const canSubmit = computed(() =>
  !!(form.fullName && form.gender && form.ageRange && form.phone && form.tshirtSize && form.tshirtInscription && form.isCommittee && form.volunteer)
)

function close() {
  emit('close')
  reset()
}

function reset() {
  for (const k in form) {
    // @ts-ignore
    form[k] = ''
  }
}

// Save to supabase common helper
async function saveRegistration(payload: any) {
  const { error } = await supabase.from('registrations').insert([payload])
  if (error) throw error
}

async function onSubmit() {
  if (!canSubmit.value) return
  loading.value = true

  // Build payload
  const basePayload = {
    plan: props.plan?.title || 'No Room',
    price: props.plan?.price || null,
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
    other_details: form.otherDetails
  }

  try {
    // CASE: FREE / No Room -> save directly with no payment
    if (!props.plan?.price || props.plan?.price === 'FREE') {
      const payload = { ...basePayload, payment_method: null, payment_reference: null, proof_url: null }
      await saveRegistration(payload)
      emit('success', { manual: false, payload })
      close()
      return
    }

    // If PAYMENT_MODE is disabled -> emit manual and let parent open ManualPaymentModal
    if (!PAYMENT_MODE) {
      // Save a pending registration row with payment_method = 'manual_pending' OR don't save yet (we'll save after proof)
      // We'll pass the collected form up to the parent so ManualPaymentModal can upload proof and finalize save.
      emit('manual', JSON.parse(JSON.stringify(basePayload)))
      loading.value = false
      return
    }

    // Else -> use Paystack
    const reference = await payWithPaystack(basePayload)
    // save with payment details
    const payload = { ...basePayload, payment_method: 'paystack', payment_reference: reference, proof_url: null }
    await saveRegistration(payload)
    emit('success', { reference, payload })
    close()
  } catch (err) {
    console.error(err)
    alert('An error occurred. Please try again.')
  } finally {
    loading.value = false
  }
}

function payWithPaystack(basePayload: any) {
  return new Promise<string>((resolve, reject) => {
    if (typeof PaystackPop === 'undefined') {
      return reject('Paystack script not loaded')
    }

    const handler = PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: form.phone ? `${form.phone}@eyys.com` : `guest@eyys.com`,
      amount: (props.plan?.price || 0) * 100,
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
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0; transform: translateY(20px);
}
</style>
