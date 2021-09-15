<template>
  <div class="check-button" :class="{check:isChecked}" @click="checkClick">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },

  },
  methods: {
    checkClick() {
      this.$emit('checkClick')
    },
  },
}
</script>

<style scoped>

.check-button {
  border-radius: 50%;

  border: 2px solid #aaa;
}

.check {
  border-color: red;
  background-color: red;
}

</style>
