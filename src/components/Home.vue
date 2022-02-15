<template>
     <div
          class="w-full bg-gradient-to-r from-[#1e0db4] to-[#e44747] opacity-80 h-screen"
     >
          <form
               @submit.prevent="search()"
               class="fixed top-0 left-0 z-50 p-2 flex flex-col justify-center items-center w-full min-h-screen space-y-8"
          >
               <h1 class="block text-4xl text-white font-bold">
                    Weather & Tourist Information App
               </h1>
               <div class="flex justify-center w-full sm-gap-2 lg:gap-4">
                    <input
                         placeholder="I'm looking for"
                         type="text"
                         class="border lg:w-1/4 sm:w-1/2 px-5 py-4 focus:outline-none text-gray-700 font-semibold rounded shadow-lg text-xl"
                         tabindex="1"
                         v-model="field.venue"
                    />
                    <input
                         placeholder="Place"
                         type="text"
                         class="border md:w-40 sm:w-20 px-5 py-4 focus:outline-none text-gray-700 font-semibold rounded shadow-lg text-xl"
                         tabindex="2"
                         v-model="field.place"
                    />
                    <button
                         type="submit"
                         class="bg-[#FF7F7F] text-white shadow-lg px-5 py-4 rounded focus:outline-none hover:bg-[#f87373]"
                         tabindex="3"
                    >
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-7 w-7"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                         >
                              <path
                                   stroke-linecap="round"
                                   stroke-linejoin="round"
                                   stroke-width="2"
                                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                         </svg>
                    </button>
               </div>
          </form>
     </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();

const store = useStore();
const field = reactive({
     venue: "",
     place: "",
});

function search() {
     if (!field.place.length || !field.venue.length) {
          return alert("Some field is empty.");
     }
     store.dispatch("searchWeather", { place: field.place });
     store.dispatch("searchVenue", {
          place: field.place,
          venue: field.venue,
     });
     router.push({
          name: "Venues",
          query: { location: field.place, looking_for: field.venue },
     });
}
</script>
