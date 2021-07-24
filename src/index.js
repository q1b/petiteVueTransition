function splitClasses(classes) {
  return classes.split(' ').filter(className => className.trim().length > 1)
}
function cvt(str,el)  {
    const propsArray = splitClasses(str)
    const tempObj = {}
    propsArray.forEach((a)=>{
        const property = a.split('-')[0]
        const value = a.split('-')[1]
        tempObj[property] = value
    })
    return tempObj
}

function playState(element,foreverProp,startProp,endProp,state){
		let anim = element.animate(
			[{...startProp},{...endProp}],
				{
					duration:parseInt(foreverProp.duration)||200,
					delay:parseInt(foreverProp.delay) || 0
				}
		)
		if(state==='enter'){
			setTimeout(()=>{
    			anim.commitStyles()
  			},foreverProp.duration-1)
		}
}
export const state = ({el,get,effect,arg}) => {
	let child = el.firstElementChild
	el.setAttribute(arg,get())
	effect(() => {
		if(arg==='show' && el.getAttribute('enter')&& el.getAttribute('enter-from')&& el.getAttribute('enter-to')&& el.getAttribute('leave')&& el.getAttribute('leave-from')&& el.getAttribute('leave-to')){
			el.removeAttribute(arg);
			el.setAttribute(arg,get());
			if(eval(el.getAttribute('show'))){
				el.append(child)
				playState(child,cvt(el.getAttribute('enter'),el),cvt(el.getAttribute('enter-from'),el),cvt(el.getAttribute('enter-to'),el),'enter')
			} else {
				playState(child,cvt(el.getAttribute('leave'),el),cvt(el.getAttribute('leave-from'),el),cvt(el.getAttribute('leave-to'),el),'leave')
				setTimeout(()=>{
     				child.remove()
  	 			},cvt(el.getAttribute('leave'),el).duration)
			}
		}
  })
}
