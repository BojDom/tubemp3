import Emitter from './Emitter'
import {observe, observable, when} from 'mobx';
import {forEach} from 'lodash'
export default  class vso {
    constructor(connection,store){
        this.connection = connection;
        this.store = store;
        observe(Emitter.listeners,observed=>{
            //console.log(observed)
            if (observed.type==='add')
            connection.on(observed.name,data=>{
                Emitter.emit(observed.name,data)
            })
            else if (observed.type=='delete') {
                connection.off(observed.name)
            }
        })
    }
    install(Vue){

        if(!this.connection) throw new Error("[Vue-Socket.io] cannot locate connection")
        
        Vue.prototype.$authToken = observable.box({_id:false});
        Vue.prototype.$connState = observable.box("");
        Vue.prototype.$socket = this.connection;

        this.connection.on('authenticate',(s)=>{Vue.prototype.$authToken.set( this.connection.authToken );})
        
        observe(Vue.prototype.$authToken,data=>{
     if (!data.oldValue || !data.oldValue._id || !data.newValue || !data.newValue._id || data.newValue._id == data.oldValue._id) return;
            let newc = {}
            Emitter.channels.forEach((cs,_uid)=>{
                newc[_uid] = {}
                 forEach(cs,(c,cName)=>{
                     //console.log(this.connection.subscribe,this.connection.authToken._id)
                    newc[_uid][cName]  = this.connection.subscribe(`priv/${ this.connection.authToken._id}/${cName}`);
                    newc[_uid][cName].watch(c.watchers()[0])
                    c.unsubscribe();
                    c.unwatch();
                })
            })
            Emitter.channels.clear();
            Object.keys(newc).forEach(k=>Emitter.channels.set(k,newc[k]));
        })
        this.connection.on('disconnect',()=>{
            Vue.prototype.$authToken.set({});
        });
        if (this.store){
            Object.keys(this.store._mutations).forEach(k => {
                if (k.startsWith('SOCKET_')) {
                    Emitter.addListener(k.replace('SOCKET_',''),data=>{
                        this.store.commit(k.toUpperCase(),data)
                    },  {_uid:'store'})
                }
            });
            (['connect','error','disconnect','connecting','reconnect'])
            .forEach(ev=>{this.connection.on(ev,val=>{
                //console.log('connState change',ev)
                Vue.prototype.$connState.set(ev);
                this.store.commit('SET_CONNECTION_STATE',ev)
            })})
        }


        Vue.mixin({
            created(){
                let sockets = this.$options['sockets'];

                if(sockets){
                    Object.keys(sockets).forEach( async (key) => {
                        if (key.startsWith('channel_')){
                            await when(()=>this.$authToken.get()._id && this.$connState.get()=='connect');
                            let id = this.$authToken.get()._id;
                            let name = key.replace('channel_','');
                            Emitter.channels.has(this._uid) || Emitter.channels.set(this._uid,{});
                            let c = Emitter.channels.get(this._uid);
                            c[name] = this.$socket.subscribe(`priv/${id}/${name}`);
                            c[name].watch(data=>sockets[key].call(this,data));
                        }
                        else Emitter.addListener(key, sockets[key],  this)
                    });
                }
            },
            beforeDestroy(){
                let sockets = this.$options['sockets']

                if(sockets){
                    Emitter.removeListeners(this);
                    let c = Emitter.channels.get(this._uid);
                    if (!c) return;
                    Object.keys(c).forEach(name=>{
                        //c[name].unsubscribe()
                        c[name].unwatch(sockets[name]);
                        (c[name].watchers()).length < 1 && c[name].unsubscribe();
                    })
                }
                
            }
        })

    }

}



