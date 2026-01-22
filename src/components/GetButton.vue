<template>
  <button class="button" @click="addClick">{{ text }}</button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Props {
  text: any;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

const props = defineProps<Props>();

const emitChangeFn = defineEmits(["handler"]);
const addClick = () => {
  if (props.href) {
    const target = props.target || '_blank';
    
    if (target === '_self') {
      // Open in current window
      window.location.href = props.href;
    } else if (target === '_parent') {
      // Open in parent frame
      try {
        if (window.parent && window.parent !== window.self) {
          window.parent.location.href = props.href;
        } else {
          window.location.href = props.href;
        }
      } catch (e) {
        window.location.href = props.href;
      }
    } else if (target === '_top') {
      // Open in top-most frame
      try {
        if (window.top && window.top !== window.self) {
          window.top.location.href = props.href;
        } else {
          window.location.href = props.href;
        }
      } catch (e) {
        window.location.href = props.href;
      }
    } else {
      // Default: open in new tab
      window.open(props.href, '_blank');
    }
  } else {
    // Emit event for parent component handling
    emitChangeFn("handler", "我是子传父的 button传home");
  }
};

onMounted(() => {
  console.log("Button component mounted.");
});
</script>

<style scoped lang="scss">
$main-color: #01c19a;
.button {
  // box-shadow: 4px 4px 10px 0 rgba(146, 146, 146, 0.5);
  // box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
  // box-shadow: none !important;
  height: 50px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  padding: 1rem 1.7rem;
  background-color: $main-color;
  border-color: $main-color;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  border: none;
}
</style>
