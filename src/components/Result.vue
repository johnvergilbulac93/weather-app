<template>
     <nav
          class="p-14 bg-gradient-to-r from-[#1e0db4] to-[#e44747] opacity-80 w-full"
     >
          <form
               @submit.prevent="search()"
               class="flex lg:gap-4 sm:gap-2 justify-center items-center text-gray-700"
          >
               <input
                    type="text"
                    class="px-4 py-2 lg:w-1/4 sm:w-40 md:w-1/2 rounded focus:outline-none text-lg font-semibold"
                    placeholder="I'm looking for"
                    tabindex="1"
                    v-model="field.venue"
               />
               <input
                    type="text"
                    class="px-4 py-2 lg:w-40 sm:w-24 md:w-40 rounded focus:outline-none text-lg font-semibold"
                    placeholder="Place"
                    tabindex="2"
                    v-model="field.place"
               />
               <button
                    type="submit"
                    class="bg-[#FF7F7F] text-white shadow-lg px-4 py-2 rounded focus:outline-none hover:bg-[#f87373]"
                    tabindex="3"
               >
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         class="h-6 w-6"
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
          </form>
     </nav>
     <div class="flex sm:flex-col lg:flex-row justify-between gap-4 p-2">
          <div class="lg:w-1/2 sm:w-full">
               <div class="bg-gray-100 rounded p-2">
                    <h1
                         class="uppercase text-2xl font-bold text-center text-gray-700"
                    >
                         Weather Today
                    </h1>
                    <div
                         class="flex flex-col justify-center items-center text-gray-700 mt-10 space-y-5"
                    >
                         <span class="uppercase font-bold text-xl"
                              >{{ weather.name }},
                              {{ weather.sys.country }}</span
                         >
                         <span class="uppercase font-bold text-sm">{{
                              dateToday
                         }}</span>
                         <span
                              class="p-5 text-center font-bold text-9xl bg-gray-200 shadow-lg rounded"
                         >
                              {{ Math.round(weather.main.temp) }}°c
                         </span>
                         <span class="text-xl font-bold">
                              {{ weather.weather[0].main }}
                         </span>
                    </div>
               </div>
          </div>
          <div class="lg:w-3/4 sm:w-full">
               <Venues />
          </div>
     </div>
</template>

<script setup>
import Venues from "./Venues.vue";
import { reactive } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const field = reactive({
     venue: route.query.looking_for,
     place: route.query.location,
});

const dateToday = computed(() => {
     return store.getters.dateBuilder;
});

const fetch = () => {
     store.dispatch("searchWeather", { place: route.query.location });
     store.dispatch("searchVenue", {
          place: route.query.location,
          venue: route.query.looking_for,
     });
};
const search = () => {
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
};

const weather = computed(() => {
     return store.state.weather;
});

watch(() => route, fetch());
</script>
