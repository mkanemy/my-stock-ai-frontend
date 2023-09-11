import '../styles/HomeStyle.css';
import { React } from 'react';
import NewsArticle from '../components/NewsArticle';

function StockNewsArticles(newsArticles) {

    let stock = newsArticles.stock;
    newsArticles = newsArticles.newsArticles;

    var stockNewsArticlesView = [];

    if (newsArticles.length >= 1) {
        newsArticles.forEach((item, index, arr) => {
            stockNewsArticlesView.push(<NewsArticle article={item}/>)
        })
    } else if (newsArticles) {
        stockNewsArticlesView = (
            <div className="NoDataResponse">
                No News Articles Found for {stock.stock}
            </div>
        )
    }

    return (
        <>
            <h3 className="NewsArticleWrapTitle">News Articles Used for Summary and Analysis:</h3>
            <div className="NewsArticleWrapper">
                {stockNewsArticlesView}
            </div> 
        </>
    );
}

export default StockNewsArticles;
