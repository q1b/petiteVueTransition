# petiteVueTransition
##### A transition which works without any css libraries and using web animation api under the hood,
### brotli Size : 0.34kb
#### But if you are ok with size then you can go with 
```javascript
npm i vue-petite-transition@1.1.2
```
it support some tailwindcss style like bg-blue-500 h-10 opacity-50 p-10, convert them into objects but to reduce size I had to remove that extra layer and thinking to back with this support but with a scalable solution for this . but 1.2.0 version is not supporting any tailwindcss, it's work as shown below .
# Important 
### for now it provide 
	v-state:show
	v-state:enter
	v-state:enter-from
	v-state:enter-to
	v-state:leave
	v-state:leave-from
	v-state:leave-to
#### A drawback is that you have to defined values as follow in example
##### v-state:enter="' '" // using '' inside "" .
##### second is that v-state accpets a boolean value and Must be defined at last after all others. 

## How it works ?
##### you can provide the properties and their values which you want to animate also, it follows a perticular format to define your values like color-#FFF is going to convert into 
```javascript
{
	color:#FFF;
}
```
##### Another example 
```html
<section>
	<button @click="show=!show">Toggle Value</button>
	<article v-state:enter="'duration-1000'" v-state:enter-from="'transform-scale(0.9) opacity-0.2'" v-state:enter-to="transform-scale(1) opacity-1" v-state:leave="'duration-1000'" v-state:leave-from="'transform-translateX(0px) backgroundColor-#FF00'" v-state:leave-to="  backgroundColor-#FFF transform-translateX(10px)" x-state:show="show">
		<div style="width:40px; height:40px" >I can do this all demo !</div>
	</article>
</section>
```
##### It's simple define property then it's value like property-value 

#### To install it through npm 

```javascript
npm i vue-petite-transition
```

```yarn
yarn add vue-petite-transition
```

then in your main.js 
```javascript
import { createApp } from 'petite-vue'
import { state } from 'vue-petite-transition'
// register the directive
createApp().directive('state',state).mount()
```
