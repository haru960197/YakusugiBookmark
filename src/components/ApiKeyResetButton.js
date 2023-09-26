import { Box } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

export default function ApiKeyResetButton({ SetDialogOpen }) {
    function handleClick() {
        SetDialogOpen(true);
    }

    return (
        <Box>
            APIキーを再設定する
            <KeyIcon
                onClick={handleClick}
                sx={{ color: 'text.primary' }}
            />
        </Box>
    )
}