
/*
        color: {
            index: 24,
            group: 'Text',
            displayName: 'Color',
            type: 'color'
        },
        letterSpacing: {
            index: 25,
            group: 'Text',
            displayName: 'Letter Spacing',
            type: 'number'
        },
        lineHeight: {
            index: 26,
            group: 'Text',
            displayName: 'Line Height',
            type: 'number',
            onChange() {
                if(this.props.textStyle) {
                    this.forceUpdate();
                }
            }
        },*/
/*
function _addBorderStyling(def) {
    def.inputCss = Object.assign(def.inputCss||{},{
        borderRadius: {
            index: 202,
            displayName: 'Border Radius',
            group: 'Style',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            default: 0,
            applyDefault: false
        },
        borderStyle: {
            index: 203,
            displayName: 'Border Style',
            group: 'Style',
            type: {
                name: 'enum',
                enums: [
                    {label: 'None', value: 'none'},
                    {label: 'Solid', value: 'solid'},
                    {label: 'Dotted', value: 'dotted'},
                    {label: 'Dashed', value: 'dashed'}
                ]
            },
            default: 'none',
            applyDefault: false
        },
        borderWidth: {
            index: 204,
            displayName: 'Border Width',
            group: 'Style',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            default: 0,
            applyDefault: false
        },
        borderColor: {
            index: 205,
            displayName: 'Border Color',
            group: 'Style',
            type: 'color'
        }	
    })
}*/

function addFontStyling(def) {
    def.inputs = Object.assign(def.inputs || {}, {
        textStyle: {
            index: 19,
            type: 'textStyle',
            group: 'Text',
            displayName: 'Text Style',
            default: 'None',
        },
        fontFamily: {
            index: 20,
            type: 'font',
            group: 'Text',
            displayName: 'Font Family',
        },
    })

    def.inputCss = Object.assign(def.inputCss || {}, {
        fontSize: {
            index: 21,
            group: 'Text',
            displayName: 'Font Size',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            onChange() {
                if (this.props.textStyle) {
                    this.forceUpdate();
                }
            }
        },
    })

    def.changed = Object.assign(def.changed || {}, {
        fontFamily(value) {
            if (value) {
                let family = value;
                if (family.split('.').length > 1) {
                    family = family.replace(/\.[^/.]+$/, "");
                    family = family.split('/').pop();
                }
                this.setStyle({ fontFamily: family });
            }
            else {
                this.removeStyle(['fontFamily']);
            }

            if (this.props.textStyle) {
                this.forceUpdate();
            }
        },
        items(newValue) {
            if (this._items !== newValue && this._items !== undefined) {
                this._items.off('change', this._itemsChanged);
            }
            this._items = newValue;
            this._items.on('change', this._itemsChanged)

            this.props.items = this._items;
        }
    })
}

function addVisibilityUtils(def) {
    def.inputCss = Object.assign(def.inputCss || {}, {
        opacity: {
            index: 200,
            group: 'Style',
            displayName: 'Opacity',
            type: 'number',
            default: 1
        }
    })

    def.inputs = Object.assign(def.inputs || {}, {
        visible: {
            index: 210,
            displayName: 'Visible',
            group: 'Style',
            default: true,
            type: 'boolean'
        },
        zIndex: {
            index: 211,
            displayName: 'zIndex',
            group: 'Style',
            type: 'number'
        }
    })

    def.changed = Object.assign(def.changed || {}, {
        visible(value) {
            if (value) {
                this.removeStyle(['visibility']);
            }
            else {
                this.setStyle({ visibility: 'hidden' });
            }
        },
        zIndex(value) {
            if (value === undefined) {
                this.removeStyle(['zIndex']);
            }
            else {
                this.setStyle({ zIndex: Number(value) });
            }
        }
    })
}

function addBorderStyles(def) {
    def.inputCss = Object.assign(def.inputCss || {}, {
        borderRadius: {
            index: 202,
            displayName: 'Border Radius',
            group: 'Style',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            default: 0,
            applyDefault: false
        },
        borderStyle: {
            index: 203,
            displayName: 'Border Style',
            group: 'Style',
            type: {
                name: 'enum',
                enums: [
                    {label: 'None', value: 'none'},
                    {label: 'Solid', value: 'solid'},
                    {label: 'Dotted', value: 'dotted'},
                    {label: 'Dashed', value: 'dashed'}
                ]
            },
            default: 'none',
            applyDefault: false
        },
        borderWidth: {
            index: 204,
            displayName: 'Border Width',
            group: 'Style',
            type: {
                name: 'number',
                units: ['px'],
                defaultUnit: 'px'
            },
            default: 0,
            applyDefault: false
        },
        borderColor: {
            index: 205,
            displayName: 'Border Color',
            group: 'Style',
            type: 'color'
        }
    })
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000) .toString(16) .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4();
  }

export default {
    addFontStyling,
    addVisibilityUtils,
    addBorderStyles,
    guid
}