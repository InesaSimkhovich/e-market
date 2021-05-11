<template>
  <div>
    <button
      class="btn-cart"
      @click="isCartShow = !isCartShow">
      {{ btnName }}
    </button>

    <transition name="slide-fade">
      <div v-if="isCartShow">
        <template v-if="cartList.length === 0">
          Корзина пустая
        </template>

        <template v-else>
          <VContainer>
            <template slot="containerHeader">
              Корзина товаров
            </template>

            <template slot="containerItems">
              <VCartItem
                v-for="(item, index) in cartList"
                :key="item.id"
                :item="item"
                @deleteFromCart="deleteFromCart(index)"
                @changeQuantity="calculateAmount"/>
            </template>
          </VContainer>
          <div>Общая стоимость:
            <span class="total-amount">{{ totalAmountRuble | toFixed }} ₽</span>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import VContainer from './VContainer.vue';
import VCartItem from './VCartItem.vue';

export default {
  name: 'TheCart',
  components: {
    VContainer,
    VCartItem,
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
    currentRate() {
      return this.$store.state.currentRate;
    },
    btnName() {
      return this.isCartShow ? 'Скрыть корзину' : 'Раскрыть корзину';
    },
  },
  watch: {
    cartList: {
      handler: 'calculateAmount',
    },
    currentRate(value) {
      if (value) {
        this.calculateAmount();
      }
    },
  },
  data() {
    return {
      isCartShow: false,
      totalAmountRuble: 0,
    };
  },
  created() {
    this.calculateAmount();
  },
  methods: {
    calculateAmount() {
      const initialValue = 0;
      const totalAmountDollar = this.cartList.reduce(
        (accumulator, currentValue) => accumulator
          + currentValue.priceInDollars * (currentValue.quantityToOrder || 1),
        initialValue,
      );
      this.totalAmountRuble = totalAmountDollar * this.$store.state.currentRate;
    },
    deleteFromCart(index) {
      this.$store.dispatch('deleteFromCart', index);
    },
  },
};
</script>

<style scoped>
  .total-amount {
    color: var(--primary);
    font-weight: 700;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.4s ease-in-out;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
</style>
