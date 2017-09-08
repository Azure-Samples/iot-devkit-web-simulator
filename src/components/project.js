import React, { Component } from 'react';
import { List, is, Map } from 'immutable';
import { traceEvent } from '../lib/telemetry';
import Localization from '../localization/localization';

import '../common.scss'

class Project extends Component {
    constructor(props) {
        super(props);
        let file = this.props.project.get('files').findEntry(v => v.get('type') === 'file');
        this.firstFile = file[0];
        this.state = {
            folders: {}, // collapsed,
            collapseProjectSelector: true,
            selectedFilePath: List().push(file[0]),
            configureChanged: false,
            config: this.props.project.get('config').toJS(),
            csError: false,
            withGuideCsFocus: false,
        };
        this.initState(this.state.folders, this.props.project.get('files'), true);
    }

    reportPosition = () => {
        {
            let { top, left, right, bottom, width, height } = this.refs.project.getBoundingClientRect();
            let firstFileSize = this.firstFileRef.getBoundingClientRect();
            let dotX = firstFileSize.left + firstFileSize.width / 2;
            let dotY = firstFileSize.top + firstFileSize.height / 2;
            this.props.setProjectComponentSize({
                top, left, right, bottom, width, height, dotX, dotY,
            });
        }
        {
            let { top, left, right, bottom, width, height } = this.refs.configCloud.getBoundingClientRect();
            let dotX = left + width / 2 - 20;
            let dotY = top + height / 2;
            this.props.setConfigCloudComponentSize({
                top, left, right, bottom, width, height, dotX, dotY,
            });
        } {
            let { top, left, right, bottom, width, height } = this.refs.configLocal.getBoundingClientRect();
            let csInput = this.connectionStringInput.getBoundingClientRect();
            let dotX = csInput.right - 20;
            let dotY = csInput.top + csInput.height / 2;
            this.props.setConfigLocalComponentSize({
                top, left, right, bottom, width, height, dotX, dotY,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.refs.project.getBoundingClientRect().width)
        if (!is(prevProps.project, this.props.project)) {
            let file = this.props.project.get('files').findEntry(v => v.get('type') === 'file');
            this.setState(() => {
                return {
                    config: this.props.project.get('config').toJS(),
                    selectedFilePath: List().push(file[0]),
                };
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
        this.reportPosition();
    }

    initState(state, files, root, folderName) {
        for (let [k, v] of files) {
            if (v.get('type') === 'directory') {
                this.initState(state, v.get('data'), false, k);
            }
        }
        if (!root) {
            state[folderName] = true;
            state.another = 1234;
        }
    }

    toggleFolderCollapsed = (folderName) => {
        this.setState((prev) => {
            return {
                folders: Object.assign(prev.folders, {
                    [folderName]: !prev.folders[folderName],
                }),
            }
        });
    }

    toggleProjectSelectorCollapsed = () => {
        this.setState((prev) => {
            return {
                collapseProjectSelector: !prev.collapseProjectSelector,
            }
        })
    }

    fileClicked = (path) => {
        this.setState(() => {
            return {
                selectedFilePath: path,
            }
        })
        this.props.setEditorPath(path);
        if (this.props.highlightProject) {
            this.props.nextGuideAfterProject();
        }
    }

    handleChange = (key, event) => {
        let newConfig = Object.assign({}, this.state.config, {
            [key]: event.target.value,
        })
        let configureChanged = !is(this.props.project.get('config'), Map(newConfig));
        this.setState((prev) => {
            return {
                configureChanged,
                config: newConfig,
            };
        });
        if (this.props.highlightConfigLocal || this.props.highlightError) {
            let { top, left, right, bottom, width, height } = this.refs.configLocal.getBoundingClientRect();
            let saveIcon = this.refs.saveConfig.getBoundingClientRect();
            let dotX = saveIcon.left + saveIcon.width / 2;
            let dotY = saveIcon.bottom;
            this.props.setConfigLocalComponentSize({
                top, left, right, bottom, width, height, dotX, dotY,
            });
            this.connectionStringInput.style.animation = null;
        }
    }

    revertConfig = () => {
        this.setState(() => {
            return {
                configureChanged: false,
                config: this.props.project.get('config').toJS(),
            };
        });
    }

    saveConfig = () => {
        if (! /^HostName=([^;]*);DeviceId=([^;]*);SharedAccessKey=(.*)$/.test(this.state.config.connectionString)) {
            this.setState({ csError: true });
            if (this.props.highlightConfigLocal) {
                this.props.nextGuideForConfigError();
                let { top, left, right, bottom, width, height } = this.refs.configLocal.getBoundingClientRect();
                let csInput = this.connectionStringInput.getBoundingClientRect();
                let dotX = csInput.right - 20;
                let dotY = csInput.top + csInput.height / 2;
                this.props.setConfigLocalComponentSize({
                    top, left, right, bottom, width, height, dotX, dotY,
                });
            }
            return;
        }
        if (this.props.project.get('config').get('connectionString') !== this.state.config) {
            traceEvent('cs-filled');
        }
        this.props.setProjectConfig(this.state.config);
        this.setState(() => {
            return {
                csError: false,
                configureChanged: false,
            };
        });
        if (this.props.highlightConfigLocal || this.props.highlightError) {
            this.props.nextGuideAfterConfigLocal();
        }
        this.connectionStringInput.style.animation = null;
    }

    deployClick = () => {
        traceEvent('deploy-clicked');
        if (this.props.highlightConfigCloud) {
            this.props.nextGuideAfterConfigCloud();
        }
    }

    csFocus = () => {
        {
            let { top, left, right, bottom, width, height } = this.refs.configLocal.getBoundingClientRect();
            let csInput = this.connectionStringInput.getBoundingClientRect();
            let dotX = -100;
            let dotY = -100;
            this.props.setConfigLocalComponentSize({
                top, left, right, bottom, width, height, dotX, dotY,
            });
        }
        console.log(this.connectionStringInput.style)
        this.connectionStringInput.style.animation = "border-glow 1.5s linear infinite";
    }

    renderProjects(allProjects) {
        let items = [];
        for (let [k, v] of allProjects) {
            items.push(<div key={k} className="project-item" onClick={this.props.selectProject.bind(this, k)}>{v.get('displayName')}</div>);
        }
        return items;
    }

    renderFile(key, value, path) {
        return <div ref={el => { if (path.size === 1 && path.get(0) === this.firstFile) this.firstFileRef = el; }} key={key} onClick={this.fileClicked.bind(this, path)} className={`project-file ${(is(this.state.selectedFilePath, path)) ? 'project-file-selected' : ''}`}>{key}</div>;
    }

    renderItems(files, root, folderName, path = List()) {
        let items = [];
        for (let [k, v] of files) {
            if (v.get('type') === 'file') {
                items.push(this.renderFile(k, v, path.push(k)));
            } else if (v.get('type') === 'directory') {
                items.push(this.renderItems(v.get('data'), false, k, path.push(k, 'data')));
            }
        }
        if (root) {
            return items;
        } else {
            return <div key="project-folder-container" className="project-folder-container">
                <div onClick={this.toggleFolderCollapsed.bind(this, folderName)} className={`project-folder ${this.state.folders[folderName] ? "hide-items" : "show-items"}`}><span className={this.state.folders[folderName] ? "folder-icon-collapsed" : "folder-icon-expanded"} />{folderName}</div>
                {items}
            </div>;
        }
    }

    render() {
        let deployItem;
        if (this.props.project.has('deployLink')) {
            deployItem = <div ref="configCloud" className={`configure-deploy-link`}><a onClick={this.deployClick} target="_blank" className={`${this.props.highlightConfigCloud && 'highlight'}`} href={this.props.project.get('deployLink')} ><i className="fa fa-cloud-upload" aria-hidden="true"></i>{Localization.getLocalizedString().deployButton}</a></div>
        }
        let configureItems = [];
        for (let [k, v] of this.props.project.get('config')) {
            configureItems.push(
                <div key={k} className="configure-item" >
                    <div className="configure-item-key">{k}</div>
                    <input ref={el => { if (k === 'connectionString') this.connectionStringInput = el; }} type="text"
                        onFocus={(k === 'connectionString' && (this.props.highlightConfigLocal || this.props.highlightError)) && this.csFocus}
                        className={`configure-item-value ${k === 'connectionString' && this.state.csError && 'cs-error'}`}
                        value={this.state.config[k]}
                        onChange={this.handleChange.bind(this, k)} />
                </div>
            );
        }
        return (
            <div className="project-container" >
                <div className={`current-project ${this.state.collapseProjectSelector ? "hide-items" : "show-items"}`} onClick={this.toggleProjectSelectorCollapsed}>
                    <i className={`fa ${this.state.collapseProjectSelector ? "fa-caret-down" : "fa-caret-up"}`} aria-hidden="true"></i>
                    {this.props.project.get('displayName')}
                    <div className="project-items-container" >
                        {this.renderProjects(this.props.allProjects)}
                    </div>
                </div>

                <div ref="project" className={`project-explorer ${this.props.highlightProject && 'highlight'}`} >
                    {this.renderItems(this.props.project.get('files'), true)}
                </div>

                <div ref="configLocal" className={`configure-container ${(this.props.highlightConfigLocal || this.props.highlightConfigCloud || this.props.highlightError) && 'highlight'}`} >
                    <div className="configure-container-header" >
                        <span className="configure-container-title">Configure</span>
                        <span className={`configure-button ${this.state.configureChanged ? '' : 'hide'}`}>
                            <span ref="saveConfig" onClick={this.saveConfig}><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
                            <span onClick={this.revertConfig}><i className="fa fa-undo" aria-hidden="true"></i></span>
                        </span>
                    </div>
                    {deployItem}
                    {configureItems}
                </div>
            </div>
        );
    }
}

export default Project;