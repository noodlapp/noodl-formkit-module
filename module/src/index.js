import Noodl from '@noodl/noodl-sdk'
import CheckBox from './checkbox'
import RadioButton from './radiobutton'
import RadioButtonGroup from './radiobuttongroup'
import TextInput from './textinput'
import DateInput from './dateinput'
import Options from './options'
import Label from './label'
import Form from './form'
import FieldSet from './fieldset'
import Button from './button'
import Range from './range'
import Validate from './validate'

import '../assets/styles.css'

Noodl.defineModule({
    reactNodes: [
		CheckBox,
		RadioButton,
		RadioButtonGroup,
		TextInput,
		DateInput,
		Options,
		Label,
		Form,
		FieldSet,
		Button,
		Range
    ],
    nodes:[
		Validate
    ],
    setup() {
    	//this is called once on startup
    }
});