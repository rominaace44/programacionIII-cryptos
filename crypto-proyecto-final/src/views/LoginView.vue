<template>
  <div class="container">
    <h1>Bienvenido a tu billetera virtual</h1>
    <p>Una manera facil de invertir...</p>
    <h4>Ingrese su usuario y contraseña</h4>
    <div class="flex">
      <div>
        <input type="email" v-model="user" @keyup="validation" />
        <input type="password" v-model="password" />
      </div>

      <input type="submit" @click="sentUser" value="Ingresar" />
      <input type="submit" @click="setModal" value="Crear Usuario" />
    </div>
    <p v-if="message">{{ this.message }}</p>
    <!-- MODAL PARA CREAR USUARIO -->
    <div v-if="modalUsuario" class="modalCrear">
      <p>Ingresa su usuario y contraseña</p>
      <input type="email" v-model="userCreate" @keyup="validation" />
      <input type="password" v-model="passwordCreate" />
      <p v-if="this.messageCreate">{{ this.messageCreate }}</p>
      <input type="submit" @click="sentUserCreate" value="Ingresar" />
      <input type="submit" @click="setModal" value="Cerrar" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      password: "",
      userCreate: "",
      passwordCreate: "",
      userA: localStorage.getItem("user"),
      passwordA: localStorage.getItem("password"),
      message: null,
      modalUsuario: false,
      messageCreate: "",
    };
  },
  methods: {
    sentUser() {
      //console.log(this.user, this.password);
      if (!this.user || !this.password) {
        this.message =
          "ingrese los datos correctos o cree su usuario y contraseña";
      }
      if (this.user == this.userA && this.password == this.passwordA) {
        this.message = null;
        // localStorage.setItem("user", this.user);
        // localStorage.setItem("password", this.password);
        this.$router.push("coins");
      }
      if (this.user === this.userA && this.password !== this.passwordA) {
        this.message = "La contraseña no es correcta";
      }
      if (this.password === this.passwordA && this.user !== this.userA) {
        this.message = "el ususario no corresponde";
      }
    },
    setModal() {
      this.modalUsuario = !this.modalUsuario;
    },
    sentUserCreate() {
      localStorage.setItem("user", this.userCreate);
      localStorage.setItem("password", this.passwordCreate);
      this.userA = localStorage.getItem("user");
      this.passwordA = localStorage.getItem("password");
      this.messageCreate = "Usuario creado, ya puede ingresar al portal!";
      this.userCreate = "";
      this.passwordCreate = "";
    },
    validation() {
      let validationEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      if (!validationEmail.test(this.userCreate)) {
        this.messageCreate = "debe escribir un email valido!!!!";
      } else {
        this.messageCreate = "";
      }
    },
  },
};
</script>
<style scoped>
.container {
  height: 80vh;
  padding-top: 10rem;
}
.flex {
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
  height: auto;
}
.flex input {
  height: 50px;
  width: 30%;
  margin: auto;
  margin-bottom: 2rem;
  border-radius: 10px;
}
.modalCrear {
  position: absolute;
  top: 20rem;
  left: 45rem;
  height: 30rem;
  width: 30rem;
  background: white;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.modalCrear input {
  height: 50px;
  width: 50%;
  margin: auto;
  margin-bottom: 2rem;
  border-radius: 10px;
}
</style>
