<template>

<div>
    <div class="fb-root"></div>
    <div class="fb-login-button" data-max-rows="1" data-size="large"
    data-show-faces="true"
    data-auto-logout-link="false" data-use-continue-as="false"></div>

    </div>

</template>
<script>
export default {

    mounted(){
     //  this.loadButton(document,'script','facebook-jssdk');
    },
    methods:{
            loadButton(d,s,id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.9&appId=686186628184265";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }
}
</script>
<style>

</style>