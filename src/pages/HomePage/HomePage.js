import React, { Component } from 'react';
import TestImage from '../../components/TestImage/TestImage';

class HomePage extends Component {
    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <h1 className="display-4 text-primary">Trang Chủ</h1>
                        <p className="lead">Chào mừng bạn đến với ứng dụng React + Bootstrap 5</p>
                        <TestImage />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
