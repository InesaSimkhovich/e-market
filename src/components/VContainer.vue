<template functional>
  <div class="container"
       :class="[data.class || '', data.staticClass || '']">

    <h3 class="container-header">
      <slot name="containerHeader"/>
    </h3>

    <div class="container-name-raw">
      <div class="name-column">Наименование товара</div>
      <div class="quantity-column">Количество</div>
      <div class="price-column">Цена</div>
      <div class="cart-column">Корзина</div>
    </div>

    <slot name="containerItems"/>
  </div>
</template>
