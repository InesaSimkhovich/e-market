export default {
  computed: {
    names() {
      return this.$store.state.namesOfGoods;
    },
  },
  methods: {
    getGroupNameByGroupId(id) {
      return this.names[id].G;
    },
    getGoodName(good) {
      return this.names[good.G].B[good.T].N;
    },
  },
};
