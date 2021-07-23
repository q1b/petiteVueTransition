import { colors } from './colors.js'
import { extValues, shortProp } from './ExtendedValues.js'
function psr(obj,transformObj,property,value) {
	let prefix = ''
	switch(property){
		case 'rotate':
			prefix='deg'
			if(isXOrY(value)){
				return [...transformObj,`${property}${value.toUpperCase()}(${obj.split('-')[2]}${prefix})`]
			} else{
				//  translate3d(42px, -62px, -135px);
				return [...transformObj,`${property}(${obj.split('-')[1]}${prefix})`]
			}
		case 'scale':
			prefix=''
			if(isXOrY(value)){
				return [...transformObj,`${property}${value.toUpperCase()}(${obj.split('-')[2]/100}${prefix})`]
			} else {
				return [...transformObj,`${property}(${obj.split('-')[1]/100}${prefix})`]
			}
		case 'skew':
			prefix='deg'
			if(isXOrY(value)){
				return [...transformObj,`${property}${value.toUpperCase()}(${obj.split('-')[2]}${prefix})`]
			} else {
				return [...transformObj,`${property}(${obj.split('-')[1]}${prefix}, ${obj.split('-')[2]}${prefix})`]
			}
		case 'translate':
			prefix='px'
			if(isXOrY(value)){
				return [...transformObj,`${property}${value.toUpperCase()}(${obj.split('-')[2]*4}${prefix})`]
			} else {
				return [...transformObj,`${property}3d(${obj.split('-')[1]*4}${prefix}, ${obj.split('-')[2]*4}${prefix}, ${obj.split('-')[3]*4}${prefix})`]
			}
	}
}

function isXOrY(value){
	if( value==='x' || value==='y' || value==='z' ){
		return true
	}else{
		return false
	}
}

function splitClasses(classes) {
  return classes.split(' ').filter(className => className.trim().length > 1)
}

function cvt(str,el)  {
    const propsArray = splitClasses(str)
    const tempObj = {}
    tempObj['transform'] = []
    let directions = extValues('tr',' ')
    let fromValue = '#FFF'
    let viaValue = ''
    let toValue = '#FFF'
    propsArray.forEach((a)=>{
        const property = a.split('-')[0]
        const value = a.split('-')[1]
        const transformProperties = ['scale','rotate','skew','translate'];
        let Gradient = false;
        function variableValue(key,el){
        	return el.style.getPropertyValue(key)
        }
        if(transformProperties.includes(property)){
        	tempObj.transform = psr(a,tempObj.transform,property,value)
        }else{
        	switch(true){
        		case property==='bg':
        			// bg-transition and bg-[#555] are not type of colorName 
        			let AfterBg = a.split('-')[1]
        			if(AfterBg==='gradient'){
        				directions = extValues(a.split('-')[3],' ')
        				// background-image: linear-gradient(to top right, var(--tw-gradient-stops));
        				// el.style.setProperty('--directions',`${extValues(directions,' ')}`)
        				// tempObj['backgroundImage'] = `linear-gradient(to ${extValues(directions,' ')},${variableValue('--tw-gradient-stops',el)})`
        			}else if(AfterBg.endsWith(']')){
        				colorValue = AfterBg.replace('[','').replace(']','')
        				tempObj['backgroundColor'] = colorValue
        			}else{
        				let colorName = a.split('-')[1]
        				switch(colorName){
        					case 'white':
        						tempObj['backgroundColor'] = 'white'
        						break;
        					case 'black':
        						tempObj['backgroundColor'] = 'black'
        						break;
        					default:
        						let colorName = a.split('-')[1] // blue
        						let colorShade = a.split('-')[2] // 200
        						let [hueValue,saturationValue] = colors[colorName].value
        						tempObj['backgroundColor'] = `hsl(${hueValue},${saturationValue},${(1000-colorViaShade)/10}%})`
        						break;
        				}
        			}
        			break;
        		case property==='from':
        			let colorFromName = a.split('-')[1]
        			let colorFromShade = a.split('-')[2]
        			let [hueValue,saturationValue] = colors[colorFromName].value
        			fromValue = `hsl(${hueValue},${saturationValue},${(1000-colorViaShade)/10}%})`
        			tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue}, #FFF)`
        			// el.style.setProperty('--tw-gradient-from',`${colors[colorFrom][colorFromShade]}`)
        			// console.log(`${colorFrom}`,`${colorFromShade}`)
        			// el.style.setProperty('--tw-gradient-stops',`var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0))`)
        			break;
        		case property==='via':
        			let colorViaName = a.split('-')[1] ?? 'gray'
        			let colorViaShade = a.split('-')[2] ?? '100'
        			let [viaHueValue,viaSaturationValue] = colors[colorViaName].value
        			viaValue = `hsl(${viaHueValue},${viaSaturationValue},${(1000-colorViaShade)/10}%})`
 					// let fromValue = variableValue('--tw-gradient-from',el)
        			tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue},${viaValue}, #FFF)`
        			// el.style.setProperty('--tw-gradient-via',`${colors[colorTo][colorToShade]}`)
        			break;
        		case property==='to':
        			let colorToName = a.split('-')[1] ?? 'gray'
        			let colorToShade = a.split('-')[2] ?? '100'	
        			let [toHueValue,toSaturationValue] = colors[colorToName].value
        			toValue = `hsl(${toHueValue},${toSaturationValue},${(1000-colorToShade)/10}%})`
        			if(viaValue){
        				tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue},${viaValue},${toValue})`
        			}else{
        				tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue},${toValue})`
        			}
        			// el.style.setProperty('--tw-gradient-to',`${colors[colorTo][colorToShade]}`)
        			break;
        		case shortProp.includes(property):
        			tempObj[extValues(property,'-')] = `${value*4}px`
        			break;
           		default:
           			tempObj[property] = value
        	}
        }
    })
    try{
    	tempObj.transform = tempObj.transform.join(' ')
    }catch{
    	console.log('no transform')
    }
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

export const state = ({el,get,effect,exp,arg,modifiers}) => {
	let child = el.firstElementChild
	switch(arg){
		case 'show':
			el.setAttribute(arg,get())
			break;
		case 'enter':
			el.setAttribute(arg,get())
			break;
		case 'enter-from':
			el.setAttribute(arg,get())
			break;
		case 'enter-to':
			el.setAttribute(arg,get())
			break;
		case 'leave':
			el.setAttribute(arg,get())
			break;
		case 'leave-from':
			el.setAttribute(arg,get())
			break;
		case 'leave-to':
			el.setAttribute(arg,get())
			break;
	}
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
    	// console.log('El()Element: \n',el,' \n Argument \n',arg,'\n Modifiers \n',modifiers,'\n Get \n',get())
  })
}
