export default {
  CONNECTION_STATE:(state,conn)=>{
    state.connState=conn
  },
  setConnected:(state,bool)=>{
    state.isConnected=bool;
  },
  setBadgeVal: (state,val)=>{
    state.badgeVal = val
  },
  activateAudio: (state,val)=>{
    state.activeAudio = val;
  },
  addThumbnail: (state, obj) => {
    if (!obj) state.thumbnails=[];
    else{
    	if (state.thumbnails.indexOf(obj) === -1)
    	state.thumbnails.push(obj);
  	}
    
  },
  SOCKET_AUTOCOMPLETELIST:(state,list)=>{
    console.log('autoCompleteList',list)
    state.autoCompleteList=list;
  },
  SOCKET_LOGIN:(state,user)=>{
    state.usr=user;
    //delete user.fbUrl;
    localStorage.u = JSON.stringify(user);

    //jscookie.set('t', user.token, { expires: 365 });
  },
  LOCALSTORAGE_LOGIN:(state)=>{
    try { if (!localStorage) return; state.usr =  {...JSON.parse(localStorage.u),fbUrl:null}; } catch (err) { console.log(err); }
  }
};