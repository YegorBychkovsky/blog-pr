<template>
  <div class="dialog" v-if="show" @click="hideDialogWindow">
    <div @click.stop class="dialog__content"><slot></slot></div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  name: 'my-dialog',
  mixins: [toggleMixin],
};
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  width: 100%;
}
.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
}
</style>
