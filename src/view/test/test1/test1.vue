<template>
  <div>
    <div style="height: 40vh;background: #f7f7f7;"></div>
    <div class="box">11</div>
    <div class="box2">222</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.fromTo(".box", {
    opacity: 1,
  }, {
    scrollTrigger: {
      trigger: ".box",
      start: "top center",
      end: "bottom center",
      scrub: true,
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    duration: 2
  });

  gsap.fromTo(".box2", {
    opacity: 1,
  }, {
    scrollTrigger: {
      trigger: ".box2",
      start: "top center",
      end: "bottom center",
      scrub: true,
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    duration: 2
  });
})
</script>

<style scoped>
.box,
.box2 {
  width: 100%;
  height: 30vh;
  background-color: pink;
  margin-bottom: 200px;
}
.box2 {
  background-color: skyblue;
}
</style>