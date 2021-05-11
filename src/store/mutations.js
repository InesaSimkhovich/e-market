import Vue from 'vue';

export default {
  SET_CURRENT_RATE(state, rate) {
    state.currentRate = rate;
  },
  SET_NAMES(state, names) {
    state.names = names;
  },
  SET_DATA(state, data) {
    state.data = data;
  },
  TOGGLE_SPINNER(state, value) {
    state.isShowSpinner = value;
  },
  SET_GOODS(state, value) {
    state.goods = value;
  },
  ADD_TO_CART(state, item) {
    const index = state.cartList.findIndex(cartItem => cartItem.id === item.id);
    if (index === -1) {
      state.cartList.push(item);
      Vue.notify('Товар добавлен в корзину');
    } else {
      Vue.notify({
        type: 'warn',
        text: `Товар ${item.name} уже есть в корзине`,
      });
    }
  },
  DELETE_FROM_CART(state, index) {
    state.cartList.splice(index, 1);
    Vue.notify('Товар удален из корзины');
  },
};
