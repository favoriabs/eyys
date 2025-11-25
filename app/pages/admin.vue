<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- PASSWORD SCREEN -->
    <div v-if="!isAuthenticated" class="max-w-sm mx-auto bg-white rounded-xl shadow p-6 mt-40">
      <h2 class="text-xl font-semibold text-center mb-4">Admin Access</h2>

      <input
        v-model="enteredPassword"
        type="password"
        placeholder="Enter admin password"
        class="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
      />

      <button
        @click="login"
        class="w-full mt-4 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
      >
        Enter Dashboard
      </button>
    </div>

    <!-- DASHBOARD -->
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">EYYS Registrations</h2>

        <button
          @click="exportCSV"
          class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      <!-- Filters Section -->
      <div class="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">

        <input
          v-model="search"
          type="text"
          placeholder="Search all fields..."
          class="p-3 border border-gray-300 rounded-xl bg-gray-50 col-span-full md:col-span-2"
        />

        <select v-model="filters.plan" class="p-3 border rounded-xl bg-gray-50">
          <option value="">All Plans</option>
          <option v-for="p in uniquePlans" :key="p">{{ p }}</option>
        </select>

        <select v-model="filters.payment" class="p-3 border rounded-xl bg-gray-50">
          <option value="">Payment: All</option>
          <option value="paystack">Paystack</option>
          <option value="manual">Manual</option>
          <option value="free">Free</option>
        </select>

        <select v-model="filters.location" class="p-3 border rounded-xl bg-gray-50">
          <option value="">All Locations</option>
          <option v-for="l in uniqueLocations" :key="l">{{ l }}</option>
        </select>

        <select v-model="filters.volunteer" class="p-3 border rounded-xl bg-gray-50">
          <option value="">Volunteer: All</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading registrations...
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto rounded-xl shadow bg-white">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-200 text-gray-700">
              <th class="p-3">Name</th>
              <th class="p-3">Phone</th>
              <th class="p-3">Plan</th>
              <th class="p-3">Attending From</th>
              <th class="p-3">Price</th>
              <th class="p-3">Payment</th>
              <th class="p-3">Proof</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="b in filtered" :key="b.id" class="border-t hover:bg-gray-50">
              <td class="p-3">{{ b.full_name }}</td>
              <td class="p-3">{{ b.phone }}</td>
              <td class="p-3 font-medium">{{ b.plan }}</td>
              <td class="p-3">{{ b.attending_from }}</td>
              <td class="p-3">{{ b.price ? `₦${b.price.toLocaleString()}` : 'FREE' }}</td>

              <td class="p-3">
                <span v-if="b.payment_method === 'paystack'" class="text-green-600">
                  Paystack ({{ b.payment_reference }})
                </span>
                <span v-else-if="b.payment_method === 'manual'" class="text-blue-600">
                  Manual Payment
                </span>
                <span v-else class="text-gray-500">FREE</span>
              </td>

              <td class="p-3">
                <div v-if="b.proof_url" class="flex gap-3">
                  <a
                    :href="getProofUrl(b.proof_url)"
                    target="_blank"
                    class="text-blue-600 underline"
                  >
                    View
                  </a>

                  <button
                    @click="downloadProof(b.proof_url)"
                    class="text-green-600 underline"
                  >
                    Download
                  </button>
                </div>

                <span v-else class="text-gray-400">—</span>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { supabase } from "~/lib/superbase";

const enteredPassword = ref("");
const isAuthenticated = ref(false);
const loading = ref(false);

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

// DATA
const registrations = ref<any[]>([]);
const search = ref("");

const filters = ref({
  plan: "",
  payment: "",
  location: "",
  volunteer: "",
});

// LOGIN
function login() {
  if (enteredPassword.value === ADMIN_PASS) {
    isAuthenticated.value = true;
    loadRegistrations();
  } else {
    alert("Incorrect admin password");
  }
}

// LOAD DATA
async function loadRegistrations() {
  loading.value = true;

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error) registrations.value = data;
  else console.error(error);

  loading.value = false;
}

const uniquePlans = computed(() =>
  [...new Set(registrations.value.map((x) => x.plan))].filter(Boolean)
);

const uniqueLocations = computed(() =>
  [...new Set(registrations.value.map((x) => x.location))].filter(Boolean)
);

// FILTERING + SEARCH
const filtered = computed(() => {
  return registrations.value.filter((b) => {
    const matchesSearch = (b.full_name + b.phone + b.plan + b.payment_reference)
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesPlan = filters.value.plan ? b.plan === filters.value.plan : true;

    const matchesPayment =
      filters.value.payment === "free"
        ? !b.payment_method
        : filters.value.payment
        ? b.payment_method === filters.value.payment
        : true;

    const matchesLocation = filters.value.location
      ? b.location === filters.value.location
      : true;

    const matchesVolunteer = filters.value.volunteer
      ? b.volunteer === filters.value.volunteer
      : true;

    return (
      matchesSearch &&
      matchesPlan &&
      matchesPayment &&
      matchesLocation &&
      matchesVolunteer
    );
  });
});

// PUBLIC URL
function getProofUrl(path: string) {
  return supabase.storage
    .from("payment_proofs")
    .getPublicUrl(path).data.publicUrl;
}

// FILE DOWNLOAD
async function downloadProof(path: string) {
  const { data, error } = await supabase.storage
    .from("payment_proofs")
    .download(path);

  if (error) {
    alert("Unable to download file");
    return;
  }

  const url = window.URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = path.split("/").pop()!;
  a.click();
  window.URL.revokeObjectURL(url);
}

// EXPORT CSV
function exportCSV() {
  const rows = [
    [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "Gender",
      "Age Range",
      "Plan",
      "Price",
      "Committee",
      "Committee Unit",
      "Volunteer",
      "Volunteer Unit",
      "Attending From",
      "Attending Other",
      "Arrival Day",
      "Health Conditions",
      "T-Shirt Size",
      "T-Shirt Inscription",
      "Other Details",
      "Payment Method",
      "Payment Reference",
      "Proof URL",
      "Created At"
    ],
    ...registrations.value.map((b) => [
      b.id,
      b.full_name,
      b.phone,
      b.email || "",
      b.gender,
      b.age_range,
      b.plan,
      b.price,
      b.is_committee,
      b.committee_unit || "",
      b.volunteer,
      b.volunteer_unit || "",
      b.attending_from,
      b.attending_other || "",
      b.arrival_day || "",
      b.health_conditions || "",
      b.tshirt_size,
      b.tshirt_inscription,
      b.other_details || "",
      b.payment_method || "",
      b.payment_reference || "",
      b.proof_url ? getProofUrl(b.proof_url) : "",
      b.created_at
    ]),
  ];

  let csvContent =
    "data:text/csv;charset=utf-8," +
    rows.map((row) => row.map(value =>
      `"${String(value).replace(/"/g, '""')}"`
    ).join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "registrations.csv";
  link.click();
}

</script>
