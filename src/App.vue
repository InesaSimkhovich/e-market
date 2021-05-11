<template>
  <div id="app">
    <VSpinner/>
    <notifications
      position="bottom right"
      animation-name="fade-notification" />

    <section>
      <VGoodsList />
      <div class="sticky">
        <VCurrencyRate />
        <VCart />
      </div>
    </section>

  </div>
</template>

<script>
import VSpinner from '@/components/VSpinner.vue';
import VGoodsList from '@/components/VGoodsList.vue';
import VCart from '@/components/VCart.vue';
import VCurrencyRate from '@/components/VCurrencyRate.vue';

const TIME_TO_REFRESH_DATA = 15000;

export default {
  name: 'app',
  components: {
    VSpinner,
    VGoodsList,
    VCart,
    VCurrencyRate,
  },
  data() {
    return {
      timerId: null,
    };
  },
  created() {
    this.timerId = setInterval(() => {
      this.$store.dispatch('getGoods');
    }, TIME_TO_REFRESH_DATA);
  },
  destroyed() {
    clearInterval(this.timerId);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
