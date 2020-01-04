
import {observable} from 'mobx';
export default new class  {
    constructor() {
        this.listeners = observable.map(null,{deep:false,name:'listeners'});
        this.channels = observable.map(null,{deep:false,name:'channels'})
    }

    addListener(label, callback, vm) {
        this.listeners.has(label) || this.listeners.set(label,[])
        this.listeners.get(label).push({callback, vm});
    }

    removeListeners(vm) {
        this.listeners.toJS().forEach((ev,k)=>{
            //remove(ev,e=>e.vm._uid===vm._uid)
            if (!ev.length) this.listeners.delete(k)
        })
    }

    emit(label, data) {
        let listeners = this.listeners.get(label);
        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener.callback.call(listener.vm,data)
            });
            return true;
        }
        return false;
    }

}
