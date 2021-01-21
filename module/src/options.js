import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'

import {
	useEffect,
	useState,
} from 'react';

// --------------------------------------------------------------------------------------
// Options
// --------------------------------------------------------------------------------------
function Options(props) {
	const [value, setValue] = useState(props.value);

	// Must update value output on both "mount" and when it's changed
	useEffect(() => {
		setValue(props.value);
		props.valueChanged && props.valueChanged(props.value);
	}, []);

	useEffect(() => {
			setValue(props.value);
			props.valueChanged && props.valueChanged(props.value);
	}, [props.value]);

	return <select className="ndl-formkit-select" {...props} disabled={!props.enabled} value={value} onChange = {e => {
		setValue(e.target.value);
		props.valueChanged && props.valueChanged(e.target.value);}}
		onFocus={e => {
			props.focusChanged && props.focusChanged(true);
		}}
		onBlur={e => {
			props.focusChanged && props.focusChanged(false);
		}}>
			{
				(props.items!==undefined)?props.items.map((i) => (<option value={i.Value} disabled={i.Disabled?true:undefined} selected={i.Selected?true:undefined}>{i.Label}</option>)):null
			}
	</select>
}

var OptionsNode = {
	name: 'net.noodl.formkit.options',
	displayName:'Options',
	category: 'Form Kit',
	initialize:function() {
		this._itemsChanged = () => {
			this.forceUpdate()
        }
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
	},
	getReactComponent() {
		return Options;
	},
	frame:{
		dimensions:{defaultSizeMode: 'contentHeight', contentLabel: 'Text'},
		margins:true,
		position:true,
		align:true
	},
	inputs: {
		items:{type:'array',displayName:'Items',group:'General'},
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'}
    },
	changed: {
		items(newValue) {
			if(this._items !== newValue && this._items !== undefined) {
				this._items.off('change',this._itemsChanged);
			}
			this._items = newValue;
			this._items.on('change',this._itemsChanged)

			this.props.items = this._items;
		}
	},
	inputProps: {
		value:{type:'string',displayName:'Value',group:'General'},
		enabled: {type:'boolean', displayName:'Enabled',group:'General', default:true},
	},
	inputCss:{
		color: {
			index: 24,
			group: 'Text',
			displayName: 'Color',
			type: 'color'
		},
        backgroundColor: {
            index: 100,
            displayName: 'Background Color',
            group: 'Style',
            type: 'color',
            default: 'transparent'
        },
	},
	outputProps: {
		valueChanged:{type:'string',displayName:'Value',group:'General'},
		focusChanged:{type:'boolean',displayName:'Focused',group:'General'}
	}
}
Utils.addFontStyling(OptionsNode)
Utils.addVisibilityUtils(OptionsNode)
OptionsNode = Noodl.defineReactNode(OptionsNode)
export default OptionsNode;