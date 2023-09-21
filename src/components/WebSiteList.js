import {
    List,
    ListItem,
    Typography,
    Link,
    Box,
    TextField,
    Autocomplete,
    Chip,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Stack,
    Switch
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from 'react';

function WebSiteListItem({ webSite, deleteWebSite }) {
    return (
        <ListItem>
            <Typography variant="h4">{webSite.title}</Typography>
            {webSite.hashTagNames.map((name, i) => 
                <Typography key={`${webSite.name}-hashtags-${i}`} variant="subtitle2">{name}</Typography>
            )}
            <Typography vairant="subtitle1">{webSite.registerDate}</Typography>
            <Link variant="h6" href={webSite.url} target="_blank">{webSite.siteTitle}</Link>
            <DeleteOutlineOutlinedIcon onClick={(e) => deleteWebSite(webSite)}/>
        </ListItem>
    );
}

function filterList(webSites, title, hashTags) {
    let filterdList = [...webSites];

    // filter by title
    filterdList = filterdList.filter((webSite) => webSite.title.includes(title));

    // filter by hashTags
    filterdList = filterdList.filter((webSite) => {
        let hasAllTheHashTags = true;
        hashTags.forEach((hashTag) => {
            if (!webSite.hashTagNames.includes(hashTag)) {
                hasAllTheHashTags = false;
            }
        })
        return hasAllTheHashTags;
    });

    return filterdList;
}

function sortList(webSites, sortOrder, isDESC) {
    const sortedList = [...webSites];
    if (sortOrder === 'date') {
        sortedList.sort((a, b) => {
            const dateOfB = parseInt(b.registerDate.split('-').join(''), 10);
            const dateOfA = parseInt(a.registerDate.split('-').join(''), 10);
            return dateOfB - dateOfA;
        });
    } else {
        sortedList.sort((a, b) => b.accessCount - a.accessCount);
    }
    if (!isDESC) sortedList.reverse();
    return sortedList;
}

export default function WebSiteList({ hashTagList, webSites, deleteWebSite }) {
    const [filterdList, setFilterdList] = useState([]);
    const [title, setTitle] = useState('');
    const [hashTags, setHashTags] = useState([]);
    useEffect(
        () => setFilterdList(filterList(webSites, title, hashTags))
    , [webSites, title, hashTags]);

    const [sortOrder, setSortOrder] = useState('date');
    const [isDESC, setIsDESC] = useState(true);

    useEffect(
        () => setFilterdList((l) => sortList(l, sortOrder, isDESC))
    , [sortOrder, isDESC]);

    return (
        <Box sx={{ border: 2, borderColor: "black", margin: 4 }}>
            <>
                <Typography variant="subtitle2">Search by title</Typography>
                <TextField label="Title" onChange={(e) => setTitle(e.target.value)}/>
            </>
            <>
                <Typography variant="subtitle2">Filter by hashtags</Typography>
                <Autocomplete
                    onChange={(e, newHashTags) => setHashTags(newHashTags)}
                    multiple
                    options={hashTagList.map((option) => option.name)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => <TextField {...params} label="ハッシュタグ" />}
                />
            </>
            <>
                <FormControl>
                    <FormLabel>Sort order</FormLabel>
                        <RadioGroup
                            row
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <FormControlLabel value="date" control={<Radio />} label="Last used" />
                            <FormControlLabel value="browseTime" control={<Radio />} label="Browse times" />
                        </RadioGroup>
                </FormControl>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>ASC</Typography>
                    <Switch checked={isDESC} onChange={(e) => setIsDESC(e.target.checked)}/>
                    <Typography>DESC</Typography>
                </Stack>
            </>
            <Box sx={{ border: 2, borderColor: "black" }}>
                <List>
                    {filterdList.map((webSite, i) => 
                        <WebSiteListItem
                            key={`webSiteList-${i}`}
                            webSite={webSite}
                            deleteWebSite={deleteWebSite}
                        />
                    )}
                </List>
            </Box>
        </Box>
    );
};