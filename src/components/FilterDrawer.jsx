import {useEffect, useState} from 'react';
import {
    Drawer,
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DefaultButton from "./common/Button.jsx";
import { es } from 'date-fns/locale';

const statusMap = {
    'Completado': 'completed',
    'En curso': 'running',
    'Fallido': 'failed',
};

const FilterDrawer = ({ open, onClose, onApplyFilters, classes, filters }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        if (filters) {
            setStartDate(filters.startDate);
            setEndDate(filters.endDate);
            setSelectedClass(filters.selectedClass);
            setSelectedStatus(filters.selectedStatus);
            setSearchValue(filters.searchValue);
        }
    },[filters])


    const handleApplyFilters = () => {
        const filtersToApply = {
            startDate,
            endDate,
            selectedClass,
            selectedStatus: statusMap[selectedStatus],
            searchValue
        };
        onApplyFilters(filtersToApply);
        onClose();
    };

    const handleResetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSelectedClass('');
        setSelectedStatus('');
        setSearchValue('');
        const filtersToApply = {
            startDate: null,
            endDate:null,
            selectedClass:'',
            selectedStatus: '',
            searchValue: ''
        };
        onApplyFilters(filtersToApply);
        onClose();

    };

    const uniqueClassrooms = [...new Set(classes?.map(cls => cls.classroom))];

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 500, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 5, mt: 5 }}>
                    Filtrar Clases
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                    <Box sx={{ mb: 2, display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <DatePicker
                            label="Fecha de Inicio"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <DatePicker
                            label="Fecha de Fin"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Box>
                </LocalizationProvider>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Clase</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        label="Clase"
                    >
                        <MenuItem value=""><em>Sin Seleccionar</em></MenuItem>
                        {uniqueClassrooms.map((classroom) => (
                            <MenuItem key={classroom} value={classroom}>{classroom}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        label="Estado"
                    >
                        <MenuItem value=""><em>Sin Seleccionar</em></MenuItem>
                        {Object.keys(statusMap).map((status) => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Buscar"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Box sx={{ mt: 'auto', mb: 2, display:'flex', flexDirection: 'column' }}>
                    <DefaultButton variant="contained" color="primary" onClick={handleApplyFilters} fullWidth sx={{ mb: 2 }}>
                        Aplicar Filtros
                    </DefaultButton>
                    <DefaultButton variant="outlined" color="secondary" onClick={handleResetFilters} fullWidth sx={{ mb: 2 }}>
                        Restablecer Filtros
                    </DefaultButton>
                </Box>
            </Box>
        </Drawer>
    );
};

export default FilterDrawer;