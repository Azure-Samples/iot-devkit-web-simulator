import React, { Component } from 'react';
import Script from 'react-load-script';

import '../common.scss'

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    reportPosition = () => {
        let { top, left, right, bottom, width, height } = this.refs.editor.getBoundingClientRect();
        let dotY = -100;
        let dotX = -100;
        this.props.setComponentSize({
            top, left, right, bottom, width, height, dotX, dotY,
        });
    }

    editorDidMount = () => {
        window.require(['vs/editor/editor.main'], () => {
            this.editor = window.monaco.editor.create(document.getElementById('editor-container'), {
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
        if (prevProps.data !== this.props.data || prevProps.language !== this.props.language && this.editor) {
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
        window.addEventListener("resize", this.onResize);
    }

    onResize = () => {
        this.editor.layout();
        this.reportPosition();
    }

    render() {
        let loadComponent = <div className="loading">
            <div className="spinner-label" > Loading editor </div>
            <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        </div>;
        let editorComponent = <div ref="editor" id="editor-container" className={`editor-container ${this.props.highlight && 'highlight'}`} >
            {this.state.loading && loadComponent}
            <Script
                url="vs/loader.js"
                onLoad={this.editorDidMount}
            />
        </div>;
        return (editorComponent);
    }
}

export default Editor;