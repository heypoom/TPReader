import Vue from "vue"

import App from "@/components/App"
import router from "./routes"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App />",
  components: {App}
})
