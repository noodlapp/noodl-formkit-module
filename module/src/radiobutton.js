import Noodl from '@noodl/noodl-sdk';
import Utils from './utils';
import Events from 'events';

import {
	useEffect,
	useState,
} from 'react';

const stateEmitter = new Events.EventEmitter();

// --------------------------------------------------------------------------------------
// RadioButton
// --------------------------------------------------------------------------------------
function RadioButton(props) {
  //  const [checked, setChecked] = useState(props.checked);

    var _currentRadioButtonGroup;
    function _radioButtonChanged(ev) {
        props.checkedChanged && props.checkedChanged(ev.value === props.value)
    }

    // On mount
	useEffect(() => {
	//	setChecked(!!props.checked);
   //     props.checkedChanged && props.checkedChanged(!!props.checked);

        props.checkedChanged && props.checkedChanged(false);
        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);

        // Listen to changes in radio button group
        stateEmitter.on(props.name,_radioButtonChanged)
        _currentRadioButtonGroup = props.name;
    }, []);
    
    // Register listener if name changed
    useEffect(() => {
        if(_currentRadioButtonGroup !== undefined) stateEmitter.off(_currentRadioButtonGroup,_radioButtonChanged)
        stateEmitter.on(props.name,_radioButtonChanged)
        _currentRadioButtonGroup = props.name;
    }, [props.name]);

/*	useEffect(() => {
		setChecked(props.checked);
        props.checkedChanged && props.checkedChanged(props.checked);
	}, [props.checked]);*/

    return <input className="ndl-formkit-radiobutton" type="radio" {...props} disabled={!props.enabled} 
        onChange = {e => {
            stateEmitter.emit(props.name,{value:props.value})
       //     setChecked(e.target.checked);
       //     props.checkedChanged && props.checkedChanged(e.target.checked);
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
    },
	inputProps: {
      //  checked: {type:'boolean', displayName:'Checked',group:'General'},
        name: {type:'string', displayName:'Name',group:'General'},
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
		checkedChanged: {type: 'boolean', displayName: 'Checked', group:'States'},
        focusChanged: {type: 'boolean', displayName: 'Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'}
	}
}

Utils.addVisibilityUtils(RadioButtonNode)
RadioButtonNode = Noodl.defineReactNode(RadioButtonNode);

export default RadioButtonNode;

