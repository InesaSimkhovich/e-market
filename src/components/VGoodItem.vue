<template>
    <div class="good-item">
      <div class="name-column">{{ item.name }}</div>

      <div class="quantity-column">{{ item.quantityRemain }} шт.</div>

      <div
        class="price-column"
        :class="{ 'expensive': isMoreExpensive,
                  'cheaper': isCheaper }">
        {{ item.priceInRubles  | toFixed }} ₽
      </div>

      <div class="cart-column">
        <button @click="addItemToCart(item)">Добавить</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'GoodItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMoreExpensive: false,
      isCheaper: false,
    };
  },
  watch: {
    currentRate(value, oldValue) {
      if (oldValue) {
        this.isMoreExpensive = value > oldValue;
        this.isCheaper = value < oldValue;
      }
    },
  },
  computed: {
    currentRate() {
      return this.$store.state.currentRate;
    },
  },
  methods: {
    addItemToCart(item) {
      this.$store.dispatch('addToCart', item);
    },
  },
};
</script>

<style scoped>
  .expensive {
    background: #c10202ad;
  }

  .cheaper {
    background: #40d640;
  }
</style>
