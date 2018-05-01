<template>
<div id="profile">
    <div id="slb" class="f fc ja" v-if="usr.fbUrl">
    <button class="loginBtn loginBtn--facebook"  @click="fbLog()">
        {{$t('login_with_facebook')}}
    </button>
    </div>
    <div id="plist" class="f fc">
      <div id="select_view" class="f ja">
          <div class="f fc" :class="{selected:viewStyle=='periodic'}" @click="viewStyle = 'periodic'"><i class="mdi mdi-history"></i><i>{{$t('history')}}</i></div>
          <div class="f fc" :class="{selected:viewStyle=='friends'}" @click="viewStyle = 'friends'"><i class="mdi mdi-account-group"></i><i>{{$t('following')}}</i></div>
          <div class="f fc" :class="{selected:viewStyle=='me'}" @click="viewStyle = 'me'"><i class="mdi mdi-account"></i><i>{{$t('me')}}</i></div>
      </div>
        <ul class="period_list" v-for="(p,k) in period" v-if="viewStyle=='periodic'">
            <li class="delimiter">{{$t(k)}}</li>
            <li v-for="v in orderByTime(p)">
              <thumb-video :key="v._id" :v="v" w="280px"></thumb-video>
            </li>           
        </ul>
    </div>
</div>
</template>
<script>
import {mapState} from 'vuex';
import { Observable } from 'rx-lite';
import moment from 'moment'
import orderBy from 'lodash.orderby'
import thumbVideo from '../components/video';
export default {
    name:'profile',
    components:{
      'thumb-video':thumbVideo,
    },
    computed:{
        ...mapState(['isConnected','usr']),
        period:function(){
            var now = moment();
            let obj = {}
            let whenAgo = (diff,n)=>{
                if (!n) n = 0;

                if (n > Object.keys(this.periods).length) return false;
                let p = this.periods[ Object.keys(this.periods)[n] ];
                return (diff < p) ? Object.keys(this.periods)[n] : whenAgo(diff,n+1)
            }

            Object.keys(this.plist).reverse().map(a=>{
                var diff = now - this.plist[a].time 
                let wa = whenAgo(diff);

                if (!wa) return;
                if (!obj[wa]) obj[wa]={} 
                obj[wa][a] = this.plist[a]
             })
            return obj
        }
    },
    data(){
        return {
            popup:null,
            plist:{},
            viewStyle:'periodic',
            subs:{

            },
            periods:{
                "today":moment(0).add(1,'days').diff(moment(0)),
                "yesterday":moment(0).add(2,'days').diff(moment(0)),
                "thisWeek":moment(0).add(7,'days').diff(moment(0)),
                "thisMonth":moment(0).add(30,'days').diff(moment(0)),
                }
        }
    },
    methods:{
    	j:function(s){
    		return JSON.stringify(s)
    	},
      fetchPlist:function(){
          this.$socket.emit('query',{query:'plist'},(err,data)=>{
              console.log('resp',data)
              this.plist=data;
          })        
      },
      orderByTime:function(obj){
        return orderBy(obj, 'time','desc')
      },
        fbLog(){
             this.popup=window.open(this.usr.fbUrl);
        },
        subscribeTo:function(){
                if (typeof this.usr.id!=='string') return;
                this.subs.fbClose = this.$socket.subscribe('priv/'+this.usr.id+'/fbPopClose')
                this.subs.fbClose.on('subscribeFail',function(er,cn){
                    console.log('fail subscribing',cn,er)
                })

                this.subs.fbClose.on('subscribe',function(er){
                    console.log('fail OK',er)
                })
                this.subs.fbClose.watch(d=>{
                    try {this.popup.close()}catch(r){console.log(r)}
                })
                this.subs.fbLog = this.$socket.subscribe('priv/'+this.usr.id+'/fblogin')
                this.subs.fbLog.watch(tok=>{
                    this.$socket.emit('log',tok)
                })
        }
    },
    beforeMount() {
            this.plist = JSON.parse(window.localStorage.plist || '{}');
    },
    mounted(){
        this.fetchPlist()
        this.subscribeTo()

    },
    beforeDestroy(){
        this.$socket.unsubscribe(this.$socket.id+'/fbPopClose')     
    },
    watch:{
        "usr.id":function(n,o){
             this.$socket.unsubscribe('priv/'+o+'/fbPopClose')
             this.subscribeTo();
             this.fetchPlist()
        }
    }
}
</script>
<style scoped lang="less">
#profile {
}
#plist {width: 320px;}
#slb {
    height: 120px;
}
/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 40px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
  text-transform: capitalize;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 8px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 8px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
#select_view {
  padding:10px 10%;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  width: 100%;
  margin: 15px auto;
  box-sizing: border-box;
  line-height: 1rem;
  div {
    border-right: 1px solid white;
    flex-grow: 1;
    width: 0;
    &:last-child {border: none;}
    &:hover i,&.selected i {
        color:hsl(200,100%,50%)
      }
    & i:first-child {
      font-size: 22px;
    }
    i {  transition: color .3s linear; }
  }

}
ul {
  list-style: none;
  padding: 0 10%;
  &,li {margin: 0;}
}
.period_list {
    .delimiter {
      padding: 4px 10px;
      margin-top:   16px;
      border-radius: 4px;
      background: linear-gradient(30deg, hsl(200,20%,97%) 0%,hsl(200,21%,92%) 40%,hsl(205,18%,87%) 31%,hsla(210,25%,97%,10%) 80%,hsla(210,25%,97%,0%) 100%);
      color:#333;
      text-transform: capitalize;
    }
}

</style>