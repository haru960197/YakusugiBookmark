import { Autocomplete, TextField, Stack, Button, Chip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function Register({ registerWebSite, hashTags, processHashTag }) {
    const [urlInput, setUrlInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [hashTagsInput, setHashTagsInput] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function resetForm(e) {
        setUrlInput('');
        setTitleInput('');
        setHashTagsInput([]);
    }
    
    async function handleRegister(e) {
        const webSite = {
            url: urlInput,
            title: titleInput,
            hashTagNames: hashTagsInput,
            siteTitle: '',
            registerDate: '',
            accessCount: 0
        };

        // Process all the hashTags
        hashTagsInput.forEach(name => {
            processHashTag(name);
        });

        // Add register-date
        const date = new Date();
        webSite.registerDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        // Fetch the title of the web-site
        setIsLoading(true);
        try {
            const url = `https://opengraph.io/api/1.1/site/${encodeURIComponent(urlInput)}?app_id=45a56422-e9e6-475a-9605-794e9bde139a`;
            const response = await fetch(url);
            const data = await response.json();
            webSite.siteTitle = data.hybridGraph.title;
        } catch(e) {
            console.error(e);
        }
        setIsLoading(false);

        registerWebSite(webSite);
        console.log(webSite); // debug
        resetForm();
    }

    return (
        <>
            <Stack spacing={2} sx={{ width: 300 }}>
                <TextField
                    value={urlInput}
                    label="URL"
                    onChange={(e) => setUrlInput(e.target.value)}
                />
                <TextField
                    value={titleInput}
                    label="Title"
                    onChange={(e) => setTitleInput(e.target.value)}
                />
                <Autocomplete
                    value={hashTagsInput}
                    onChange={(e, newValueInput) => setHashTagsInput(newValueInput)}
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
            <LoadingButton
                sx={{ marginTop: 2 }}
                loading={isLoading}
                variant="contained"                
                onClick={handleRegister}
                disabled={!urlInput}
            >Register</LoadingButton>
        </>
    );
};