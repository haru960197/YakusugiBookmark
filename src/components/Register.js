import { Autocomplete, TextField, Stack, Button, Chip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function Register({ registerWebSite, hashTags }) {
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
            imageURL: '',
            faviconURL: '',
            siteTitle: '',
            registerDate: '',
            accessCount: 0
        };

        // '#~~~' -> '~~~'
        webSite.hashTagNames = webSite.hashTagNames.map((hashTagName) => {
            if (hashTagName.startsWith('#')) {
                return hashTagName.slice(1, hashTagName.length);
            } else {
                return hashTagName;
            }
        })

        // Add register-date
        const date = new Date();
        webSite.registerDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        // Fetch the title of the web-site
        setIsLoading(true);
        try {
            const url = `https://opengraph.io/api/1.1/site/${encodeURIComponent(urlInput)}?app_id=45a56422-e9e6-475a-9605-794e9bde139a`;
            const response = await fetch(url);
            const data = await response.json();
            webSite.imageURL = data.hybridGraph.image;
            webSite.faviconURL = data.hybridGraph.favicon;
            webSite.siteTitle = data.hybridGraph.title;
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);

        registerWebSite(webSite);
        resetForm();
    }

    return (
        <Stack spacing={2} sx={{ margin: 4 }}>
            <TextField
                value={urlInput}
                label="URL"
                size="small"
                onChange={(e) => setUrlInput(e.target.value)}
            />
            <TextField
                value={titleInput}
                label="タイトル"
                size="small"
                onChange={(e) => setTitleInput(e.target.value)}
            />
            <Autocomplete
                value={hashTagsInput}
                size="small"
                onChange={(e, newValueInput) => setHashTagsInput(newValueInput)}
                multiple
                freeSolo
                options={hashTags.map((option) => option.name)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => <TextField {...params} label="#タグ" />}
            />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                    variant="contained"
                    onClick={(e) => resetForm()}
                >リセット</Button>
                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    onClick={handleRegister}
                    disabled={!urlInput}
                >追加</LoadingButton>
            </Stack>
        </Stack>
    );
};