const routes = [
     {
          path: "/",
          name: "Home",
          component: () => import("../components/Home.vue"),
     },
     {
          path: "/venues",
          name: "Venues",
          component: () => import("./../components/Result.vue"),
          props: (route) => ({
               query: {
                    location: route.query.location,
                    looking_for: route.query.looking_for,
               },
          }),
     },
];

export default routes;
