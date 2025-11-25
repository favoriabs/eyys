<template>
  <transition name="slide-up">
    <div v-if="show" class="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="close"></div>

      <div class="relative w-full max-w-xl bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-8 mx-4 shadow-xl overflow-y-auto max-h-[90vh] z-10">
        <h2 class="text-lg font-semibold text-center">Payment Details</h2>

        <p class="text-center text-gray-600 mt-2">Amount to transfer</p>
        <p class="text-center text-3xl font-bold mt-1 text-black">₦ {{ plan?.price?.toLocaleString() }}</p>

        <!-- Bank details -->
        <div class="mt-6 bg-gray-50 rounded-xl border p-4 space-y-4">
          <div>
            <p class="text-sm text-gray-500">Bank name</p>
            <p class="font-semibold text-black">{{ bank.bankName }}</p>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Account number</p>
              <p class="font-semibold text-black">{{ bank.accountNumber }}</p>
            </div>

            <button @click="copy(bank.accountNumber)" class="text-xs px-3 py-1 bg-gray-500 rounded-lg">
              COPY
            </button>
          </div>

          <div>
            <p class="text-sm text-gray-500">Account name</p>
            <p class="font-semibold text-black">{{ bank.accountName }}</p>
          </div>
        </div>

        <!-- Upload -->
        <div class="mt-6">
          <p class="text-sm font-medium">Upload proof of payment *</p>

          <label class="w-full mt-2 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500 cursor-pointer block">
            <input type="file" class="hidden" @change="handleFile" />
            <div v-if="!fileName">Upload jpg, png or pdf</div>
            <div v-else class="text-sm text-gray-700">Selected: {{ fileName }}</div>
          </label>
        </div>

        <div class="mt-6">
          <button :disabled="loading" @click="submit" class="w-full py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-60">
            <span v-if="!loading">I’ve made the payment</span>
            <span v-else>Processing...</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '~/lib/superbase'

const props = defineProps({
  show: { type: Boolean, default: false },
  plan: { type: Object, default: () => ({ title: '', price: 0 }) },
  form: { type: Object, default: () => ({}) } // form data passed from AccommodationModal
})
const emit = defineEmits(['close', 'success'])

const loading = ref(false)
const file = ref<File | null>(null)
const fileName = ref('')

const bank = {
  bankName: import.meta.env.VITE_BANK_NAME || 'Ecobank Nigeria Limited',
  accountNumber: import.meta.env.VITE_BANK_ACCOUNT || '2020072873',
  accountName: import.meta.env.VITE_BANK_ACCOUNT_NAME || 'Segilola Lawal'
}

function close() {
  emit('close')
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
}

function handleFile(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  const selectedFile = input.files[0]
  if (selectedFile) {
    file.value = selectedFile
    fileName.value = selectedFile.name
  }
}

async function submit() {
  if (!file.value) {
    alert('Please upload proof of payment')
    return
  }

  loading.value = true

  try {
    // Upload file to Supabase storage payment_proofs bucket
    const ext = file.value.name.split('.').pop()
    const path = `proofs/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage.from('payment_proofs').upload(path, file.value)

    if (uploadError) {
      throw uploadError
    }

    // save record to registrations table with payment_method='manual'


    const payload = {
      plan: props.plan?.title || 'Unknown',
      price: props.plan?.price || null,
      payment_method: 'manual',
      payment_reference: null,
      proof_url: path,

      // EXACT KEYS from AccommodationModal
      full_name: props.form.full_name,
      email: props.form.email,
      gender: props.form.gender,
      age_range: props.form.age_range,
      phone: props.form.phone,
      health_conditions: props.form.health_conditions,
      is_committee: props.form.is_committee,
      committee_unit: props.form.committee_unit,
      volunteer: props.form.volunteer,
      volunteer_unit: props.form.volunteer_unit,
      arrival_day: props.form.arrival_day,
      attending_from: props.form.attending_from,
      attending_other: props.form.attending_other,
      tshirt_size: props.form.tshirt_size,
      tshirt_inscription: props.form.tshirt_inscription,
      other_details: props.form.other_details
    }


    const { error } = await supabase.from('registrations').insert([payload])
    if (error) throw error

    emit('success', { payload })
    close()
  } catch (err) {
    console.error(err)
    alert('Failed to upload or save. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: opacity .25s, transform .25s; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>
