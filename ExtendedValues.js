const ValuesArray = [
	['h','height'],
	['bg','background'],
	['p', 'padding'],
	['m', 'margin'],
	['t', 'top'],
	['r','right'],
	['l','left'],
	['t','top'],
];
const extended = new Map(ValuesArray);
// to convert pt to padding-top
export const extValues = (propsStr,joiningValue) => {
	// a is like 'pt' or 'p'
	if(propsStr.length===1){
		// check it is 'p'
		return extended.get(propsStr)
	}else{
		// if it is 'pt'
		let propsArray = propsStr.split('') // ['p','t']
		let extendedArray = []
		propsArray.forEach((props)=>{
			// getting 'p' then converting it to extended form which is padding
			extendedArray = [...extendedArray, extended.get(props)]
		})
		// returning padding-top here,
		return extendedArray.join(joiningValue)
	}
}