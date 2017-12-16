export default {
  CONNECTION_STATE:(state,conn)=>{
    state.connState=conn
  },
  setConnected:(state,bool)=>{
    state.isConnected=bool;
  },
  addThumbnail: (state, obj) => {
    if (!obj) state.thumbnails=[];
    else{
    	if (state.thumbnails.indexOf(obj) === -1)
    	state.thumbnails.push(obj);
  	}
    
  },
  SOCKET_AUTOCOMPLETELIST:(state,list)=>{
    state.autoCompleteList=list;
  },
  SOCKET_LOGIN:(state,user)=>{
    localStorage.u = JSON.stringify(user);
    state.usr=user;
    //jscookie.set('t', user.token, { expires: 365 });
  },
};