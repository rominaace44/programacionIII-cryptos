<template>
  <div>
    <nav>
      <router-link to="/coins">Monedas</router-link> |
      <router-link to="/historial">Mis historial</router-link>
    </nav>
    <h2 class="text">Elige la moneda con la que quieres operar</h2>

    <div class="coins">
      <CoinCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
//SE IMPORTAN COMPONENTES Y SERVICIOS PARA LLAMAR A LA API
import CoinCard from "@/components/CoinCard.vue";
import ProductsServices from "@/services/ProductsServices.js";
export default {
  name: "CoinsView",
  components: {
    CoinCard, //COMPONENTE QUE SE MUESTRA
  },
  data() {
    return {
      events: null, //DATA QUE SE MUESTRA
    };
  },
  created() {
    ProductsServices.getCoins()

      // .then((response) => (this.events = response.data))
      .then((response) => (this.events = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.coins {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 35px;
  margin-left: 10rem;
  /* flex-direction: row; */
  /* align-items: center; */
}
.text {
  color: #1e81b0;
  background: #1e82b018;
  width: 40rem;
  margin: auto;
}
</style>
