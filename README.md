# mobile-demo

### Lints and fixes files

[preview](https://leandery.github.io/mobile-demo/)

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

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## keep-alive

See (https://segmentfault.com/a/1190000010546663).

`activated`: 在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次 keep-alive 激活时被调用
`deactivated`: 在组件被停用时调用

1. 当引入 keep-alive 的时候，页面第一次进入，钩子的触发顺序`created-> mounted-> activated`，退出时触发`deactivated`
2. 当再次进入（前进或者后退）时，只触发`activated`，退出时触发`deactivated`
3. 被包含在 `<keep-alive>` 中创建的组件，会多出两个生命周期的钩子: `activated` 与 `deactivated`
4. 只有组件被 `keep-alive` 包裹时，这两个生命周期才会被调用，如果作为正常组件使用，是不会被调用
5. 在 2.1.0 版本之后，使用 `exclude` 排除之后，就算被包裹在 keep-alive 中，这两个钩子依然不会被调用！

### 方法一：

```js
// id: this.$route.query.id this.id 只会被调用一次
activated() {
  const id = this.$route.query.id
  api(id).then(data => {
    this.data = data
  })
}
deactivated() {
  this.data = ''
}
```

### 方法二

```html
<keep-alive :exclude="['Article', 'Theme']">
  <router-view class="app-view"></router-view>
</keep-alive>

<script>
  export default {
    name: 'Article'
  }
</script>
```

### 动画

```css
.comments-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  transition: visibility 0.3s ease;
  .comments-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translate(0, 100%);
    transition: transform 0.5s ease;
  }
  &.open {
    visibility: visible;
    .comments-content {
      transform: translate(0, 0);
    }
  }
}
```

### timestamp -> date

```js
utils -> format.js
```

## 端口占用的问题

[修复 vue-cli3.0 项目端口被占用的 bug](https://github.com/Kntt/page-skeleton-webpack-plugin/commit/cd6e14af157bbee9d3442e7b5fd0df79c2b43ce3)

## transition

```html
<transition :name="transitionName"></transition>
```

```js
 watch: {
    $route(to, from) {
    this.transitionName = to.meta.index < from.meta.index ? 'slide-right' : 'slide-left'
    }
  }
```

```css
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
// 分类 -> 首页 slide-right
.slide-right-enter {
  transform: translateX(
    -100%
  ); // 1.enter: app-view(active)  2.initStatus: translateX(-100%)(left) 3.showing: translateX(-100%)  ——> translateX(0) left ——> 0
}
.slide-right-leave-active {
  transform: translateX(
    100%
  ); // 1.enter: category(active)  2.initStatus: translateX(0) 3.showing: translateX(0)  ——> translateX(100%) 0 ——> right
}
// 首页 -> 分类 slide-left
.slide-left-enter {
  transform: translateX(
    100%
  ); // 1.enter: category(active)  2.initStatus: translateX(100%)(right) 3.showing: translateX(100%)  ——> translateX(0) right ——> 0
}
.slide-left-leave-active {
  transform: translateX(
    -100%
  ); // 1.leave-active: app-view(active) 2.initStatus: translateX(0)  3.showing: translateX(0)  ——> translateX(-100%)(0 ——> left)
}
```