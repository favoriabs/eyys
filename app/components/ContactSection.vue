<template>
  <section id="contact" class="bg-black text-white px-6 md:px-20 py-20">
    <div class="bg-neutral-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between gap-12">
      <!-- Left Info -->
      <div class="flex-1">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-4">We’re Here To Assist You</h2>
        <p class="text-gray-300 mb-10">
          Have questions about the retreat? Need help with registration? Our team is ready to assist you.
        </p>

        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="font-bold text-sm mb-1 uppercase">Contact Us</h3>
            <p class="text-gray-300">+234 80 123 4567</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-1 uppercase">Location</h3>
            <p class="text-gray-300">Potter House, Oshogbo Nigeria</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-1 uppercase">Email</h3>
            <p class="text-gray-300">potterhouse@gmail.com</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-1 uppercase">Follow Us</h3>
            <p class="text-gray-300">@endyouryearstrong</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="flex-1 bg-neutral-800 rounded-3xl p-6">
        <h3 class="text-lg font-bold mb-4">Get in Touch</h3>
        <p class="text-gray-300 mb-6">
          Reach out with inquiries about registration, partnerships, or retreat details.
        </p>

        <form class="flex flex-col gap-4">
          <input type="text" placeholder="Name" class="bg-transparent border-b border-gray-600 focus:outline-none text-gray-200 py-2" />
          <input type="email" placeholder="Email" class="bg-transparent border-b border-gray-600 focus:outline-none text-gray-200 py-2" />
          <input type="text" placeholder="Subject" class="bg-transparent border-b border-gray-600 focus:outline-none text-gray-200 py-2" />
          <textarea placeholder="Message" rows="4" class="bg-transparent border-b border-gray-600 focus:outline-none text-gray-200 py-2"></textarea>

          <button type="submit" class="bg-linear-to-r from-blue-700 to-blue-500 text-white py-3 rounded-full mt-2 hover:scale-105 transition-transform duration-300">
            Send message
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
