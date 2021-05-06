<template>
    <div class="good-item">
      <div class="name-column">{{ getGoodName(item) }}</div>

      <div class="quantity-column">{{ item.P }} шт.</div>

      <div
        class="price-column"
        :class="{ 'expensive': isMoreExpensive,
                  'cheaper': isCheaper }">
        {{ convertDollarToRuble(item.C) }} ₽
      </div>

      <div class="cart-column">
        <button
          :disabled="isDisabled"
          @click="addItemToCart(item)">
          {{ btnName }}
        </button>
      </div>
    </div>
</template>

<script>
import Formatter from '@/utils/formatter';
import getNameMixin from '@/mixins/getNameMixin';

export default {
  name: 'GoodItem',
  mixins: [getNameMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
    deletedItemId: Number,
  },
  data() {
    return {
      restoredItemId: null,
      isBtnClicked: false,
      isMoreExpensive: false,
      isCheaper: false,
    };
  },
  watch: {
    deletedItemId(id) {
      this.restoredItemId = id;
    },
    currentRate(value, oldValue) {
      if (oldValue) {
        this.isMoreExpensive = value > oldValue;
        this.isCheaper = value < oldValue;
      }
    },
  },
  computed: {
    isDisabled() {
      if (this.item.T === this.restoredItemId) {
        this.restoreItem();
      }
      return this.isBtnClicked;
    },
    currentRate() {
      return this.$store.state.currentRate;
    },
    btnName() {
      return this.isBtnClicked ? 'Добавлено' : 'Добавить';
    },
  },
  methods: {
    restoreItem() {
      this.isBtnClicked = false;
      this.restoredItemId = null;
    },
    addItemToCart(item) {
      this.$emit('addItemToCart', item);
      this.isBtnClicked = true;
    },
    convertDollarToRuble(dollar) {
      return Formatter.convertDollarToRuble(dollar, this.currentRate);
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
