import React, { Component } from 'react';
import Script from 'react-load-script';
import LoadingComponent from './items/loading';

import '../common.scss'

class Editor extends Component {

    editorContainer = null;

    state = {
        loading: true,
    };

    reportPosition = () => {
        let { top, left, right, bottom, width, height } = this.editorContainer.getBoundingClientRect();
        let dotY = -100;
        let dotX = -100;
        this.props.setComponentSize({
            top, left, right, bottom, width, height, dotX, dotY,
        });
    }

    editorDidMount = () => {
        window.require(['vs/editor/editor.main'], () => {
            this.editor = window.monaco.editor.create(this.editorContainer, {
                value: this.props.data,
                language: this.props.language,
                readOnly: true,
                folding: true,
            });
            this.setState({
                loading: false,
            });
        });
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.data !== this.props.data || prevProps.language !== this.props.language) && this.editor) {
            this.editor.setValue(this.props.data);
            this.editor.updateOptions({
                language: this.props.language,
            });
        }
    }

    componentDidMount() {
        this.reportPosition();
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    onResize = () => {
        this.editor.layout();
        this.reportPosition();
    }

    render() {
        return <div ref={(ref) => this.editorContainer = ref}
            className={`editor-container ${this.props.highlight && 'highlight'}`} >
            {this.state.loading && <LoadingComponent />}
            <Script
                url="vs/loader.js"
                onLoad={this.editorDidMount}
            />
        </div>;
    }
}

export default Editor;