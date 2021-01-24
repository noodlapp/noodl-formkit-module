import Noodl from '@noodl/noodl-sdk';
import Utils from './utils';

import {
	useEffect,
	useState,
} from 'react';

// --------------------------------------------------------------------------------------
// Range
// --------------------------------------------------------------------------------------
function Range(props) {
    const [value, setValue] = useState(props.value);

    // Report initial values when mounted
	useEffect(() => {
		setValue(props.value);
        props.valueChanged && props.valueChanged(props.value);

        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
	}, []);

	useEffect(() => {
			setValue(props.value);
			props.valueChanged && props.valueChanged(props.value);
    }, [props.value]);

    return <input className="ndl-formkit-range" type="range" {...props} value={value} disabled={!props.enabled} 
        onChange = {e => {
            setValue(e.target.value);
            props.valueChanged && props.valueChanged(e.target.value);
        }}
		onFocus={e => props.enabled && props.focusChanged && props.focusChanged(true)}
        onBlur={e => props.enabled && props.focusChanged && props.focusChanged(false)}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        ></input>;
}

var RangeNode = {
	name: 'net.noodl.formkit.range',
	displayName:'Range',
	category: 'Form Kit',
	initialize() {
        this.props.sizeMode = 'explicit';
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = (this.inputs.enabled===undefined)?true:this.inputs.enabled;
        this.outputs.value = this.props.value = this.props.min;
        this.props.valueChanged = (value) => {
            const min = this.props.min
            const max = this.props.max
            const valuePercent = Math.floor( (value - min) / (max - min) * 100 )
            this.setOutputs({
                value:value,
                valuePercent:valuePercent
            })
        }
        this.props.valueChanged(this.props.value); // Update initial values
	},
	getReactComponent() {
		return Range
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
        value: {type:'number', displayName:'Value',group:'General'},
        valuePercent: {type:'number', displayName:'Value Percent',group:'General'},
    },
	inputProps: {
        value: {type:'number', displayName:'Value',group:'General'},
        min: {type:'number', displayName:'Min',group:'General',default:0},
        max: {type:'number', displayName:'Max',group:'General',default:100},
        step: {type:'number', displayName:'Step',group:'General',default:1},
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
	}
}

Utils.addVisibilityUtils(RangeNode)
RangeNode = Noodl.defineReactNode(RangeNode);

export default RangeNode;

