<template>
  <div class="container">
    <h1>Bienvenido a tu billetera virtual</h1>
    <p>Una manera facil de invertir...</p>
    <h4>Ingrese su usuario y contraseña</h4>
    <div class="flex">
      <input type="email" v-model="user" @keyup="validation" />
      <input type="password" v-model="password" />
      <input type="submit" @click="sentUser" />
    </div>
    <p v-if="message">{{ this.message }}</p>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      password: "",
      userA: "rominaace44@gmail.com",
      passwordA: "a1b2",
      message: null,
    };
  },
  methods: {
    sentUser() {
      //console.log(this.user, this.password);
      localStorage.clear();

      if (this.user === this.userA && this.password === this.passwordA) {
        this.message = null;
        localStorage.setItem("user", this.user);
        localStorage.setItem("password", this.password);
        this.$router.push("coins");
      }
      if (this.user === this.userA && this.password !== this.passwordA) {
        this.message = "La contraseña no es correcta";
      }
      if (this.password === this.passwordA && this.user !== this.userA) {
        this.message = "el ususario no corresponde";
      }
    },
    validation() {
      let validationEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      if (!validationEmail.test(this.user)) {
        this.message = "debe escribir un email valido!!!!";
      } else {
        this.message = "";
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
</style>
