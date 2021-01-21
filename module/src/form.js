import Noodl from '@noodl/noodl-sdk'

// --------------------------------------------------------------------------------------
// Form
// --------------------------------------------------------------------------------------
function Form(props) {
	return <form className="ndl-formkit-form" {...props}>{props.children}</form>
}

var FormNode = {
	name: 'net.noodl.formkit.form',
	displayName:'Form',
	category: 'Form Kit',
	initialize() {
	},
	getReactComponent() {
		return Form;
	},
	inputProps: {
		action:{type:'string',displayName:'Action',group:'General'},
	},
	outputProps: {
	}
}
FormNode = Noodl.defineReactNode(FormNode);
export default FormNode;