import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import TranscriptTab from './TranscriptTab';
import SummaryTab from './SummaryTab';
import ChatbotTab from './ChatbotTab';
import useProcessedClass from "../hooks/useProcessedClass.js";
import Breadcrumb from './common/Breadcrumb.jsx';
import { useAudio } from '../context/AudioContext.jsx';
import {useParams} from "react-router-dom";

const TabsComponent = () => {
    const { id } = useParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const { audio } = useAudio();

    const { classData, processedClass, error, loading } = useProcessedClass(id);

    const handleListItemClick = (index) => {
        setSelectedTab(index);
    };

    const className = audio;

    return (
        <Box sx={{ display: 'flex', height: '90%', marginTop: '84.97px' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#2C308D',
                        color: '#fff',
                        top: '84.97px',
                        height: 'calc(100% - 84.97px)',
                    },
                }}
            >
                <List>
                    <ListItem
                        button
                        selected={selectedTab === 0}
                        onClick={() => handleListItemClick(0)}
                        sx={{
                            marginBottom: 2,
                            fontSize: '1.5rem',
                            backgroundColor: selectedTab === 0 ? '#1A1D6C' : 'inherit',
                            '&:hover': {
                                backgroundColor: '#3A3D9C',
                            }
                        }}
                    >
                        <ListItemText
                            primary="Transcripción"
                            sx={{
                                fontSize: '1.2rem',
                                color: '#fff', '& .MuiTypography-root': { color: '#fff' },
                                ml:2
                            }}
                        />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedTab === 1}
                        onClick={() => handleListItemClick(1)}
                        sx={{
                            cursor: 'pointer',
                            marginBottom: 2,
                            fontSize: '1.5rem',
                            backgroundColor: selectedTab === 1 ? '#1A1D6C' : 'inherit',
                            '&:hover': {
                                backgroundColor: '#3A3D9C',
                            }
                        }}
                    >
                        <ListItemText
                            primary="Resumen"
                            sx={{
                                cursor: 'pointer',
                                fontSize: '1.2rem', color: '#fff',
                                '& .MuiTypography-root': { color: '#fff' },
                                ml:2
                            }}
                        />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedTab === 2}
                        onClick={() => handleListItemClick(2)}
                        sx={{
                            cursor: 'pointer',
                            marginBottom: 2,
                            fontSize: '1.5rem',
                            backgroundColor: selectedTab === 2 ? '#1A1D6C' : 'inherit',
                            '&:hover': {
                                backgroundColor: '#3A3D9C',
                            },
                        }}
                    >
                        <ListItemText
                            primary="Chatbot"
                            sx={{
                                fontSize: '1.2rem', color: '#fff',
                                '& .MuiTypography-root': { color: '#fff' },
                                ml:2
                            }}
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Box sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
                <Breadcrumb className={className} />
                {selectedTab === 0 && (
                    <TranscriptTab transcript={processedClass?.audio_text} loading={loading} error={error}/>
                )}
                {selectedTab === 1 && (
                    <SummaryTab summary={processedClass?.summary_text} loading={loading} error={error} />
                )}
                {selectedTab === 2 && (
                    <ChatbotTab classId={classData?.id} loadingEmbeddings={loading} errorEmbeddings={error} />
                )}
            </Box>
        </Box>
    );
};

export default TabsComponent;