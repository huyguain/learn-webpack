import React from 'react';
import testImage from '../../test-image.png';

const TestImage = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Test File Loader</h3>
                <img src={testImage} alt="Test" className="img-fluid rounded" style={{ width: '100px', height: '100px' }} />
                <p className="card-text mt-2">Ảnh này được load bằng file-loader</p>
            </div>
        </div>
    );
};

export default TestImage;
