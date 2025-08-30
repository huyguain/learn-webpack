import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const menus = [
    {
        name: 'Trang Chủ',
        to: '/'
    },
    {
        name: 'Quản Lý Sản Phẩm',
        to: '/product-list'
    }
];

const MenuLink = ({ label, to }) => {
    return (
        <li className="nav-item">
            <NavLink 
                to={to}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
                {label}
            </NavLink>
        </li>
    );
};

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CALL API</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {this.showMenus(menus)}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink 
                        key={index}
                        label={menu.name}
                        to={menu.to}
                    />
                );
            });
        }
        return result;
    }

}

export default Menu;
