import '../styles/HomeStyle.css';
import { React } from 'react';

function StockQuoteInfo(quoteData) {

    let stock = quoteData.stock;
    quoteData = quoteData.quoteData;

    var stockQuoteDataView = (
        <div className="NoDataResponse">
        </div>
    )

    if (quoteData?.c) {
        let stockChange = 
        quoteData?.d > 0 ? (
        <h2 className="stockChangeDiv stockChangePositive">+{quoteData?.d} ({quoteData?.dp}%)</h2>
        ) : (
        <h2 className="stockChangeDiv stockChangeNegative">{quoteData?.d} ({quoteData?.dp}%)</h2>)

        stockQuoteDataView = (
            <div className="stockQuoteDataView">
                <h1>{quoteData?.c} USD</h1>
                {stockChange}
            </div>
        )
    } else {
        stockQuoteDataView = (
            <div className="NoDataResponse">
                <h2>No quote data available for {stock.stock}</h2>
            </div>
        )
    }

    return (
        <div>
            {stockQuoteDataView}
        </div>
    );
}

export default StockQuoteInfo;