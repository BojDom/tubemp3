import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en.js";
import it from "./it.js";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "en-US",
  messages: {
    "en": en,
    "it": it
  }
});
