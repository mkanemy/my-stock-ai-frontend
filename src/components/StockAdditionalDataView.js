import '../styles/HomeStyle.css';
import { React } from 'react';

function StockAdditionalDataView(financialMetrics, quoteData) {

    quoteData = financialMetrics.quoteData;
    financialMetrics = financialMetrics.financialMetrics;

    var stockAdditionalDataView = (
        <div className="StockAdditionalDataView">
        </div>
    )

    if (financialMetrics && quoteData) {
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
                        <h3>Div Yield </h3><h4>{Math.round(financialMetrics?.dividendYieldIndicatedAnnual * 100) / 100}%</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>52 Week Range </h3><h4>{financialMetrics['52WeekHigh']}-{financialMetrics['52WeekLow']}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>Beta </h3><h4>{Math.trunc(financialMetrics?.beta * 100)/100}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>EPS </h3><h4>{Math.round(financialMetrics?.epsTTM * 100) / 100}</h4>
                    </div>
                    <div className="StockAdditionalDataComponent">
                        <h3>PE </h3><h4>{Math.round(quoteData?.c / financialMetrics?.epsTTM * 100) / 100}</h4>
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
        return (Math.round(cap / 10) / 100).toString() + "B"
    } else {
        return (Math.round(cap * 100) / 100).toString() + "M"
    }
}

export default StockAdditionalDataView;