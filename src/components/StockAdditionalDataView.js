import '../styles/HomeStyle.css';
import { React } from 'react';

function StockAdditionalDataView(financialMetrics, quoteData) {

    quoteData = financialMetrics.quoteData;
    financialMetrics = financialMetrics.financialMetrics;

    var stockAdditionalDataView = (
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
        <div>
            {stockAdditionalDataView}
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

export default StockAdditionalDataView;