<template>
  <div class="preloader" :style="cssVars">
    <span class="rot-1"></span>
    <span class="rot-2"></span>
    <span class="rot-3"></span>
    <span class="rot-4"></span>
    <span class="rot-5"></span>
    <span class="rot-6"></span>
    <span class="rot-7"></span>
    <span class="rot-8"></span>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    color: {
      type: String,
      default: '#008ca4',
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    cssVars() {
      return {
        '--color': this.color,
        '--scale': this.scale,
      }
    }
  }
}
</script>

<style scoped>
.preloader {
  position: relative;
  width: 100px;
  height: 100px;
  margin: auto;
  transform: scale(var(--scale));
}
.preloader > span {
  position: absolute;
  background-color: transparent;
  height: 22px;
  width: 22px;
  border-radius: 12px;
  animation-name: f_fadeG;
  animation-duration: 1.0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
}
.rot-1 {
  left: 0;
  top: 40px;
  animation-delay: 0.45s;
}
.rot-2 {
  left: 10px;
  top: 10px;
  animation-delay: 0.6s;
}
.rot-3 {
  left: 40px;
  top: 0;
  animation-delay: 0.75s;
}
.rot-4 {
  right: 10px;
  top: 10px;
  animation-delay: 0.9s;
}
.rot-5 {
  right: 0;
  top: 40px;
  animation-delay: 1.05s;
}
.rot-6 {
  right: 10px;
  bottom: 10px;
  animation-delay: 1.0s;
}
.rot-7 {
  left: 40px;
  bottom: 0;
  animation-delay: 1.35s;
}
.rot-8 {
  left: 10px;
  bottom: 10px;
  animation-delay: 1.5s;
}
@keyframes f_fadeG {
  0% {
    background-color: var(--color);
  }
  100% {
    background-color: transparent;
  }
}
</style>