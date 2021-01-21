import Noodl from '@noodl/noodl-sdk'
import Utils from './utils'

import {
	useEffect,
} from 'react';

// --------------------------------------------------------------------------------------
// Button
// --------------------------------------------------------------------------------------
function Button(props) {
    // On mount
    useEffect(() => {
        props.focusChanged && props.focusChanged(false);
        props.hoverChanged && props.hoverChanged(false);
        props.pressedChanged && props.pressedChanged(false);
    }, []);
    
	return <button className="ndl-formkit-button" disabled={!props.enabled} type={props.buttonType} {...props}
        onFocus={e => props.enabled && props.focusChanged && props.focusChanged(true)}
        onBlur={e => props.enabled && props.focusChanged && props.focusChanged(false)}
        onMouseEnter={() => props.enabled && props.hoverChanged && props.hoverChanged(true)}
        onMouseLeave={() => props.enabled && props.hoverChanged && props.hoverChanged(false)}
        onMouseDown={() => props.enabled && props.pressedChanged && props.pressedChanged(true)}
        onMouseUp={() => props.enabled && props.pressedChanged && props.pressedChanged(false)}
    >{props.label}</button>
}

var ButtonNode = {
	name: 'net.noodl.formkit.button',
	displayName:'Button',
	category: 'Form Kit',
	initialize() {
        this.props.id = this.outputs.controlId = 'input-' + Utils.guid();
        this.props.enabled = this.outputs.enabled = true;
	},
	getReactComponent() {
		return Button;
	},
	frame:{
		dimensions:{defaultSizeMode: 'contentHeight', contentLabel: 'Text'},
        margins:true,
        padding:true,
		position:true,
		align:true
    },
    inputs:{
        enabled:{type:'boolean',displayName:'Enabled',group:'General',default:true},
    },
    outputs:{
        controlId:{type:'string',displayName:'Control Id',group:'General'},
        enabled:{type:'boolean',displayName:'Enabled',group:'States'}
    },
    changed:{
        enabled(value) {
            this.props.enabled = value;
            this.setOutputs({
                enabled:value
            })
        }
    },
    inputCss:{
		color: {
			index: 24,
			group: 'Text',
			displayName: 'Color',
            type: 'color',
            default:'#FFFFFF'
		},
        backgroundColor: {
            index: 100,
            displayName: 'Background Color',
            group: 'Style',
            type: 'color',
            default: '#000000'
        },
    },
	inputProps: {
        label:{type:'string',displayName:'Label',group:'General'},
        buttonType:{
            type:{name:'enum',enums:[ {label:'Button',value:'button'},{label:'Submit',value:'submit'}, {label:'Rest',value:'reset'}]},
            displayName:'Type',
            default:'button',
            group:'General'
        }
	},
	outputProps: {
        // States
        focusChanged:{type:'boolean',displayName:'Focused',group:'States'},
        hoverChanged:{type:'boolean',displayName:'Hover',group:'States'},
        pressedChanged:{type:'boolean',displayName:'Pressed',group:'States'},

        // Events
        onClick:{type:'signal',displayName:'Click',group:'Events'},
	}
}
Utils.addFontStyling(ButtonNode);
Utils.addVisibilityUtils(ButtonNode)
Utils.addBorderStyles(ButtonNode)
ButtonNode = Noodl.defineReactNode(ButtonNode);
export default ButtonNode;