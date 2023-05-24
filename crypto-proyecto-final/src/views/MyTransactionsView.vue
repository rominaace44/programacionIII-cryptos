<template>
  <div class="container">
    <h1>Mis operaciones...</h1>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Moneda</th>
          <th scope="col">Operación</th>
          <th scope="col">Fecha</th>
          <th scope="col">Monto</th>
          <th scope="col">Importe</th>
          <th>Mas@@</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction._id">
          <th>{{ transaction.crypto_code }}</th>
          <th>{{ transaction.action === "purchase" ? "compra" : "venta" }}</th>

          <th>{{ new Date(transaction.datetime).toLocaleDateString() }}</th>

          <th>${{ transaction.crypto_amount }}</th>
          <th>${{ transaction.money }}</th>
          <th>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mas
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item">Editar </a></li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="deleteTransaction(transaction._id)"
                    >Borrar</a
                  >
                </li>
                <li><a class="dropdown-item">Leer</a></li>
              </ul>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import ProductsServices from "@/services/ProductsServices.js";

export default {
  name: "MyTransactionsView",
  data() {
    return {
      transactions: null,
      //   {
      //     _id: "646c02cd108b584e00020e8a",
      //     crypto_code: "bitcoin",
      //     crypto_amount: "0.15",
      //     money: "944205.15",
      //     user_id: "a1b2",
      //     action: "purchase",
      //     datetime: "2023-05-22T21:03:13.000Z",
      //   },
      //   {
      //     _id: "646c00a8108b584e00020e69",
      //     crypto_code: "bitcoin",
      //     crypto_amount: "0.12",
      //     money: "12625.19",
      //     user_id: "a1b2",
      //     action: "purchase",
      //     datetime: "2023-05-22T20:52:24.000Z",
      //   },
      //   {
      //     _id: "646c0272108b584e00020e82",
      //     crypto_code: "bitcoin",
      //     crypto_amount: "0.12",
      //     money: "755364.12",
      //     user_id: "a1b2",
      //     action: "purchase",
      //     datetime: "2023-05-22T21:01:41.000Z",
      //   },
      //   {
      //     _id: "646b85fa108b584e000207ec",
      //     crypto_code: "bitcoin",
      //     crypto_amount: "0.002",
      //     money: "12625.19",
      //     user_id: "a1b2",
      //     action: "purchase",
      //     datetime: "2023-05-22T12:06:41.000Z",
      //   },
      // ],
    };
  },
  created() {
    ProductsServices.getMyTransactions().then((response) => {
      console.log(response.data);
      //this.transactions = response.data;
    });
  },
  methods: {
    deleteTransaction(id) {
      const apiClientBd = axios.create({
        baseURL: "https://laboratorio3-f36a.restdb.io/rest",
        headers: {
          "x-apikey": "60eb09146661365596af552f",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      apiClientBd.delete(`/transactions/${id}`).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
