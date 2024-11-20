import { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    List,
    ListItem,
    Paper,
    Typography,
    Avatar, CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useChatbot from '../hooks/useChatbot';
import australitoImage from '../assets/australito_full.png';
import australitoAvatar from '../assets/australito_avatar.png';


const styles = {
    userBubble: {
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: '#FFFFFF',
        alignSelf: 'flex-end',
        borderRadius: '16px 16px 0px 16px',
        padding: '8px 12px',
        maxWidth: '70%',
        wordWrap: 'break-word',
        marginBottom: '8px',
    },
    botBubble: {
        backgroundColor: '#E5E5EA',
        color: '#000000',
        alignSelf: 'flex-start',
        borderRadius: '16px 16px 16px 0px',
        padding: '8px 12px',
        maxWidth: '70%',
        wordWrap: 'break-word',
        marginBottom: '8px',
        position: 'relative',
    },
    avatar: {
        width: 32,
        height: 32,
        position: 'absolute',
        bottom: -8,
        left: -40,
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
        overflow: 'hidden',
    },
    messageList: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: '16px',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderTop: '1px solid #ddd',
    },
    emptyChatContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
};

const TypingIndicator = () => (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' }}>
        <Typography sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            Escribiendo
            <span className="dot-1">.</span>
            <span className="dot-2">.</span>
            <span className="dot-3">.</span>
        </Typography>
    </Box>
);


const ChatbotTab = ({ classId, loadingEmbeddings, errorEmbeddings }) => {
    const { messages, sendMessage, loading } = useChatbot(classId);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (loadingEmbeddings) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress /></Box>;
    if (errorEmbeddings) return <div>{errorEmbeddings}</div>;

    const handleSend = () => {
        if (input.trim() && !loading) {
            sendMessage(input);
            setInput('');
        }
    };

    return (
        <Paper sx={styles.chatContainer}>
            <List sx={styles.messageList}>
                {messages.length === 0 ? (
                    <Box sx={styles.emptyChatContainer}>
                        <img src={australitoImage} alt="Australito" style={styles.image} />
                        <Typography sx={{ marginTop: 2 }}>
                            Hola, Soy Australito! Estoy acá para ayudarte con tus dudas de la clase, pregunta lo que quieras!
                        </Typography>
                    </Box>
                ) : (
                    messages.map((msg, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                ml:  msg.sender === 'user' ? 0 : 5,
                                width: msg.sender === 'user' ? 'auto' : '80%',
                            }}
                        >
                            <Box sx={msg.sender === 'user' ? styles.userBubble : styles.botBubble}>
                                {msg.sender !== 'user' && (
                                    <Avatar src={australitoAvatar} alt="Australito Avatar" sx={styles.avatar} />
                                )}
                                <Typography
                                    sx={{color: msg.sender === 'user' ? '#FFFFFF !important': '#000 !important'}}
                                >
                                    {msg.text}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))
                )}
                {loading && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </List>

            <Box sx={styles.inputContainer}>
                <TextField
                    variant="outlined"
                    placeholder="Escribe un mensaje..."
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={loading}
                />
                <IconButton
                    color="primary"
                    onClick={handleSend}
                    sx={{ marginLeft: '8px' }}
                    disabled={loading || !input.trim()}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ChatbotTab;