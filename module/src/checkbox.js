import Noodl from '@noodl/noodl-sdk';
import Utils from './utils';

import {
	useEffect,
	useState,
} from 'react';

// --------------------------------------------------------------------------------------
// CheckBox
// --------------------------------------------------------------------------------------
function CheckBox(props) {
    const [checked, setChecked] = useState(props.checked);

    // Report initial values when mounted
	useEffect(() => {
		setChecked(!!props.checked);
        props.checkedChanged && props.checkedChanged(!!props.checked);

        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
	}, []);

	useEffect(() => {
			setChecked(props.checked);
			props.checkedChanged && props.checkedChanged(props.checked);
    }, [props.checked]);

    return <input className="ndl-formkit-checkbox" type="checkbox" {...props} checked={checked} disabled={!props.enabled} 
        onChange = {e => {
            setChecked(e.target.checked);
            props.checkedChanged && props.checkedChanged(e.target.checked);
        }}
		onFocus={e => props.enabled && props.focusChanged && props.focusChanged(true)}
        onBlur={e => props.enabled && props.focusChanged && props.focusChanged(false)}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        ></input>;
}

var CheckBoxNode = {
	name: 'net.noodl.formkit.checkbox',
	displayName:'Checkbox',
	category: 'Form Kit',
	initialize() {
        this.props.sizeMode = 'explicit';
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = (this.inputs.enabled===undefined)?true:this.inputs.enabled;
        this.props.checked = this.outputs.checked = (this.inputs.checked===undefined)?false:this.inputs.checked;
        this.props.checkedChanged = (checked) => {
            this.setOutputs({
                checked:checked
            })
        }
	},
	getReactComponent() {
		return CheckBox
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
            this.forceUpdate()
        }
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'},
        enabled: {type:'boolean', displayName:'Enabled',group:'States'},
        checked: {type:'boolean', displayName:'Checked',group:'States'},
    },
	inputProps: {
		checked: {type:'boolean', displayName:'Checked',group:'General'},
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
        focusChanged: {type: 'boolean', displayName: 'Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'},
      //  checkedChanged: {type: 'boolean', displayName: 'Checked', group:'States'}
	}
}

Utils.addVisibilityUtils(CheckBoxNode)
CheckBoxNode = Noodl.defineReactNode(CheckBoxNode);

export default CheckBoxNode;

