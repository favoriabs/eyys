<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- PASSWORD SCREEN -->
    <div
      v-if="!isAuthenticated"
      class="max-w-sm mx-auto bg-white rounded-xl shadow p-6 mt-40"
    >
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
        <h2 class="text-2xl font-bold">Accommodation Bookings</h2>

        <button
          @click="exportCSV"
          class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      <!-- Search -->
      <input
        v-model="search"
        type="text"
        placeholder="Search name, phone, plan..."
        class="w-full p-3 mb-4 border border-gray-300 rounded-xl bg-white"
      />

      <!-- Loading -->
      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading bookings...
      </div>

      <!-- Table -->
      <div v-else class="overflow-auto rounded-xl shadow bg-white">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-200 text-gray-700">
              <th class="p-3">Name</th>
              <th class="p-3">Phone</th>
              <th class="p-3">Gender</th>
              <th class="p-3">Plan</th>
              <th class="p-3">Committee</th>
              <th class="p-3">Volunteer</th>
              <th class="p-3">Location</th>
              <th class="p-3">Reference</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="b in filtered"
              :key="b.id"
              class="border-t"
            >
              <td class="p-3">{{ b.full_name }}</td>
              <td class="p-3">{{ b.phone }}</td>
              <td class="p-3">{{ b.gender }}</td>
              <td class="p-3 font-medium">{{ b.plan }}</td>
              <td class="p-3">{{ b.is_committee }}</td>
              <td class="p-3">{{ b.volunteer }}</td>
              <td class="p-3">{{ b.location }}</td>
              <td class="p-3 text-blue-600">{{ b.payment_reference }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const enteredPassword = ref("");
const isAuthenticated = ref(false);
const loading = ref(false);

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

// Data
const bookings = ref<any[]>([]);
const search = ref("");

function login() {
  if (enteredPassword.value === ADMIN_PASS) {
    isAuthenticated.value = true;
    loadBookings();
  } else {
    alert("Incorrect admin password");
  }
}

async function loadBookings() {
  loading.value = true;

  try {
    const data = await $fetch("/api/bookings"); // secure backend route
    bookings.value = data;
  } catch (err) {
    console.error("Error loading admin data:", err);
  }

  loading.value = false;
}

const filtered = computed(() => {
  return bookings.value.filter((b) =>
    (b.full_name + b.phone + b.plan + b.gender)
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );
});

function exportCSV() {
  const rows = [
    ["Full Name", "Gender", "Age Range", "Phone", "Committee", "Volunteer", "Location", "Plan", "Reference"],
    ...bookings.value.map((b) => [
      b.full_name,
      b.gender,
      b.age_range,
      b.phone,
      b.is_committee,
      b.volunteer,
      b.location,
      b.plan,
      b.payment_reference,
    ]),
  ];

  let csvContent =
    "data:text/csv;charset=utf-8," +
    rows.map((row) => row.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "accommodation_bookings.csv";
  document.body.appendChild(link);
  link.click();
}
</script>
