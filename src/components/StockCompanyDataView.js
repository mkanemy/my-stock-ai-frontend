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

function StockCompanyDataView(stock) {

    stock = stock.stock;

    let ticker = stock.substring(0, stock.indexOf(":") - 1);

    const [companyData, setCompanyData] = useState();
    const [financialMetrics, setFinancialMetrics] = useState();
    const [quoteData, setQuoteData] = useState();
    const [newsArticles, setNewsArticles] = useState([]);
    const [newsUrls, setNewsUrls] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + 'stock/details', { params: { ticker: ticker } })
            .then(res => {
                setCompanyData(res.data.companyData);
                setFinancialMetrics(res.data.financialMetrics);
                setQuoteData(res.data.quoteData);
            })
            .catch(error => {
                // TODO - Error Handling
                // setResponse("error");
                console.error(error);
            });

        axios.get(process.env.REACT_APP_BACKEND_URL + 'stock/articles', { params: { ticker: stock.replace(/ :/g, '') } })
            .then(res => {
                setNewsArticles(res.data.data);
                setNewsUrls(res.data.urls);
            })
            .catch(error => {
                // TODO - Error Handling
                // setResponse("error");
                console.error(error);
            });
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
            <div className="StockDataChart">
                <iframe width="100%"
                        height="100%"
                        src={"https://widget.finnhub.io/widgets/stocks/chart?symbol=" + ticker + "&watermarkColor=%231db954&backgroundColor=%23222222&textColor=white"} title="Data by Finnhub Stock API">
                </iframe>
            </div>
            <StockNewsArticles newsArticles={newsArticles} stock={{stock: ticker}}/>
        </div>
    );
}

export default StockCompanyDataView;
