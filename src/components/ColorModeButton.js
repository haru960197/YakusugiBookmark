import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ColorModeButton({ toggleColorMode }) {
    const theme = useTheme();

    return (
        <Box sx={{ marginTop: 1, marginBottom: 0, mx: 2 }}>
            テーマ
            <IconButton
                onClick={() => toggleColorMode()}
                sx={{ color: 'text.primary' }}
            >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness3Icon />}
            </IconButton>
        </Box>
    );
}