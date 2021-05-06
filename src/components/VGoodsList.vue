<template>
  <div class="goods-list">
    <h1>Список товаров</h1>
    <VContainer
      v-for="(good, index) in groupedGoods"
      :key="index">

      <template slot="containerHeader">
        {{ getGroupNameByGroupId(good.groupId) }}
      </template>

      <template slot="containerItems">
        <VGoodItem
          v-for="item in good.items"
          :key="item.T"
          :item="item"
          :deletedItemId="deletedItemId"
          @addItemToCart="addItemToCart"/>
      </template>
    </VContainer>
  </div>
</template>

<script>
import getNameMixin from '@/mixins/getNameMixin';
import data from '@/assets/data.json';
import VContainer from './VContainer.vue';
import VGoodItem from './VGoodItem.vue';

// emulating the server response
const getDataFromServer = new Promise((resolve) => {
  setTimeout(() => {
    resolve(data);
  }, 3000);
});

export default {
  name: 'GoodsList',
  components: {
    VContainer,
    VGoodItem,
  },
  mixins: [getNameMixin],
  props: {
    deletedItemId: Number,
  },
  data() {
    return {
      groupedGoods: [],
    };
  },
  created() {
    this.$root.$emit('spinner:show', true);

    this.$store.dispatch('getNames')
      .then(() => {
        getDataFromServer.then((response) => {
          if (response) {
            const groupIds = this.getUniqueGroupIds(response.Value.Goods);
            groupIds.forEach((groupId) => {
              this.groupedGoods.push({
                groupId,
                items: response.Value.Goods.filter(good => good.G === groupId),
              });
            });
            this.$root.$emit('spinner:show', false);
          }
        });
      });
  },
  methods: {
    getUniqueGroupIds(array) {
      const allGroups = [];
      array.forEach(item => allGroups.push(item.G));
      return [...new Set(allGroups)];
    },
    addItemToCart(item) {
      this.$emit('addItemToCart', item);
    },
  },
};
</script>
