import Noodl from '@noodl/noodl-sdk';
import Utils from './utils';
import RadioButtonContext from './radiobuttoncontext';

import {
	useEffect,
    useState,
    useContext,
} from 'react';

// --------------------------------------------------------------------------------------
// RadioButton
// --------------------------------------------------------------------------------------
function RadioButton(props) {
    const radioButtonGroup = useContext(RadioButtonContext)

    // On mount
	useEffect(() => {
        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
    }, []);

    props.checkedChanged && props.checkedChanged(radioButtonGroup.selected === props.value);
    return <input className="ndl-formkit-radiobutton" type="radio" name={radioButtonGroup.name} {...props} disabled={!props.enabled} 
        checked={radioButtonGroup.selected === props.value}
        onChange = {e => {
            radioButtonGroup.checkedChanged && radioButtonGroup.checkedChanged(props.value);
        }}
		onFocus={e => props.enabled && props.focusChanged && props.focusChanged(true)}
        onBlur={e => props.enabled && props.focusChanged && props.focusChanged(false)}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        ></input>;
}

var RadioButtonNode = {
	name: 'net.noodl.formkit.radiobutton',
	displayName:'Radio Button',
	category: 'Form Kit',
	initialize() {
        this.props.sizeMode = 'explicit';
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = true;
        this.props.checkedChanged = (value) => {
            this.setOutputs({
                checked:value
            })
        }
	},
	getReactComponent() {
		return RadioButton;
	},
	frame:{
		margins:true,
		position:true,
		align:true
    },
    inputs:{
        enabled: {type:'boolean', displayName:'Enabled',group:'General', default:true},
    },
    changed:{
        enabled(value) {
            this.props.enabled = value;
            this.setOutputs({
                enabled:value
            })
        }
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'},
        enabled: {type:'boolean', displayName:'Enabled',group:'States'},
        checked: {type:'boolean', displayName:'Checked',group:'States'},
    },
	inputProps: {
      //  checked: {type:'boolean', displayName:'Checked',group:'General'},
        value: {type:'string', displayName:'Value',group:'General'},
		width: {
			index: 11,
			group: 'Dimensions',
			displayName: 'Width',
			type: {
				name: "number",
				units: ["%", "px", 'vw'],
				defaultUnit: "%"
			},
			default: 100,
		},
		height: {
			index: 12,
			group: 'Dimensions',
			displayName: 'Height',
			type: {
				name: "number",
				units: ["%", "px", 'vh'],
				defaultUnit: "%"
			},
			default: 100
		}
	},
	outputProps: {
		//checkedChanged: {type: 'boolean', displayName: 'Checked', group:'States'},
        focusChanged: {type: 'boolean', displayName: 'Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'}
	}
}

Utils.addVisibilityUtils(RadioButtonNode)
RadioButtonNode = Noodl.defineReactNode(RadioButtonNode);

export default RadioButtonNode;

