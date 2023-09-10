import '../styles/StockDropdown.css';
import { React, useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function StockDropdown() {

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const loading = open && response.length === 0;
    const navigate = useNavigate()

    useEffect(() => {
        let active = true;

        if (response.length !== 0) {
            return () => {
                active = false;
            };
        }

        (async () => {
            await axios.get(process.env.REACT_APP_BACKEND_URL + "stock/available")
            .then(res => {
                setResponse(res.data.data);
            })
            .catch(error => {
                setResponse("error");
                console.error(error);
            });
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <form className="StockSelectForm">
            <Autocomplete
                id="stockSelectField"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(response, value) => response.symbol === value.symbol}
                getOptionLabel={(response) => response.symbol + " : " + response.description}
                options={response}
                loading={loading}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Stock"
                    InputProps={{
                        ...params.InputProps,
                        autoComplete: 'none',
                        endAdornment: (
                        <Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </Fragment>
                        ),
                    }}
                    />
                )}
            />
            <Button 
                variant="contained" 
                className="stockSelectBtn"
                onClick={() => {
                    if (!inputValue || inputValue === '') {
                        alert('Please Select a Stock to Analyze')
                    } else {
                        navigate('/stock', { state: { stock: inputValue } })
                    }
                }}>
                Analyze
                </Button>
        </form>
    );
}

export default StockDropdown;
