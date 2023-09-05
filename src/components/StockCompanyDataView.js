import '../styles/HomeStyle.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function StockCompanyDataView(stock) {

    const [companyData, setCompanyData] = useState();
    const [financialMetrics, setFinancialMetrics] = useState();
    const [quoteData, setQuoteData] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + 'stock/details', { params: { ticker: stock?.stock } })
            .then(res => {
                setCompanyData(res.data.companyData);
                setFinancialMetrics(res.data.financialMetrics);
                setQuoteData(res.data.quoteData);
                console.log(companyData)
            })
            .catch(error => {
                // TODO - Error Handling
                // setResponse("error");
                console.error(error);
            });
    }, []);

    let stockCompanyDataView = (
        <div className="NoDataResponse">
            <h2>No company data available for {stock.stock}</h2>
        </div>
    )


    if (companyData?.name) {
        stockCompanyDataView = (
            <div className="StockCompanyDataView">
                <div className="StockTitle">
                    <div className="StockTitleImgWrapper">
                        <img src={companyData?.logo} className="StockTitleImg"/>
                    </div>
                    <div className="StockTitleText">
                        <a className="StockTitleLink" href={companyData?.weburl} target="_blank">{companyData?.name} <ArrowForwardIosIcon /></a>
                        <h5>{companyData?.exchange}</h5>
                        <h5>{companyData?.ticker}</h5>
                    </div>
                    <div className="StockTitleDisclaimer">
                        <h6>Note: All Stock Prices are in USD</h6>
                    </div>
                </div>
            </div>
        ) 
    }

    let stockQuoteDataView = (
        <div className="NoDataResponse">
            <h2>No quote data available for {stock.stock}</h2>
        </div>
    )

    let stockChange = 
    quoteData?.d > 0 ? (
    <h2 className="stockChangeDiv stockChangePositive">+{quoteData?.d} ({quoteData?.dp}%)</h2>
    ) : (
    <h2 className="stockChangeDiv stockChangeNegative">{quoteData?.d} ({quoteData?.dp}%)</h2>)

    if (quoteData?.c) {
        stockQuoteDataView = (
            <div className="stockQuoteDataView">
                <h1>{quoteData?.c} USD</h1>
                {stockChange}
            </div>
        )
    }

    let stockAdditionalDataView = (
        <div className="StockAdditionalDataView">
        </div>
    )

    if (financialMetrics?.marketCapitalization && quoteData?.c) {
        stockAdditionalDataView = (
            <div className="StockAdditionalDataView">
                <div className="StockAdditionalDataRow">
                    <div className="StockAdditionalDataComponent">
                        <h3>Open </h3><h4>{quoteData?.o}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>High </h3><h4>{quoteData?.h}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>Low </h3><h4>{quoteData?.l}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>Market Cap </h3><h4>{formatMarketCap(financialMetrics?.marketCapitalization)}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>Div Yield </h3><h4>{Math.trunc(financialMetrics?.dividendYieldIndicatedAnnual * 100) / 100}%</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>52 Week Range </h3><h4>{financialMetrics['52WeekHigh']}-{financialMetrics['52WeekLow']}</h4>
                    </div>
                </div>
                <div className="StockAdditionalDataRow">
                    <div className="StockAdditionalDataComponent">
                        <h3>Beta </h3><h4>{Math.trunc(financialMetrics?.beta * 100)/100}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>Low </h3><h4>{quoteData?.l}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>Market Cap </h3><h4>{formatMarketCap(financialMetrics?.marketCapitalization)}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>Div Yield </h3><h4>{Math.trunc(financialMetrics?.dividendYieldIndicatedAnnual * 100) / 100}%</h4>
                    </div>
                </div>
            </div>)
    }

    return (
        <div className="StockDataView">
            <div className="StockBackButton">
                <Button variant="text" startIcon={<ArrowBackIosNewIcon />} onClick={() => {
                    navigate('/')
                }}>
                    Back
                </Button>
            </div>
            {stockCompanyDataView}
            {stockQuoteDataView}
            {stockAdditionalDataView}
            <div className="StockDataChart">
                <iframe width="100%"
                        height="100%"
                        src={"https://widget.finnhub.io/widgets/stocks/chart?symbol=" + stock?.stock + "&watermarkColor=%231db954&backgroundColor=%23222222&textColor=white"} title="Data by Finnhub Stock API">
                </iframe>
            </div>
        </div>
    );
}

function formatMarketCap(cap) {
    if (cap > 1000) {
        return (Math.trunc(cap / 10) / 100).toString() + "B"
    } else {
        return (Math.trunc(cap * 100) / 100).toString() + "M"
    }
}

export default StockCompanyDataView;
