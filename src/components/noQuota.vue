<template>
<div id="noQuota f fc">
    ciao
</div>
</template>
<script>
export default {
    name:"noQuota"

}
</script>
<style lang="less">

@theme: "../less/themes/dev";
@import "@{theme}";
#noQuota {
    width:100vw;
    height: 100vh;
    position: absolute;
    top:0;left:0;
    z-index: 999;
    background:fadeOut(@color1,20%);
}
</style>