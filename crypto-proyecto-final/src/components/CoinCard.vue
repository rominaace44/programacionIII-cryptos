<template>
  <!-- <router-link
    :to="{ name: 'produsctDetails', params: { id: event.id } }"
    class="linkdetails"
  > -->
  <router-link
    :to="{ name: 'TransactionView', params: { id: event.id } }"
    class="container"
  >
    <div class="event-Card">
      <h2>{{ event.name }}</h2>
      <p>Precio: $ {{ event.current_price }}</p>
      <img :src="event.image" alt="imagen-coin" />
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CoinCard",
  props: {
    //es el objeto que recibe como prop
    event: { type: Object, required: true },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-decoration: none;
  color: #1e81b0;
}
.event-Card {
  width: 400px;
  height: 250px;
  /* border: 2px solid black; */
  border-radius: 40px;

  text-align: center;
  margin-bottom: 15px;
  cursor: pointer;
}
.event-Card:hover {
  /* background-color: rgba(169, 169, 169, 0.26); */
  background-color: #76b5c588;
  color: black;
}
.linkdetails {
  text-decoration: none;
}
img {
  width: 100px;
  height: 100px;
  margin-top: 15px;
}
.divButton {
  display: flex;
  flex-direction: row;
  width: 400px;
  align-items: center;
  justify-content: space-around;
}
.buttons {
  height: 35px;
  width: 100px;
}
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
