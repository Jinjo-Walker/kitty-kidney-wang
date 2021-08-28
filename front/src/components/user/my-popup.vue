<template>
  <van-popup
    v-model="popShow"
    closeable
    close-icon="close"
    v-bind="$attrs"
  >
    <slot />
  </van-popup>
</template>

<script>
  export default {
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      popShow:{
        get(){
          return this.show;
        },
        set(val){
          this.$emit('update:show',val);
        }
      }
    }
  }
</script>
