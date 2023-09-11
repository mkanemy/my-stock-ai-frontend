import '../styles/HomeStyle.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import StockCompanyInfo from '../components/StockCompanyInfo';
import StockQuoteInfo from '../components/StockQuoteInfo';
import StockAdditionalDataView from '../components/StockAdditionalDataView';
import StockNewsArticles from '../components/StockNewsArticles';
import { DotPulse } from '@uiball/loaders'

function StockCompanyDataView(stock) {

    stock = stock.stock;

    let ticker = stock.substring(0, stock.indexOf(":") - 1);
    let name = stock.substring(stock.indexOf(":") + 2, stock.toString().length)

    const [companyData, setCompanyData] = useState();
    const [financialMetrics, setFinancialMetrics] = useState();
    const [quoteData, setQuoteData] = useState();
    const [newsArticles, setNewsArticles] = useState([]);
    const [newsUrls, setNewsUrls] = useState([]);
    const [summary, setSummary] = useState();
    const navigate = useNavigate()

    let first = false;

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + 'stock/details', { params: { ticker: ticker } })
            .then(res => {
                setCompanyData(res.data.companyData);
                setFinancialMetrics(res.data.financialMetrics);
                setQuoteData(res.data.quoteData);

                getArticles(res.data)
            })
            .catch(error => {
                // TODO - Error Handling
                // setResponse("error");
                console.error(error);
            });

        function getArticles(data) {

            axios.get(process.env.REACT_APP_BACKEND_URL + 'stock/articles', { params: { ticker: ticker } })
            .then(res => {
                setNewsArticles(res.data.data);
                setNewsUrls(res.data.urls);

                getSummary(res.data.urls, data);
            })
            .catch(error => {
                // TODO - Error Handling
                // setResponse("error");
                console.error(error);
            });

        }

        function getSummary(urls, data) {
            axios.post(process.env.REACT_APP_BACKEND_URL + 'ai/summary', 
                { 
                    ticker: ticker,
                    companyName: name,
                    articles: urls,
                    quote: {
                        "currentPrice": data.quoteData?.c,
                        "open": data.quoteData?.o,
                        "high": data.quoteData?.h,
                        "low": data.quoteData?.l,
                        "marketCap": formatMarketCap(data.financialMetrics?.marketCapitalization),
                        "yield": (Math.round(data.financialMetrics?.dividendYieldIndicatedAnnual * 100) / 100) + "%",
                        "beta": Math.trunc(data.financialMetrics?.beta * 100)/100,
                        "eps": Math.round(data.financialMetrics?.epsTTM * 100) / 100,
                        "pe": Math.round(data.quoteData?.c / data.financialMetrics?.epsTTM * 100) / 100
                    }
                    })
                .then(res => {
                    setSummary(res.data.choices[0].message.content)
                })
                .catch(error => {
                    // TODO - Error Handling
                    // setResponse("error");
                    console.error(error);
                })
        }
    }, [])

    return (
        <div className="StockDataView">
            <div className="StockBackButton">
                <Button variant="text" startIcon={<ArrowBackIosNewIcon />} onClick={() => {
                    navigate('/')
                }}>
                    Back
                </Button>
            </div>
            <StockCompanyInfo companyData={companyData} stock={{stock: ticker}}/>
            <StockQuoteInfo quoteData={quoteData} stock={{stock: ticker}}/>
            <StockAdditionalDataView financialMetrics={financialMetrics} quoteData={quoteData}/>
            <div className="summaryWrapper">
                {summary ? 
                (<div className="articleSummaryWrapper">
                    <h2>Summary of Recent News:</h2>
                    <h5>{summary.substr(0, summary.indexOf('---'))}</h5>
                    <h2>Analysis of Stock - {getRecommendation(summary)}</h2>
                    <h5>{summary.substr(summary.indexOf('---') + 4, summary.length).slice(0, -1)}</h5>
                </div>) : 
                (<div className="loadingAnimationWrapper"><h4>AI Analyzing</h4> <div className="animationPulse"><DotPulse size={50} color="white" /></div></div>)}
            </div>
            <div className="StockDataChart">
                <iframe width="100%"
                        height="100%"
                        src={"https://widget.finnhub.io/widgets/stocks/chart?symbol=" + ticker + "&watermarkColor=%231db954&backgroundColor=%23222222&textColor=white"} title="Data by Finnhub Stock API">
                </iframe>
            </div>
            <StockNewsArticles newsArticles={newsArticles} stock={{stock: ticker}}/>
            <div className="disclaimer">
                <h6>Disclaimer: None of the info on this site should be used as financial advice.</h6>
            </div>
        </div>
    );
}

function getRecommendation(summary) {
    switch (summary.substr(summary.length - 1)) {
        case '1':
            return 'Strong Buy';
        case '2':
            return 'Soft Buy';
        case '3':
            return 'Hold';
        case '4':
            return 'Soft Sell';
        case '5':
            return 'Strong Sell';
        default:
            return 'N/A';
    }
}

function formatMarketCap(cap) {
    if (cap > 1000) {
        return (Math.round(cap / 10) / 100).toString() + "B"
    } else {
        return (Math.round(cap * 100) / 100).toString() + "M"
    }
}

export default StockCompanyDataView;
