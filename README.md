# Petite Vue Transition

## Petite Transition Library for [Petite Vue](https://github.com/vuejs/petite-vue)

# Getting Started

#### Installation

```sh
npm install vue-petite-transition@latest
```

```sh
pnpm i vue-petite-transition
```

```sh
yarn add vue-petite-transition
```

### Configuration

Then, in your html script where you defined your petite-vue instance  

```html
<script type="module">
import { createApp } from 'petite-vue'
// import vue-petite-transition from npm    
import { transitionDirective } from 'vue-petite-transition'
// or via unpkg
import { transitionDirective } from "https://unpkg.com/vue-petite-transition?module";
// or direct cdn for production (to avoid redirect cost)
import { transitionDirective } from "https://unpkg.com/vue-petite-transition@2.0.0/dist/vue-petite-transition.es.js";    
    
// register the directive
createApp().directive('transition',transitionDirective).mount()
</script>
```

### CDN URLs

ESM build: 
`https://unpkg.com/vue-petite-transition@2.0.0/dist/vue-petite-transition.es.js`

> The short CDN URL is meant for prototyping. For production usage, use a fully resolved CDN URL to avoid resolving and redirect cost:

## provided API for `v-transition`

- `v-transition:show`
    - type: boolean
    - Whether the children should be shown or hidden
- `v-transition:enter`
    - type: string
    - Classes added to the element during the entire enter phase.
    - e.g. v-transition:enter="duration-1000"
- `v-transition:enter-from `
    - type: string
    - Classes added to the element before the enter phase starts.
    - e.g. v-transition:enter-from="opacity-0"
- `v-transition:enter-to`
    - type: string
    - Classes added to the element immediately after the enter phase starts.
    - e.g. v-transition:enter-to="opacity-100"
- `v-transition:entered`
    - type: string
    - Classes added to the element once the transition is done. These classes will persist after that, until it's time to leave.
    - e.g. v-transition:entered="opacity-100"
- `v-transition:leave`
    - type: string
    - Classes added to the element during the entire leave phase.
    - e.g. v-transition:leave="duration-1000 ease-out"
- `v-transition:leave-from`
    - type: string
    - Classes added to the element before the leave phase starts.
    - e.g. v-transition:leave-from="opacity-100"
- `v-transition:leave-to`
    - type: string
    - Classes added to the element immediately after the leave phase starts.
    - e.g. v-transition:leave-to="opacity-0"

### Example 

** Just Passing enter enter-from enter-to values works **

```html
<div v-scope="{ show:true }" class="h-96 w-96">
  <p>show: {{ show }}</p>
    <button @click="show = !show" class="px-2 bg-slate-900 text-white py-0.5 flex items-center justify-center" > toggle </button>
  <div v-transition:show="!show"
    class="p-10 bg-sky-400 opacity-0 scale-90"
    v-transition:enter="duration-1000 transition-[opacity,transform]"
    v-transition:enter-from="opacity-0 scale-90"
    v-transition:enter-to="opacity-100 scale-100"
  >  Show {{!show}}
  </div>
</div>
```

## Acknowledgement

- [HeadlessUI](http://headlessui.dev/)
- [CSS Based Transition VUEJS](https://vuejs.org/guide/built-ins/transition.html#css-based-transitions)


Thanks, Now Have Fun Bye Bye  !
