# petiteVueTransition a transition which works without any css libraries and adopt some style values from tailwindcss as 

	1.bg => BackgroundColor
	1.h => height
	1.p => padding
	1.margin => margin

if you want to animate padding on a div element 
then it should be defined like this
# Important 
### for now you should define v-state:show in the last after v-state:enter,v-state:enter-from,v-state:enter-to,v-state:leave,v-state:leave-from,v-state:leave-to.
```html
<section v-scope="{ show:true }">
<button @click="show=!show" > Toggle </button>
<div v-state:enter="'duration-1000'" v-state:enter-from="'opacity-50 scale-50 p-20'" v-state:enter-to="'opacity-100 scale-100 p-10'" v-state:leave="'duration-1000'" v-state:leave-from="'opacity-50 scale-50 p-20'" v-state:leave-to="'opacity-100 scale-100 p-10'" v-state:show="show">
	<div>Hey it is a simple Div on asd</div>
</div>
</section>
```
To install it ! 

```javascript
npm i vue-petite-transition
```
then in your main.js 
```javascript
import { createApp } from 'petite-vue'
import { state } from 'vue-petite-transition'
// register the directive
createApp().directive('state',state).mount()
```
