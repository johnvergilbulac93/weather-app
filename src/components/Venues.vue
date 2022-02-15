<template>
     <div class="flex flex-wrap gap-2 justify-center">
          <div
               class="w-64 cursor-pointer flex flex-col justify-end items-center relative group overflow-hidden"
               v-for="(item, i) in venues"
               :key="i"
          >
               <img
                    class="w-full"
                    :src="
                         item.venue.featuredPhotos.items[0].prefix +
                         '290x290' +
                         item.venue.featuredPhotos.items[0].suffix
                    "
                    alt=""
               />
               <div
                    class="absolute inset-0 bg-[#12195f] bg-opacity-50 group-hover:bg-opacity-0 transition duration-300"
               ></div>
               <div class="absolute w-full text-white">
                    <div class="flex flex-col">
                         <span class="font-bold text-lg p-2">{{
                              item.venue.name
                         }}</span>
                         <div class="flex justify-between p-2">
                              <span class="flex gap-1 text-xs font-bold">
                                   <span class="flex gap-2 items-center"
                                        ><svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             class="h-4 w-4"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                        >
                                             <path
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                             />
                                        </svg>
                                        {{
                                             item.venue.stats.checkinsCount
                                        }}</span
                                   ></span
                              >
                              <span class="text-xs font-bold p-2 bg-indigo-400">
                                   {{ item.venue.rating }}</span
                              >
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();

const venues = computed(() => {
     return store.state.venues;
});
</script>
