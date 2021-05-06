<template>
  <div id="app">
    <VSpinner/>

    <section>
      <VGoodsList
        :deletedItemId="deletedItemId"
        @addItemToCart="addItemToCart"/>
      <div class="sticky">
        <VCurrencyRate/>
        <VCart
          :listItems="listItems"
          @deleteFromCart="setDeletedItemId"/>
      </div>
    </section>

  </div>
</template>

<script>
import VSpinner from '@/components/VSpinner.vue';
import VGoodsList from '@/components/VGoodsList.vue';
import VCart from '@/components/VCart.vue';
import VCurrencyRate from '@/components/VCurrencyRate.vue';

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
      listItems: [],
      deletedItemId: null,
    };
  },
  methods: {
    addItemToCart(item) {
      this.listItems.push(item);
    },
    setDeletedItemId(item) {
      this.deletedItemId = item.T;
    },
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
