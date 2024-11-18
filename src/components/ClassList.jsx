import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";
import { AccessTime, CheckCircle, Error, Autorenew } from "@mui/icons-material";
import useGetClasses from "../hooks/useGetClasses.js";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAudio } from "../context/AudioContext.jsx";
import DefaultButton from "./common/Button.jsx";

const StatusIcon = ({ status }) => {
    switch (status) {
        case "completed":
            return <CheckCircle color="success" />;
        case "running":
            return <Autorenew color="primary" />;
        case "failed":
            return <Error color="error" />;
        default:
            return <AccessTime color="action" />;
    }
};

const ClassList = ({ filters, searchValue, onResetFilters }) => {
    const { classes, loading, error } = useGetClasses();
    const [page, setPage] = useState(0);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const rowsPerPage = 12;
    const theme = useTheme();
    const navigate = useNavigate();
    const { setAudio } = useAudio();

    useEffect(() => {
        setIsFiltering(true);
        const timeoutId = setTimeout(() => {
            const filtered = classes.filter((cls) => {
                const startDateMatch = filters?.startDate ? new Date(cls.date) >= new Date(filters.startDate) : true;
                const endDateMatch = filters?.endDate ? new Date(cls.date) <= new Date(filters.endDate) : true;
                const classMatch = filters?.selectedClass ? cls.classroom === filters.selectedClass : true;
                const statusMatch = filters?.selectedStatus ? cls.status === filters.selectedStatus : true;
                const searchMatch = searchValue ? cls.audio?.toLowerCase().includes(searchValue.toLowerCase()) : true;
                return startDateMatch && endDateMatch && classMatch && statusMatch && searchMatch;
            });
            setFilteredClasses(filtered);
            setIsFiltering(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [classes, filters, searchValue]);

    const handleChangePage = (event, newPage) => {
        setIsPageLoading(true);
        setTimeout(() => {
            setPage(newPage);
            setIsPageLoading(false);
        }, 500);
    };

    const handleRowClick = (row) => {
        setAudio(row.audio);
        navigate(`/${row.id}`);
    };

    const areFiltersApplied = () => {
        return filters?.startDate || filters?.endDate || filters?.selectedClass || filters?.selectedStatus || searchValue;
    };

    if (loading || isFiltering || isPageLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">
                    Error loading classes
                </Typography>
            </Box>
        );
    }

    if (filteredClasses.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <Typography variant="h6">
                    {areFiltersApplied() ? "No hay clases que se ajusten a los filtros aplicados" : "No hay clases disponibles"}
                </Typography>
                {areFiltersApplied() && (
                    <DefaultButton variant="outlined" color="secondary" onClick={onResetFilters} sx={{ mt: 2 }}>
                        Restablecer Filtros
                    </DefaultButton>
                )}
            </Box>
        );
    }

    const paginatedData = filteredClasses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper elevation={0} sx={{ boxShadow: 'none' }}>
            <TableContainer>
                <Table sx={{ border: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Class Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Classroom</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                                    '&:hover': {
                                        backgroundColor: `${theme.palette.primary.main}20`,
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => handleRowClick(row)}
                            >
                                <TableCell>
                                    <AttachFileIcon sx={{ color: theme.palette.primary.main }} />
                                </TableCell>
                                <TableCell>{format(new Date(row.date), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{row.audio}</TableCell>
                                <TableCell>{row.classroom}</TableCell>
                                <TableCell>{<StatusIcon status={row.status} />}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={filteredClasses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                sx={{
                    '& .MuiTablePagination-actions': {
                        marginRight: theme.spacing(2),
                        color: theme.palette.primary.main,
                    },
                }}
            />
        </Paper>
    );
};

export default ClassList;