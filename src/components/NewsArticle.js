import '../styles/HomeStyle.css';
import { React, useState, useEffect, Fragment } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function NewsArticle(article) {

    const MAX_ARTICLE_LENGTH = 200;

    article = article.article;

    return (
        <Card variant="outlined" className="NewsArticle">
            <CardContent>
                <Typography className="articleTitle" variant="h7" component="div">
                    {article.title}
                </Typography>
                <Typography className="articleDescription">
                    {article.description.length > MAX_ARTICLE_LENGTH ? article.description.substring(0,MAX_ARTICLE_LENGTH) + "..." : article.description}
                </Typography>
            </CardContent>
            <CardActions className="articleLink">
                <a href={article.article_url} size="small">READ MORE</a>
            </CardActions>
        </Card>
    );
}

export default NewsArticle;
