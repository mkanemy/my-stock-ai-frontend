import '../styles/HomeStyle.css';
import { React, useState, useEffect, Fragment } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function NewsArticle(article) {

    article = article.article;

    console.log(article);

    return (
        <Card variant="outlined" className="NewsArticle">
            <CardContent>
                <Typography className="articleTitle" variant="h7" component="div">
                    {article.title}
                </Typography>
                <Typography className="articleDescription">
                    {article.description}
                </Typography>
            </CardContent>
            <CardActions className="articleLink">
                <a href={article.link} size="small">READ MORE</a>
            </CardActions>
        </Card>
    );
}

export default NewsArticle;
