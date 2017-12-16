<template>
<div>
    DISCONNESSO
</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    name:'disconnected',
    computed:{
        ...mapState(['connected'])
    },
    watch:{
        "connected":function(bool){
            if (bool) this.$router.go(-1);
        }
    }
}
</script>