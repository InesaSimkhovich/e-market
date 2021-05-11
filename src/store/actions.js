import namesJSON from '@/assets/names.json';
import data from '@/assets/data.json';

const MIN_RATE = 20;
const MAX_RATE = 80;

// emulating the server response
function getDataFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}

function getRubleRateFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rate = +(Math.random() * (MAX_RATE - MIN_RATE) + MIN_RATE).toFixed(2);
      if (rate > 30 && rate < 35) {
        reject(new Error('Курс нестабилен. Подождите, пожалуйста.')); // ради примера
      } else {
        resolve(rate);
      }
    }, 1000);
  });
}

function getNamesFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(namesJSON);
    }, 2000);
  });
}

export default {
  showSpinner({ commit }, value) {
    commit('TOGGLE_SPINNER', value);
  },

  async getRate({ commit }) {
    try {
      commit('SET_CURRENT_RATE', await getRubleRateFromServer());
    } catch (err) {
      // eslint-disable-next-line
      alert(err);
    }
  },

  async getNames({ commit }) {
    commit('SET_NAMES', await getNamesFromServer());
  },

  async getData({ commit }) {
    commit('SET_DATA', await getDataFromServer());
  },

  async getGoods({ dispatch, commit, state }) {
    await dispatch('getNames');
    await dispatch('getData');
    await dispatch('getRate');

    if (data && data.Value.Goods) {
      const { names } = state;
      const goods = data.Value.Goods.map(item => ({
        id: item.T,
        name: names[item.G].B[item.T].N,
        groupId: item.G,
        groupName: names[item.G].G,
        quantityRemain: item.P,
        priceInDollars: item.C,
        priceInRubles: item.C * state.currentRate,
      }));
      commit('SET_GOODS', goods);
    }
  },

  addToCart({ commit }, item) {
    commit('ADD_TO_CART', item);
  },

  deleteFromCart({ commit }, index) {
    commit('DELETE_FROM_CART', index);
  },
};
