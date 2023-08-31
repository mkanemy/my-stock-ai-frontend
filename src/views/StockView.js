import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function StockView() {

    const {state} = useLocation();
    const { stock } = state;

    const [response, setResponse] = useState();

    useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + 'stock/details', { params: { ticker: stock } })
        .then(res => {
            setResponse(res.data);
        })
        .catch(error => {
            setResponse("error");
            console.error(error);
        });
    }, []);

    return (
        <div className="StockView">
            {stock}
            {JSON.stringify(response)}
        </div>
    );
}

export default StockView;
