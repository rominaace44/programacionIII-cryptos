import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClientBd = axios.create({
  baseURL: "https://labor3-d60e.restdb.io/rest/",
  headers: {
    "x-apikey": " d9002945094e72b41fbcfa71d2bcd0f4a540b",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default {
  // getProducts() {
  //   return apiClient.get("/products");
  // },

  getCoins() {
    return apiClient.get(
      "/markets?vs_currency=ars&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
  },
  getCoinDetails(id) {
    return apiClient.get(
      `/markets?vs_currency=ars&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
    );
  },
  sentData(datos) {
    return apiClientBd.post("/transactions", datos);
  },
  getMyTransactions(user) {
    // let asd = localStorage.getItem("password");
    console.log(user);
    return apiClientBd.get(`/transactions?q={"user_id":"${user}"}`);
  },
  deleteTransaction(id) {
    return apiClientBd.delete(`/transactions/${id}`);
  },
  setEditTransaction(id, datos) {
    return apiClientBd.patch(`/transactions/${id}`, datos);
  },
};
