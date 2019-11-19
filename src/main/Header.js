import React, { useState } from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className='header'>
            <a href='https://libertybank.ge/' target="_blank">
                <img src={require('../assets/Logo.png')} alt='logo' />
            </a>

            {/*<div className='navRight'>
                <a className='freeCall' href='tel:555555555'>
                    <img src={require('../assets/phone.png')} alt='phone' />
                    <span> უფასო ზარი</span>
                </a>
            
                <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                    <DropdownToggle className='clickable navBtn' tag='div'>
                        <img src={require('../assets/nav.png')} alt='nav' />
                        <span className='noResp'>ნავიგაცია</span>
                    </DropdownToggle>
                    <DropdownMenu className='navMenu'>
                        <DropdownItem tag="a" href="https://libertybank.ge/ka/" target='blank'> <img src={require('../assets/liberty.png')} alt='liberty'/> Liberty.ge</DropdownItem>
                        <DropdownItem tag="a" href="https://myliberty.ge" target='blank'><img src={require('../assets/myliberty.png')} alt='myliberty'/> Myliberty</DropdownItem>
                        <DropdownItem tag="a" href="https://365.ge/" target='blank'> <img src={require('../assets/liberty.png')} alt='365.ge'/> 365.ge</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
           */}

        </header>
    )

}

export default Header;