import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'

import {
	useEffect,
	useState,
	forwardRef,
	useRef,
	useImperativeHandle
} from 'react';

// --------------------------------------------------------------------------------------
// DateInput
// --------------------------------------------------------------------------------------
function DateInput(props, ref) {
	const [date, setDate] = useState(props.date);

	const inputRef = useRef();

	useEffect(() => {
		props.dateChanged && props.dateChanged(date);
	}, []);

	useImperativeHandle(ref, () => ({
		setDate(date) {
			setDate(date);
			props.dateChanged && props.dateChanged(date);
		},
		focus() {
			inputRef.current.focus();
		},
		blur() {
			inputRef.current.blur();
		},
		clear() {
			setDate('');
			props.dateChanged && props.dateChanged('');
		}
	}))

    return <input className="ndl-formkit-dateinput"
                    ref = {inputRef}
				  type = "date"
				  {...props} //optional className and style, sent by Noodl
				  value = {date}
				  disabled={!props.enabled}
				  onChange = {e => {
					setDate(e.target.value);
					props.dateChanged && props.dateChanged(e.target.value);
				}}
				onFocus={e => props.enabled && props.focusChanged && props.focusChanged(true)}
                onBlur={e => props.enabled && props.focusChanged && props.focusChanged(false)}
                onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
                onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
	/>
}

var DateInputNode = {
	name: 'net.noodl.formkit.dateinput',
	displayName:'Date Input',
	category: 'Form Kit',
	getReactComponent() {
		return forwardRef(DateInput);
	},
	initialize() {
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = true;
    },
	inputs: {
		date: {
            type: 'date',
            displayName:'Date',
            group:'General'
        },
        enabled: {type:'boolean', displayName:'Enabled',group:'General', default:true},
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'}
    },
	changed: {
		date(newValue) {
            this.props.date = newValue;
            this.innerReactComponentRef && this.innerReactComponentRef.setDate(this.inputs.date);
        },
        enabled(value) {
            this.props.enabled = value;
            this.forceUpdate();
            this.setOutputs({
                enabled:value
            })
        }
	},
	signals: {
		focus() {
			this.innerReactComponentRef && this.innerReactComponentRef.focus();
		},
		blur() {
			this.innerReactComponentRef && this.innerReactComponentRef.blur();
		},
		set() {
			this.innerReactComponentRef && this.innerReactComponentRef.setText(this.inputs.text);
		},
		clear() {
			this.innerReactComponentRef && this.innerReactComponentRef.clear();
		}
    },
    inputCss:{
		color: {
			index: 24,
			group: 'Text',
			displayName: 'Color',
            type: 'color',
            default:'#000000'
		},
        backgroundColor: {
            index: 100,
            displayName: 'Background Color',
            group: 'Style',
            type: 'color',
            default: 'transparent'
        },
    },
	inputProps:{
	},
	outputProps: {
		dateChanged: {
			type: 'string',
			displayName: 'Date',
			group:'General'
		},
        focusChanged: {type: 'boolean', displayName: 'Focused', group:'States'},
        hoverChanged: {type: 'boolean', displayName: 'Hover', group:'States'}
	},
	frame:{
		dimensions:true,
		margins:true,
		padding:true,
		position:true,
		align:true
	},
}
Utils.addFontStyling(DateInputNode)
Utils.addVisibilityUtils(DateInputNode)
DateInputNode = Noodl.defineReactNode(DateInputNode)
export default DateInputNode