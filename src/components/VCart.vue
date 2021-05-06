<template>
  <div>
    <button
      class="btn-cart"
      @click="isCartVisible = !isCartVisible">
      {{ btnName }}
    </button>

    <transition name="slide-fade">
      <div v-if="isCartVisible">
        <template v-if="listItems.length === 0">
          Корзина пустая
        </template>

        <template v-else>
          <VContainer>
            <template slot="containerHeader">
              Корзина товаров
            </template>

            <template slot="containerItems">
              <VCartItem
                v-for="item in listItems"
                :key="item.T"
                :item="item"
                @deleteFromCart="deleteFromCart"
                @markChangedItem="markChangedItems"/>
            </template>
          </VContainer>
          <div>Общая стоимость: <span class="total-amount">{{ totalAmountRuble }} ₽</span></div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import Formatter from '@/utils/formatter';
import VContainer from './VContainer.vue';
import VCartItem from './VCartItem.vue';

export default {
  name: 'TheCart',
  components: {
    VContainer,
    VCartItem,
  },
  props: {
    listItems: {
      type: Array,
    },
  },
  computed: {
    currentRate() {
      return this.$store.state.currentRate;
    },
    btnName() {
      return this.isCartVisible ? 'Скрыть корзину' : 'Раскрыть корзину';
    },
  },
  watch: {
    listItems: {
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
      isCartVisible: false,
      totalAmountRuble: 0,
      changedItemsByQuantity: [],
    };
  },
  methods: {
    markChangedItems(changedItem) {
      const index = this.changedItemsByQuantity.findIndex(item => item.id === changedItem.id);
      if (index === -1) {
        this.changedItemsByQuantity.push(changedItem);
      } else {
        this.changedItemsByQuantity[index] = changedItem;
      }

      this.calculateAmount();
    },
    calculateAmount() {
      const initialValue = 0;
      let totalAmountDollar = this.listItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.C,
        initialValue,
      );

      if (this.changedItemsByQuantity && this.changedItemsByQuantity.length > 0) {
        this.listItems.forEach((item) => {
          this.changedItemsByQuantity.forEach((changedItem) => {
            if (item.T === changedItem.id) {
              totalAmountDollar += item.C * (changedItem.quantity - 1);
            }
          });
        });
      }

      this.totalAmountRuble = Formatter.convertDollarToRuble(totalAmountDollar,
        this.$store.state.currentRate);
    },
    deleteFromCart(item) {
      this.$emit('deleteFromCart', item);
      const index = this.listItems.findIndex(listItem => listItem.T === item.T);
      this.listItems.splice(index, 1);
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
