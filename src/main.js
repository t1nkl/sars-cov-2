import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins";
import "./services";
import api from "./mixins/api";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.config.silent = process.env.NODE_ENV !== "production";

Vue.mixin(api);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
