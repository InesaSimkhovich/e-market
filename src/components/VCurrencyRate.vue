<template>
  <div class="currency-rate">
    <p v-if="isShowOldRate">
      Старый курс: 1 $ = <b>{{ oldRate }}</b> ₽
    </p>

    <p v-if="currentRate > 0">
      Текущий курс: 1 $ = <b>{{ currentRate }}</b> ₽
      <template v-if="isShowOldRate">({{ arrow }})</template>
    </p>
  </div>
</template>

<script>
export default {
  name: 'VCurrencyRate',
  data() {
    return {
      oldRate: 0,
    };
  },
  watch: {
    currentRate(value, oldValue) {
      if (oldValue) {
        this.oldRate = oldValue;
      }
    },
  },
  computed: {
    currentRate() {
      return this.$store.state.currentRate;
    },
    isShowOldRate() {
      return this.oldRate > 0;
    },
    arrow() {
      return this.currentRate > this.oldRate ? '↑' : '↓';
    },
  },
};
</script>

<style scoped>
  .currency-rate {
    background: #b6b7b7;
    border-radius: 16px;
    margin-bottom: 16px;
    padding: 10px 0;
  }
</style>
