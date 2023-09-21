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
    Switch,
    Grid
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from 'react';

const tmpImageUrl = "https://pbs.twimg.com/media/D4WoUCLU4AYgho_.jpg"

function WebSiteListItem({ webSite, increaseAccessCount, deleteWebSite }) {
    return (
        <ListItem>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid item container alignItems="center" justifyContent="center" xs={4} sm={3} >
                    <Box sx={{ maxWidth: "130px", maxHeight: "130px" }}>
                        <img alt="画像の取得に失敗" src={webSite.imageURL} width="100%" height="100%" />
                    </Box>
                </Grid>
                <Grid item xs={7} sm={8} >
                    <Typography variant="h5">{'・' + webSite.title}</Typography>
                    <Grid item container >
                        {webSite.hashTagNames.map((name, i) => (
                            <Grid item key={`${webSite.name}-hashtags-${i}`}>
                                <Typography variant="subtitle2" color="#616161">{'#' + name + '\u00A0'}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography vairant="subtitle1">{webSite.registerDate.split('-').slice(0, 3).join('-')}</Typography>
                    <Grid item container direction="row" >
                        <Grid item container alignItems="center" xs="auto">
                            <img alt="Error" src={webSite.faviconURL} width="18pt" height="18pt"/>
                        </Grid>
                        <Grid item xs={10} sm={10.5} md={11}>
                            <Link
                                variant="h6"
                                href={webSite.url}
                                target="_blank"
                                onClick={(e) => increaseAccessCount(webSite)}
                            >
                                <Box
                                    whiteSpace='nowrap'
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                >{'\u00A0' + webSite.siteTitle}</Box>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" justifyContent="center" xs={1} >
                    <DeleteOutlineOutlinedIcon onClick={(e) => deleteWebSite(webSite)} />
                </Grid>
            </Grid>
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
            sx={{ border: 2, borderColor: "#424242", margin: 2, padding: 2 }}
        >
            <Box>
                <Typography variant="subtitle1">タイトルで絞り込み</Typography>
                <TextField size="small" fullWidth label="タイトル" onChange={(e) => setTitle(e.target.value)} />
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
                    <Switch checked={isDESC} onChange={(e) => setIsDESC(e.target.checked)} />
                    <Typography>降順</Typography>
                </Stack>
            </Box>
            <Box sx={{ border: 2, borderColor: "#757575" }}>
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