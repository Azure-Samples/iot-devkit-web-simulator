import React from 'react';

const LoadingComponent = () => <div className="loading">
        <div className="spinner-label" > Loading editor </div>
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    </div>;

export default LoadingComponent;
