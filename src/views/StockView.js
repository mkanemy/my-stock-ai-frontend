import '../styles/StockStyle.css';
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StockCompanyDataView from '../components/StockCompanyDataView'

function StockView() {

    const {state} = useLocation();
    const { stock } = state;

    return (
        <div className="StockView">
            <StockCompanyDataView stock={stock}/>
            {/* <StockQuoteDataView data={response.financialMetrics}/> */}
            {/* <StockAdditionalDataView data={response.quoteData}/> */}
        </div>
    );
}

export default StockView;
