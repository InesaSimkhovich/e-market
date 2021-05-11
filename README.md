# e-market-test

## Скриншот лежит в папке public

## Обновления:
Удалены лишние emits и заменены на VUEX-actions,
сделана нормализация входящих данных из json,
добавлен новый input в корзине, чтобы показать работу с библиотеками vee-validate и vue-the-mask,
добавлены уведомления о добавлении\удалении товара,
для примера выбрасываю ошибку на получении определенного курса.

## Комментарии:
Для выполнения задания был использован Vue.JS второй версии.
Были использованы (возможно не всегда по назначению, а для демонстрации осведомленности) следущие интструменты:
data, props, event (emit), v-if, v-html, formatter, Vuex, mixin,
functional component, transition, slot, hooks, computed, watch, methods, etc.

## Дополнительные features:
+ Эмуляция ответов сервера с применением асинхронности
+ Крутящийся спиннер во время получения данных от "сервера" при входе 
+ Компонента "Курс валют" со старым и текущим значениями
+ Легкий адаптив и полная кроссбраузерность
+ Собственный дизайн

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
