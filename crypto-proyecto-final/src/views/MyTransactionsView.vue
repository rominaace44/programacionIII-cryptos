<template>
  <div class="container">
    <h1>Mis operaciones...</h1>
    <!--TABLA DE TODAS LAS TRANSACCIONES-->
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Moneda</th>
          <th scope="col">Operación</th>
          <th scope="col">Fecha</th>
          <th scope="col">Monto</th>
          <th scope="col">Importe</th>
          <th>Mas...</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction._id">
          <th>{{ transaction.crypto_code }}</th>
          <th>{{ transaction.action === "purchase" ? "compra" : "venta" }}</th>

          <th>{{ new Date(transaction.datetime).toLocaleDateString() }}</th>

          <th>{{ transaction.crypto_amount }}</th>
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
                <li>
                  <a
                    class="dropdown-item"
                    @click="
                      editTransaction(transaction.crypto_code, transaction._id)
                    "
                    >Editar
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="deleteTransaction(transaction._id)"
                    >Borrar</a
                  >
                </li>
              </ul>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
    <div v-if="modal" class="formulario">
      <label for="cantidad"> ingrese cantidad</label>
      <input
        type="number"
        name=""
        id="cantidad"
        v-model="this.cantidadCoin"
        v-on:keyup="asd"
      />
      <p v-if="message" class="error">{{ this.message }}</p>
      <label for="tipo"> seleccione operacion</label>

      <select name="tipo" id="tipo" v-model="this.action">
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
      <h1>total de la operacion:$ {{ this.total }}</h1>
      <div>
        <input
          class="boton"
          type="button"
          value="Operar"
          @click="sentEdit(this.selectTransaction)"
        />
      </div>
    </div>
    <!--TABLA DE INVERSIONES-->
    <h1>Mis Inversiones...</h1>

    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Moneda</th>
          <th scope="col">Monto</th>
          <th scope="col">Importe en $</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inversion in inversiones" :key="inversion._id">
          <th>{{ inversion.crypto_code }}</th>
          <th>{{ inversion.crypto_amount }}</th>
          <th>${{ inversion.valorActual }}</th>
        </tr>
        <tr>
          <th>TOTAL</th>
          <th></th>
          <th>${{ this.totalInversion() }}</th>
        </tr>
      </tbody>
    </table>
    <!--TABLA DE ANALISIS DE INVERSIONES-->
    <h1>Análisis de inversiones...</h1>

    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Moneda</th>
          <th scope="col">Ganancia/perdida</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inversion in inversiones" :key="inversion._id">
          <th>{{ inversion.crypto_code }}</th>
          <th>${{ inversion.analisis }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import ProductsServices from "@/services/ProductsServices.js";

export default {
  name: "MyTransactionsView",
  data() {
    return {
      operaciones: [
        { name: "compra", value: "purchase" },
        { name: "venta", value: "sale" },
      ],
      message: "",
      transactions: null,
      user: localStorage.getItem("password"),
      selectTransaction: null,
      modal: false,
      valor_coin: null,
      cantidadCoin: null,
      action: null,
      total: null,
      //para detalle de inversiones
      inversiones: [],
    };
  },
  created() {
    this.getTransaction();
  },
  methods: {
    asd() {
      this.message = "";
      let totalOperacion = this.cantidadCoin * this.valor_coin;
      this.total = totalOperacion.toFixed(2);
    },
    deleteTransaction(id) {
      ProductsServices.deleteTransaction(id).then((response) => {
        if (response.data.status === 200) {
          this.getTransaction();
        }
      });
    },
    editTransaction(coin, id) {
      //obtengo detalle de la moneda
      this.selectTransaction = id;
      ProductsServices.getCoinDetails(coin).then((response) => {
        this.valor_coin = response.data[0].current_price;
        console.log(this.valor_coin, "valor de la moneda");

        this.modal = true;
      });
    },
    getTransaction() {
      ProductsServices.getMyTransactions(this.user).then((response) => {
        console.log(response.data, "soy todas las transactiones");
        this.transactions = response.data;

        this.transactions.map((item) => {
          let existe = false;
          let indice = undefined;
          this.inversiones.map((element, index) => {
            if (element.crypto_code === item.crypto_code) {
              existe = true;
              indice = index;
            }
          });
          if (existe) {
            this.inversiones[indice] = {
              crypto_code: item.crypto_code,
              crypto_amount:
                item.action === "purchase"
                  ? this.inversiones[indice].crypto_amount +
                    Number.parseFloat(item.crypto_amount)
                  : this.inversiones[indice].crypto_amount +
                    Number.parseFloat(item.crypto_amount * -1),
              money:
                item.action === "purchase"
                  ? this.inversiones[indice].money +
                    Number.parseFloat(item.money)
                  : this.inversiones[indice].money +
                    Number.parseFloat(item.money * -1),
            };
          } else {
            this.inversiones.push({
              crypto_code: item.crypto_code,
              crypto_amount:
                item.action === "purchase"
                  ? Number.parseFloat(item.crypto_amount)
                  : Number.parseFloat(item.crypto_amount * -1),
              money:
                item.action === "purchase"
                  ? Number.parseFloat(item.money)
                  : Number.parseFloat(item.money * -1),
            });
          }
        });
        this.inversiones.map((item) => {
          ProductsServices.getCoinDetails(item.crypto_code).then((response) => {
            //console.log(response.data[0].current_price);
            item.valorActual =
              item.crypto_amount * response.data[0].current_price;
            item.analisis = (item.valorActual - item.money).toFixed(2);
            console.log(item.valorActual, "valores actuales");
            console.log(item.analisis, "analisis de ganancias o perdidas");
          });
        });
        console.log(this.inversiones);
        // console.log(this.purchase, "soy todas las compras");
      });
    },
    sentEdit() {
      if (this.cantidadCoin <= 0) {
        this.message = "Debe ingresar un valor para continuar";
      }
      if (this.action === "") {
        this.message = "Debe seleccionar una operación para continuar";
      } else {
        let edit = {
          crypto_amount: this.cantidadCoin.toString(),
          money: this.total,
          action: this.action,
        };
        ProductsServices.setEditTransaction(this.selectTransaction, edit).then(
          (response) => {
            console.log(response.data);
            this.cantidadCoin = "";
            this.action = "";
            this.total = "";
            this.modal = false;
            this.messagefinal = "Cambios guardados!";
            this.getTransaction();
          }
        );
        console.log(edit, "datos editados");
      }
    },
    totalInversion() {
      let total = 0;
      this.inversiones.map((item) => {
        total += item.valorActual;
      });
      return total.toFixed(2);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
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
.boton {
  background-color: blue;
  color: white;
  height: 50px;
  width: 120px;
  border-radius: 10px;
  cursor: pointer;
  border-style: none;
}
</style>
