import { Autocomplete, TextField, Stack, Button, Chip } from "@mui/material";
import { useState } from "react";

export default function Register() {
    const [webSite, setWebSite] = useState({url: '', title: '', hashTagNames: []})
    const [hashTags, setHashTags] = useState([{name: "hoge", count: 1}, {name: "fuga", count: 3}/*{ name: '', count: 0 }*/]);

    function processHashTag(name) {
        if (hashTags.find((hashTag) => hashTag.name === name)) {
            // name is already registered.
            setHashTags(hashTags.map((hashTag) => 
                hashTag.name === name ? 
                    { name: name, count: hashTag.count + 1} :
                    hashTag
            ))
        } else {
            // register new name hashtag.
            setHashTags([
                { name: name, count: 1 },
                ...hashTags
            ]);
        }
    }

    function handleClick(e) {
        console.log(webSite);
        webSite.hashTagNames.forEach(name => {
            processHashTag(name);
        });
    }

    return (
        <>
            <Stack spacing={2} sx={{ width: 300 }}>
                <TextField
                    label="URL"
                    onChange={(e) => setWebSite({...webSite, url: e.target.value})}
                />
                <TextField
                    label="Title"
                    onChange={(e) => setWebSite({...webSite, title: e.target.value})}
                />
                <Autocomplete
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
                sx={{ marginTop: 2 }}
                variant="contained"
                onClick={handleClick}
                disabled={!webSite.url}
            >Register</Button>
        </>
    );
};