import '../styles/HomeStyle.css';
import { React } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function StockCompanyInfo(companyData) {

    let stock = companyData.stock;
    companyData = companyData.companyData;

    let stockCompanyDataView = 
    (<div className="NoDataResponse">
    </div>);

    if (companyData?.name) {
        stockCompanyDataView = (
            <div className="StockCompanyDataView">
                <div className="StockTitle">
                    <div className="StockTitleImgWrapper">
                        <img src={companyData?.logo} alt="No Photo Available" className="StockTitleImg"/>
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
    } else if (companyData) {
        stockCompanyDataView = (
            <div className="NoDataResponse">
                <h2>No company data available for {stock.stock}</h2>
            </div>
        )
    }

    return (
        <div>
            {stockCompanyDataView}
        </div>
    );
}

export default StockCompanyInfo;