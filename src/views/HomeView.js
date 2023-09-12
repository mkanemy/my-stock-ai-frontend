import '../styles/HomeStyle.css';
import { React, useState, useEffect, Fragment } from 'react';
import StockDropdown from '../components/StockDropdown';
import HomeTitleComponent from '../components/HomeTitleComponent';
import HomeCodeReference from '../components/HomeCodeReference';

function HomeView() {

    return (
        <div className="App">
            {/* <HomeHeaderComponent /> */}
            <HomeTitleComponent />
            <StockDropdown />
            <HomeCodeReference />
        </div>
    );
}

export default HomeView;
