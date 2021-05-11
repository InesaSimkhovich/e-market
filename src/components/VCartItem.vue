<template>
    <div class="cart-item">
      <div class="name-column">
        <b>{{item.groupName}}</b>: {{item.name}}
      </div>
      <div class="quantity-column">
        От 1 до {{ item.quantityRemain }}
        <input
          type="range"
          step="1"
          min="1"
          :max="item.quantityRemain"
          :value="quantity"
          @input="changeQuantity($event)" />
        <input
          type="tel"
          :class="{'is-invalid': errors.has('quantity')}"
          name="quantity"
          v-mask="mask"
          data-vv-as="quantity"
          data-vv-validate-on="input"
          v-validate="validationRules"
          v-model.number="quantity"
          @input="changeQuantity($event)" />

        <p class="error-message">{{ errors.first('quantity') }}</p>
        Выбрано: {{ quantity }}
      </div>
      <div class="price-column">
        {{ amount | toFixed }} ₽
      </div>
      <div class="cart-column">
        <button @click="$emit('deleteFromCart')">Удалить</button>
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
      quantity: 1,
      validationRules: {
        min_value: 1,
        max_value: this.item.quantityRemain,
      },
    };
  },
  computed: {
    mask() {
      const { length } = this.item.quantityRemain.toString();
      let mask = '';
      // eslint-disable-next-line
      for (let i = 0; i < length; i++) {
        mask += '#';
      }
      return mask;
    },
    currentRate() {
      return this.$store.state.currentRate;
    },
    amount() {
      return this.item.priceInDollars * this.currentRate * this.quantity;
    },
  },
  methods: {
    changeQuantity(event) {
      this.quantity = +event.target.value === 0 ? 1 : +event.target.value;
      this.item.quantityToOrder = this.quantity;
      this.$emit('changeQuantity');
    },
  },
};
</script>
