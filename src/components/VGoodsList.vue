<template>
  <div class="goods-list">
    <h1>Список товаров</h1>
    <VContainer
      v-for="group in groupedGoods"
      :key="group.groupId">

      <template slot="containerHeader">
        {{group.groupName}}
      </template>

      <template slot="containerItems">
        <VGoodItem
          v-for="item in group.items"
          :key="item.id"
          :item="item"/>
      </template>
    </VContainer>
  </div>
</template>

<script>
import VContainer from './VContainer.vue';
import VGoodItem from './VGoodItem.vue';

export default {
  name: 'GoodsList',
  components: {
    VContainer,
    VGoodItem,
  },
  computed: {
    groupedGoods() {
      return this.$store.getters.groupedGoods;
    },
  },
  created() {
    this.$store.dispatch('showSpinner', true);
    this.$store.dispatch('getGoods')
      .then()
      .catch(error => this.$notify({
        type: 'error',
        text: error,
      })).finally(() => {
        this.$store.dispatch('showSpinner', false);
      });
  },
};
</script>
