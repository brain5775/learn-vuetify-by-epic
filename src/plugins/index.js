/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/store";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export function registerPlugins(app) {
  loadFonts();
  app
    .use(vuetify)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .component("VueDatePicker", VueDatePicker)
    .provide("axios", app.config.globalProperties.axios);
}
