import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Link,
    Button,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { useState } from 'react';

export default function ApiKeyDialog({ open, setOpen, setApiKey }) {
    const [rejected, setRejected] = useState(false);
    const [keyInput, setKeyInput] = useState("");
    const apiKeySiteUrl = "https://www.opengraph.io/";

    function handleRegister() {
        localStorage.setItem('apiKey', keyInput);
        setApiKey(keyInput);
        setKeyInput("");
        setOpen(false);
        setRejected(false);
    }

    function handleCancel() {
        if (rejected) {
            localStorage.setItem('apiKey', "rejected");
            setApiKey("rejected");
        }
        setKeyInput("");
        setOpen(false);
        setRejected(false);
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>APIキーの入力</DialogTitle>
            <DialogContent>
                <Link
                    variant="subtitle2"
                    href={apiKeySiteUrl}
                    target="_blank"
                >{apiKeySiteUrl}</Link>
                <br />
                <DialogContentText>
                上記サイトの無料プランで取得できるAPIキーを入力することで、
                登録したウェブサイトの「サムネイル・ファビコン・タイトル」を取得して表示することができます。
                </DialogContentText>
                <TextField
                    // autoFocus
                    margin="dense"
                    label="APIキー"
                    placeholder="00000000-0000-0000-0000-000000000000"
                    fullWidth
                    variant="standard"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rejected}
                            size="small"
                            onChange={(e) => setRejected(e.target.checked)}
                        />
                    }
                    label="今後このメッセージを表示しない"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>必要ない</Button>
                <Button onClick={handleRegister}>登録</Button>
            </DialogActions>
        </Dialog>
    )
}