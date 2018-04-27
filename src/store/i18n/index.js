import Vue from "vue";
import VueI18n from "vue-i18n";
import it from "./it.js";

function getLang(l){
	let obj={}
	Object.keys(it).map(k=>{
		obj[k]= it[k][l]
	})
	return obj
}
Vue.use(VueI18n);
var messages = {
	"en":  getLang('en'),
	"it": getLang('it')
}
console.log('m',messages)
export function createI18n(lang) {
	var locale = (Object.keys(messages).indexOf(lang) > -1) ? lang : 'en';
	return new VueI18n({
		locale: locale,
		messages: messages
	})
}