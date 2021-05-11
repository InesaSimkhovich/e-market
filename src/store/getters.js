const groupedGoods = (state) => {
  const allGroupIds = state.goods.map(item => item.groupId);
  const uniqueGroupIds = [...new Set(allGroupIds)];
  return uniqueGroupIds.map(groupId => (
    {
      groupId,
      groupName: state.goods.find(item => item.groupId === groupId).groupName,
      items: state.goods.filter(item => item.groupId === groupId),
    }
  ));
};

export default {
  groupedGoods,
};
