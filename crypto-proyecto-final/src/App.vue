<template>
  <div class="titlestyle">
    <router-link to="/coins" class="title">
      <h1>My Coin$</h1>
      <h3>Tu billetera virtual ;)</h3>
    </router-link>
  </div>
  <nav>
    <router-link to="/coins">Monedas</router-link> |
    <router-link to="/historial">Mis historial</router-link>
  </nav>
  <!-- <Prueba /> -->
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      asd: localStorage.getItem("password") || null,
    };
  },
  created() {
    localStorage.clear();
  },
};
// import Prueba from "@/views/Prueba.vue";
// export default {
//   components: {
//     Prueba,
//   },
// };
</script>

<style>
#app {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #c5e4e6ab;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #5386b9;
}

nav a.router-link-exact-active {
  color: #2e4d6c;
}

.titlestyle {
  background-image: url("https://www.bbva.com/wp-content/uploads/2015/12/bitcoin_blue2-1920x1200.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  height: 200px;
  color: #eeeee4;
  padding: 5px;
  padding-left: 3rem;
  display: flex;
}

.title {
  color: white;
  text-decoration: none;
  font-size: x-large;
}
</style>
