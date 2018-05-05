<template>

<div>

<div v-if="spinner">
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>
<div v-else>
    <div class="blob blob-0"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
    <div class="blob blob-5"></div>

</div>
</div>
</template>

<script>
export default {
  data:function(){
    return {}
  },
  props:{
    spinner:{
      type:Boolean,
      default:false
    }
  }
}
</script>
<style scoped>


.blob {
    width: 2rem;
    height: 2rem;
    background: rgba(230, 230, 230, 0.85);
    border-radius: 50%;
    position: absolute;
    left: calc(50% - 1rem);
    top: calc(50% - 1rem);
    box-shadow: 0 0 1rem rgba(255, 255, 255, 0.25);
}

.blob-2 {
    animation: animate-to-2 1.5s infinite;
}

.blob-3 {
    animation: animate-to-3 1.5s infinite;
}

.blob-1 {
    animation: animate-to-1 1.5s infinite;
}

.blob-4 {
    animation: animate-to-4 1.5s infinite;
}

.blob-0 {
    animation: animate-to-0 1.5s infinite;
}

.blob-5 {
    animation: animate-to-5 1.5s infinite;
}

@keyframes animate-to-2 {
    25%,
    75% {
        transform: translateX(-1.5rem) scale(0.75);
    }
    95% {
        transform: translateX(0rem) scale(1);
    }
}

@keyframes animate-to-3 {
    25%,
    75% {
        transform: translateX(1.5rem) scale(0.75);
    }
    95% {
        transform: translateX(0rem) scale(1);
    }
}

@keyframes animate-to-1 {
    25% {
        transform: translateX(-1.5rem) scale(0.75);
    }
    50%,
    75% {
        transform: translateX(-4.5rem) scale(0.6);
    }
    95% {
        transform: translateX(0rem) scale(1);
    }
}

@keyframes animate-to-4 {
    25% {
        transform: translateX(1.5rem) scale(0.75);
    }
    50%,
    75% {
        transform: translateX(4.5rem) scale(0.6);
    }
    95% {
        transform: translateX(0rem) scale(1);
    }
}

@keyframes animate-to-0 {
    25% {
        transform: translateX(-1.5rem) scale(0.75);
    }
    50% {
        transform: translateX(-4.5rem) scale(0.6);
    }
    75% {
        transform: translateX(-7.5rem) scale(0.5);
    }
    95% {
        transform: translateX(0rem) scale(1);
    }
}

@keyframes animate-to-5 {
    25% {
        transform: translateX(1.5rem) scale(0.75);
    }
    50% {
        transform: translateX(4.5rem) scale(0.6);
    }
    75% {
        transform: translateX(7.5rem) scale(0.5);
    }
    95% {
        transform: translateX(0rem) scale(1);
    }
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>