<template>
  <div v-if="event" class="container">
    <h1>Haz elegido la moneda: {{ this.event.name }}</h1>
    <h2>valor : ${{ this.event.current_price }}</h2>

    <div>
      <form action="" class="formulario">
        <label for="cantidad"> ingrese cantidad</label>
        <input
          type="number"
          name=""
          id="cantidad"
          v-model="this.cantidad"
          v-on:keyup="asd"
        />
        <p v-if="message" class="error">{{ this.message }}</p>
        <label for="tipo"> seleccione operacion</label>
        <select name="tipo" id="tipo" v-model="operacion">
          <option value="">Operación</option>
          <option
            v-for="(operacion, index) in operaciones"
            :key="index"
            :value="operacion.value"
          >
            {{ operacion.name }}
          </option>
        </select>
        <p v-if="message" class="error">{{ this.message }}</p>
      </form>
      <h1>total de la operacion:$ {{ total }}</h1>
      <h5>usted esta comprado {{ cantidad }} {{ event.name }}</h5>
    </div>
    <div class="botons">
      <div>
        <input class="boton" type="button" value="Operar" @click="sent" />

        <p v-if="messagefinal" class="error">{{ this.messagefinal }}</p>
      </div>
      <div>
        <router-link to="/coins">
          <input class="boton" type="button" value="volver a Inicio" />
        </router-link>
      </div>
    </div>

    <!-- <h1>{{ event.title }}</h1> -->
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import ProductsServices from "@/services/ProductsServices.js";

export default {
  name: "TransactionView",
  props: ["id"], //el id se recibe a travez de la url por porps y se le define como parametro ala funcion getCoinDetails
  data() {
    return {
      event: null,
      name: "",
      operaciones: [
        { name: "compra", value: "purchase" },
        { name: "venta", value: "sale" },
      ],
      cantidad: "",
      operacion: "",
      total: "",
      user_id: "a1b2",
      datetime: new Date().toLocaleString(),
      message: "",
      messagefinal: "",
    };
  },
  methods: {
    asd() {
      this.message = "";
      let totalOperacion = this.cantidad * this.event.current_price;
      this.total = totalOperacion.toFixed(2);
    },
    sent() {
      if (this.cantidad <= 0) {
        this.message = "Debe ingresar un valor para continuar";
      }
      if (this.operacion === "") {
        this.message = "Debe seleccionar una operación para continuar";
      } else {
        let datos = {
          user_id: "a1b2",
          action: this.operacion,
          crypto_code: this.event.id,
          crypto_amount: this.cantidad.toString(),
          money: this.total,
          datetime: this.datetime,
        };
        console.log(datos, "soy la transaction");

        ProductsServices.sentData(datos).then((response) => {
          if (response.status === 201) {
            this.messagefinal = "Compra realizada!";
          }
          //console.log(response.data);
        });
      }
    },
  },
  created() {
    ProductsServices.getCoinDetails(this.id)
      .then((response) => {
        this.event = response.data[0];
        console.log(this.event);
        this.name = response.data.name;
        this.valor_coin = response.data.current_price;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
.boton {
  background-color: blue;
  color: white;
  height: 50px;
  width: 120px;
  border-radius: 10px;
  cursor: pointer;
  border-style: none;
}
.container-operacion {
  display: flex;
  flex-direction: column;
}
.formulario {
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
}
.formulario input {
  border-radius: 10px;
  height: 50px;
  width: 50%;
  margin: auto;
  padding-left: 2rem;
}
select {
  border-radius: 10px;
  height: 50px;
  width: 50%;
  margin: auto;
  padding-left: 2rem;
  font-size: 20px;
}
.error {
  color: red;
  font-size: 15px;
}
.botons {
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-around;
  margin: auto;
  margin-top: 5rem;
}
</style>
