<template>
    <div class="cart-item">
      <div class="name-column" v-html="cartItemName"></div>
      <div class="quantity-column">
        От 1 до {{ item.P }}
        <input
          type="range"
          step="1"
          min="1"
          :max="item.P"
          :value="quantity"
          @input="changeQuantity($event)" />
        Выбрано: {{ quantity }}
      </div>
      <div class="price-column">
        {{ amount }} ₽
      </div>
      <div class="cart-column">
        <button @click="$emit('deleteFromCart', item)">Удалить</button>
      </div>
    </div>
</template>

<script>
import Formatter from '@/utils/formatter';
import getNameMixin from '@/mixins/getNameMixin';

export default {
  name: 'GoodItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  mixins: [getNameMixin],
  data() {
    return {
      quantity: 1,
    };
  },
  computed: {
    cartItemName() {
      return `<b>${this.getGroupNameByGroupId(this.item.G)}:</b> ${this.getGoodName(this.item)}`;
    },
    amount() {
      return this.convertDollarToRuble(this.item.C * this.quantity);
    },
  },
  methods: {
    convertDollarToRuble(dollar) {
      return Formatter.convertDollarToRuble(dollar, this.$store.state.currentRate);
    },
    changeQuantity(event) {
      this.quantity = +event.target.value;
      this.$emit('markChangedItem', {
        id: this.item.T,
        quantity: this.quantity,
      });
    },
  },
};
</script>
