import { Autocomplete, TextField, Stack, Button, Chip } from "@mui/material";
import { useState } from "react";

export default function Register({ registerWebSite, hashTags, processHashTag }) {
    const [webSite, setWebSite] = useState({url: '', title: '', hashTagNames: []})

    function resetForm(e) {
        setWebSite({url: '', title: '', hashTagNames: []});
    }
    
    function handleRegister(e) {
        webSite.hashTagNames.forEach(name => {
            processHashTag(name);
        });
        registerWebSite(webSite);
        resetForm();
    }

    return (
        <>
            <Stack spacing={2} sx={{ width: 300 }}>
                <TextField
                    value={webSite.url}
                    label="URL"
                    onChange={(e) => setWebSite({...webSite, url: e.target.value})}
                />
                <TextField
                    value={webSite.title}
                    label="Title"
                    onChange={(e) => setWebSite({...webSite, title: e.target.value})}
                />
                <Autocomplete
                    value={webSite.hashTagNames}
                    onChange={(e, newValueArray) => setWebSite({...webSite, hashTagNames: newValueArray})}
                    multiple
                    freeSolo
                    options={hashTags.map((option) => option.name)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => <TextField {...params} label="ハッシュタグ" />}
                />
            </Stack>
            <Button
                sx={{ marginTop: 2, marginRight: 2 }}
                variant="contained"
                onClick={(e) => resetForm()}
            >Reset</Button>
            <Button
                sx={{ marginTop: 2 }}
                variant="contained"                
                onClick={handleRegister}
                disabled={!webSite.url}
            >Register</Button>
        </>
    );
};