# Petite Vue Transition

### Petite Transition Library for Petite Vue

##### A transition which works without any css libraries and using web animation api under the hood,

```javascript
npm i vue-petite-transition@latest
```

### for now it provide 
	v-transition:show
	v-transition:enter
	v-transition:enter-from
	v-transition:enter-to
	v-transition:leave
	v-transition:leave-from
	v-transition:leave-to

#### To install it through npm 

```javascript
npm i vue-petite-transition
```

```yarn
yarn add vue-petite-transition
```

#### CDN URLs

##### The short CDN URL is meant for prototyping. For production usage, use a fully resolved CDN URL to avoid resolving and redirect cost:

- ESM build: `https://unpkg.com/browse/vue-petite-transition@2.0.0/dist/vue-petite-transition.es.js`

then in your html script where you defined your petite-vue instance  

```html
<script type="module">
import { createApp } from 'petite-vue'
import { transition } from 'vue-petite-transition'
// register the directive
createApp().directive('transition',transition).mount()
</script>
```

## Acknowledgement

- [HeadlessUI](http://headlessui.dev/)
- [CSS Based Transition VUEJS](https://vuejs.org/guide/built-ins/transition.html#css-based-transitions)


Thanks, Now Have Fun Bye Bye !
