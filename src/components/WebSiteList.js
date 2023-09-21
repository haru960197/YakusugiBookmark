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

function WebSiteListItem({ webSite, increaseAccessCount, deleteWebSite }) {
    return (
        <ListItem>
            <Typography variant="h4">{webSite.title}</Typography>
            {webSite.hashTagNames.map((name, i) => 
                <Typography key={`${webSite.name}-hashtags-${i}`} variant="subtitle2">{name}</Typography>
            )}
            <Typography vairant="subtitle1">{webSite.registerDate}</Typography>
            <Link
                variant="h6"
                href={webSite.url}
                target="_blank"
                onClick={(e) => increaseAccessCount(webSite)}
            >{webSite.siteTitle}</Link>
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

function sortList(filterdList, sortOrder, isDESC) {
    const sortedList = [...filterdList];
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

export default function WebSiteList(
    { hashTagList, webSites, increaseAccessCount, deleteWebSite }) {
    
    const [filterdList, setFilterdList] = useState([]);
    const [sortedAndFilterdList, setSortedAndFilterdList] = useState([]);

    const [title, setTitle] = useState('');
    const [hashTags, setHashTags] = useState([]);
    useEffect(
        () => setFilterdList(filterList(webSites, title, hashTags))
    , [webSites, title, hashTags]);

    const [sortOrder, setSortOrder] = useState('date');
    const [isDESC, setIsDESC] = useState(true);
    useEffect(
        () => setSortedAndFilterdList(sortList(filterdList, sortOrder, isDESC))
    , [filterdList, sortOrder, isDESC]);

    return (
        <Box
            sx={{ border: 2, borderColor: "black", margin: 4, marginLeft: 0, padding: 2 }}
        >
            <Box>
                <Typography variant="subtitle1">タイトルで絞り込み</Typography>
                <TextField size="small" fullWidth label="タイトル" onChange={(e) => setTitle(e.target.value)}/>
            </Box>
            <Box sx={{ marginTop: 1 }}>
                <Typography variant="subtitle1">#タグで絞り込み</Typography>
                <Autocomplete
                    size="small"
                    onChange={(e, newHashTags) => setHashTags(newHashTags)}
                    multiple
                    options={hashTagList.map((option) => option.name)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => <TextField {...params} label="#タグ" />}
                />
            </Box>
            <Box sx={{ marginTop: 2, paddingLeft: 1.5 }}>
                <FormControl>
                    <FormLabel>並び順</FormLabel>
                        <RadioGroup
                            row
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <FormControlLabel value="date" control={<Radio />} label="追加順" />
                            <FormControlLabel value="browseTime" control={<Radio />} label="アクセス数の多い順" />
                        </RadioGroup>
                </FormControl>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>昇順</Typography>
                    <Switch checked={isDESC} onChange={(e) => setIsDESC(e.target.checked)}/>
                    <Typography>降順</Typography>
                </Stack>
            </Box>
            <Box sx={{ border: 2, borderColor: "black" }}>
                <List>
                    {sortedAndFilterdList.map((webSite, i) => 
                        <WebSiteListItem
                            key={`webSiteList-${i}`}
                            webSite={webSite}
                            increaseAccessCount={increaseAccessCount}
                            deleteWebSite={deleteWebSite}
                        />
                    )}
                </List>
            </Box>
        </Box>
    );
};