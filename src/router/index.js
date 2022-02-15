import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
     history: createWebHistory(),
     scrollBehavior(to, from, savedPosition) {
          if (savedPosition) {
               return savedPosition;
          } else {
               return { top: 0 };
          }
     },
     routes,
});

export default router;
