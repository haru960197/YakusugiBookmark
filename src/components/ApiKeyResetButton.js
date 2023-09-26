import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';

export default function ApiKeyResetButton({ setDialogOpen }) {
    function handleClick() {
        setDialogOpen(true);
    }

    return (
        <Box sx={{ mx: 2 }}>
            APIキーを再設定する
            <IconButton
                onClick={handleClick}
                sx={{ color: 'text.primary' }}
            >
                <KeyIcon />
            </IconButton>
        </Box>
    )
}