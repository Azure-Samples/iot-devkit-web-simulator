import React, { Component } from 'react';
import Script from 'react-load-script';

import '../common.scss'

class Editor extends Component {
    constructor(props) {
        super(props);
    }

    editorDidMount = () => {
        window.require(['vs/editor/editor.main'], () => {
            this.editor = window.monaco.editor.create(document.getElementById('editor-container'), {
                value: this.props.data,
                language: this.props.language,
                readOnly: true,
                folding: true,
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data || prevProps.language !== this.props.language && this.editor) {
            this.editor.setValue(this.props.data);
            this.editor.updateOptions({
                language: this.props.language,
            });
        }
    }

    componentDidMount() {
        let { top, left, right, bottom, width, height } = this.refs.editor.getBoundingClientRect();
        let dotY = top + 50;
        let dotX = left + width -50;
        this.props.setComponentSize({
            top, left, right, bottom, width, height, dotX, dotY,
        });
    }

    render() {
        return (
            <div ref="editor" id="editor-container" className={`editor-container ${this.props.highlight && 'highlight'}`} >
                <Script
                    url="vs/loader.js"
                    onLoad={this.editorDidMount}
                />
            </div>
        );
    }
}

export default Editor;