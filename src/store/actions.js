import names from '@/assets/names.json';

const MIN_RATE = 20;
const MAX_RATE = 80;

const GET_RATE_DELAY_SERVER_RESPONSE = 1000;
const GET_NAME_DELAY_SERVER_RESPONSE = 5000;

function getRubleRateFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rate = +(Math.random() * (MAX_RATE - MIN_RATE) + MIN_RATE).toFixed(2);
      resolve(rate);
    }, GET_RATE_DELAY_SERVER_RESPONSE);
  });
}

function getNamesFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(names);
    }, GET_NAME_DELAY_SERVER_RESPONSE);
  });
}

export default {
  async getRate(context) {
    const data = await getRubleRateFromServer();
    if (data) context.commit('UPDATE_CURRENT_RATE', data);
  },
  async getNames(context) {
    const data = await getNamesFromServer();
    if (data) context.commit('UPDATE_NAMES', data);
  },
};
