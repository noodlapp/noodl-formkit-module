import Noodl from '@noodl/noodl-sdk'

// --------------------------------------------------------------------------------------
// RadioButtonGroup
// --------------------------------------------------------------------------------------
function RadioButtonGroup(props) {
	return <div className="ndl-formkit-radiobuttongroup" {...props}
        onChange={(e) => {
            props.valueChanged && props.valueChanged(e.target.value);
        }}
    >{props.children}</div>
}

var RadioButtonGroupNode = {
	name: 'net.noodl.formkit.radiobuttongroup',
	displayName:'Radio Button Group',
	category: 'Form Kit',
	initialize() {
	},
	getReactComponent() {
		return RadioButtonGroup;
	},
	inputProps: {
	},
	outputProps: {
        valueChanged:{type:'string',displayName:'Value',group:'General'}
	}
}
RadioButtonGroupNode = Noodl.defineReactNode(RadioButtonGroupNode);
export default RadioButtonGroupNode;