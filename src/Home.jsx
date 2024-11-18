import {Box, CircularProgress, Typography} from "@mui/material";
import SearchBar from "./components/common/Searchbar.jsx";
import {useState, useEffect} from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import ClassList from "./components/ClassList.jsx";
import FilterDrawer from "./components/FilterDrawer.jsx";
import DefaultButton from "./components/common/Button.jsx";
import useGetClasses from "./hooks/useGetClasses.js";
import {useAudio} from "./context/AudioContext.jsx";

const Home = () => {
    const {classes, loading, error} = useGetClasses();
    const [searchValue, setSearchValue] = useState('');
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const {setAudio} = useAudio();

    useEffect(() => {
        const classWithAudio = classes.find(cls => cls.audio);
        if (classWithAudio) {
            setAudio(classWithAudio.audio);
        }
    }, [classes, setAudio]);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <Box sx={{height: '85%', width: 'calc(100% - 100px) !important', margin: '0 50px'}} gap={'20px'}>
            <Typography variant="h4" mt={4} gutterBottom sx={{color: 'text.primary'}} textAlign={'left'}>
                Clases Subidas
            </Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 4,
                mt: 4,
                width: '100%',
                justifyContent: 'space-between'
            }}>
                <SearchBar
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    sx={{width: '90%'}}
                />
                <DefaultButton
                    startIcon={<FilterListIcon/>}
                    onClick={() => setIsFilterDrawerOpen(true)}
                    sx={{ width: '120px', height: '56px' }}
                >
                    Filtro
                </DefaultButton>
            </Box>
            {
                loading ?
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                        <CircularProgress/>
                    </Box>

                    :
                    error ?
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                            <Typography variant="h6" color="error">
                                Error loading classes
                            </Typography>
                        </Box>
                        :
                        <ClassList
                            filters={filters}
                            searchValue={searchValue}
                            onResetFilters={() => {
                                setFilters({})
                                setSearchValue('')
                            }
                            }
                        />
            }
            <FilterDrawer
                open={isFilterDrawerOpen}
                onClose={() => setIsFilterDrawerOpen(false)}
                onApplyFilters={handleApplyFilters}
                classes={classes}
                filters={filters}
            />
        </Box>
    );
};

export default Home;