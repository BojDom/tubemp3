export default {
  isConnected:state=>{
    console.log('getter isConn',state.connState)
    return (['connect','connected','reconnect']).includes(state.connState)
  },
  screenSize:state=>{
    switch(true) {
      case (state.screen.w<520): return 'm';
      case (state.screen.w<950): return 't';
      default: return 'd';
    }
  },
}
