import '../styles/HomeStyle.css';
import { React, useState, useEffect, Fragment } from 'react';
import StockDropdown from '../components/StockDropdown';
import HomeTitleComponent from '../components/HomeTitleComponent';

function HomeView() {

    return (
        <div className="App">
            {/* <HomeHeaderComponent /> */}
            <HomeTitleComponent />
            <StockDropdown />
        </div>
    );
}

export default HomeView;
