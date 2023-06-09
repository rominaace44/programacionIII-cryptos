import { createRouter, createWebHistory } from "vue-router";
import CoinsView from "../views/CoinsView.vue";
import TransactionView from "../views/TransactionView.vue";
import LoginView from "../views/LoginView.vue";
import MyTransactionsView from "../views/MyTransactionsView.vue";
// EJERCICIO DE PRUEBA
// import Prueba from "../views/Prueba.vue";

const routes = [
  {
    path: "/",
    name: "loginview",
    component: LoginView,
  },
  {
    path: "/coins",
    name: "CoinsView",
    component: CoinsView,
  },

  {
    path: "/transaction/:id",
    name: "TransactionView",
    props: true,
    component: TransactionView,
  },

  {
    path: "/historial",
    name: "HistorialView",
    component: MyTransactionsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
