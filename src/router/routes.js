const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/details",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/DetailsPage.vue") }],
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AboutPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
