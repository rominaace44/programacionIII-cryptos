<template>
  <div>
    <h1>Bienvenido</h1>
    <h2>Ingrese su usuario y contraseña</h2>
    <div class="flex">
      <input type="text" v-model="user" />
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
      console.log(this.user, this.password);
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
  },
};
</script>
<style scoped>
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
