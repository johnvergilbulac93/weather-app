import { createStore } from "vuex";
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL_WEATHER = import.meta.env.VITE_URL_WEATHER;

const BASE_URL_VENUES = import.meta.env.VITE_URL_VENUES;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const VERSION_DATE = "20170715";

const store = createStore({
     state: {
          venues: {},
          weather: {},
     },
     mutations: {
          SET_WEATHER(state, payload) {
               state.weather = payload;
          },
          SET_VENUE(state, payload) {
               state.venues = payload;
          },
     },
     actions: {
          searchWeather({ commit }, payload) {
               fetch(
                    `${BASE_URL_WEATHER}weather?q=${payload.place}&units=metric&APPID=${API_KEY}`
               )
                    .then((res) => {
                         return res.json();
                    })
                    .then((res) => {
                         commit("SET_WEATHER", res);
                    })
                    .catch((err) => {
                         console.log(err);
                    });
          },
          searchVenue({ commit }, payload) {
               fetch(
                    `${BASE_URL_VENUES}explore?near=${payload.place}&query=${payload.venue}&limit=12&venuePhotos=1&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_DATE}`
               )
                    .then((res) => {
                         return res.json();
                    })
                    .then((res) => {
                         commit("SET_VENUE", res.response.groups[0].items);
                    })
                    .catch((err) => {
                         console.log(err);
                    });
          },
     },
     getters: {
          dateBuilder() {
               let d = new Date();
               let months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
               ];
               let days = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
               ];
               let day = days[d.getDay()];
               let date = d.getDate();
               let month = months[d.getMonth()];
               let year = d.getFullYear();
               return `${day} ${date} ${month} ${year}`;
          },
     },
});

export default store;
