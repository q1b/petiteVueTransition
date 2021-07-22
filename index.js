import { colors } from '../utils/colors.js'
import { extValues } from '../utils/ExtendedValues.js'
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

function cvt(str,el)  {
    const propsArray = str.trim().split(' ')
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
        	switch(property){
        		case 'bg':
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
        						let colorName = a.split('-')[1]
        						let colorShade = a.split('-')[2]
        						tempObj['backgroundColor'] = `${colors[colorName][colorShade]}`
        						break;
        				}
        			}
        			break;
        		case 'from':
        			let colorFrom = a.split('-')[1]
        			let colorFromShade = a.split('-')[2]
        			fromValue = `${colors[colorFrom][colorFromShade]}`
        			tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue}, #FFF)`
        			// el.style.setProperty('--tw-gradient-from',`${colors[colorFrom][colorFromShade]}`)
        			// console.log(`${colorFrom}`,`${colorFromShade}`)
        			// el.style.setProperty('--tw-gradient-stops',`var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0))`)
        			break;
        		case 'via':
        			let colorVia = a.split('-')[1] ?? 'gray'
        			let colorViaShade = a.split('-')[2] ?? '100'	
        			viaValue = `${colors[colorVia][colorViaShade]}`
 					// let fromValue = variableValue('--tw-gradient-from',el)
        			tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue},${viaValue}, #FFF)`
        			// el.style.setProperty('--tw-gradient-via',`${colors[colorTo][colorToShade]}`)
        			break;
        		case 'to':
        			let colorTo = a.split('-')[1] ?? 'gray'
        			let colorToShade = a.split('-')[2] ?? '100'	
        			// let viaValue =  variableValue('--tw-gradient-via',el) ?? 0 
        			if(viaValue){
        				tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue},${viaValue},${colors[colorTo][colorToShade]})`
        			}else{
        				tempObj['backgroundImage'] = `linear-gradient(to ${directions},${fromValue},${colors[colorTo][colorToShade]})`
        			}
        			// el.style.setProperty('--tw-gradient-to',`${colors[colorTo][colorToShade]}`)
        			break;
        		case 'h':
        			tempObj[extValues(property,'-')] = `${value*4}px`
        			break;
        		case 'p':
        			tempObj[extValues(property,'-')] = `${value*4}px`
        			break;
        		case 'pt':
        			tempObj[extValues(property,'-')] = `${value*4}px`
        			break;
        		case 'pr':
        			tempObj[extValues(property,'-')] = `${value*4}px`
        			break;
        		case 'pb':
        			tempObj[extValues(property,'-')] = `${value*4}px`
        			break;
        		case 'pl':
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

export const visible = (ctx) => {
	let enter = cvt(ctx.el.getAttribute('enter'),ctx.el)
	let enterFrom = cvt(ctx.el.getAttribute('enter-from'),ctx.el)
	let enterTo = cvt(ctx.el.getAttribute('enter-to'),ctx.el)
	let leave = cvt(ctx.el.getAttribute('leave'),ctx.el)
	let leaveFrom = cvt(ctx.el.getAttribute('leave-from'),ctx.el)
	let leaveTo = cvt(ctx.el.getAttribute('leave-to'),ctx.el)
	let child = ctx.el.firstElementChild
	console.log(ctx.el)
	console.log(enterTo)
	ctx.effect(() => {
		ctx.el.setAttribute('show', ctx.get() )
		if(ctx.get()){
			ctx.el.append(child)
			playState(child,enter,enterFrom,enterTo,'enter')
			// console.log(`${colors.blue['500']}`)
		} else{
			playState(child,leave,leaveFrom,leaveTo,'leave')
			setTimeout(()=>{
     			child.remove()
  	 		},leave.duration)
		}
    	// console.log('El()Element: \n',ctx.el,' \n Argument \n',ctx.arg,'\n Modifiers \n',ctx.modifiers,'\n Get \n',ctx.get())
  })
}

export const enterFrom = (ctx) => {
	ctx.el.setAttribute('enter-from', ctx.get() )
}

export const enterTo = (ctx) => {
	ctx.el.setAttribute('enter-to', ctx.get() )
}

// Convert String to Objects Like { property:value }
export const enter = (ctx) => {
	ctx.el.setAttribute('enter', ctx.get() )
}

export const duration = (ctx) => {
	
}

export const delay = (ctx) => {
	
}

export const easeing = (ctx) => {
	
}


export const leave = (ctx) => {
	ctx.el.setAttribute('leave', ctx.get() )
}

export const leaveFrom = (ctx) => {
	ctx.el.setAttribute('leave-from', ctx.get() )
}

export const leaveTo = (ctx) => {
	ctx.el.setAttribute('leave-to', ctx.get() )
}
