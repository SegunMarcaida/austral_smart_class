import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useTheme} from "@mui/styles";

export const SearchBar = ({value, onChange, sx}) => {
    const theme = useTheme();


    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar..."
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                style: {
                    borderRadius: '8px',
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                    },
                },
                ...sx
            }}
        />
    );
};

export default SearchBar;
