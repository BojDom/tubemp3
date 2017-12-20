import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en.js";
import it from "./it.js";

Vue.use(VueI18n);
var messages = {
	"en-US": en,
	"it-IT": it
}

export function createI18n(lang) {
	var locale = (Object.keys(messages).indexOf(lang) > -1) ? lang : 'en-US';
	return new VueI18n({
		locale: locale,
		messages: messages
	})
}