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
    Grid,
    Card,
    CardContent,
    Divider
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from 'react';

function WebSiteListItem({ webSite, increaseAccessCount, deleteWebSite, padding }) {
    return (
        <ListItem sx={{ padding }}>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid item container alignItems="center" justifyContent="center" xs={4} sm={3} >
                    <Box sx={{ maxWidth: "130px", maxHeight: "130px", border: 1, borderColor: "#bdbdbd" }}>
                        <img alt="画像の取得に失敗" src={webSite.imageURL} width="100%" height="100%" />
                    </Box>
                </Grid>
                <Grid item xs={7} sm={8} >
                    <Typography
                        variant="h5"
                        whiteSpace='nowrap'
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >{'・' + webSite.title}</Typography>
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
                            <img alt="Error" src={webSite.faviconURL} width="18pt" height="18pt" />
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

function ListArrangeForm(
    { hashTagList, webSites, setSortedAndFilterdList, listRow, setListRow }) {
    const [filterdList, setFilterdList] = useState([]);

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

    const [isOneRow, setIsOneRow] = useState(listRow === 'one');
    useEffect(
        () => {
            const newListRow = isOneRow ? "one" : "two";
            setListRow(newListRow);
            localStorage.setItem('listRow', newListRow);
        }, [isOneRow]);

    return (
        <div>
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
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>2列</Typography>
                    <Switch checked={isOneRow} onChange={(e) => setIsOneRow(e.target.checked)} />
                    <Typography>1列</Typography>
                </Stack>
            </Box>
        </div>
    )
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

function makeGroupedList(list, sameGroupNum) {
    const groupedList = []
    for (let i = 0; i < list.length; i += sameGroupNum) {
        const sameGroupList = [];
        for (let j = 0; j < sameGroupNum; j++) {
            sameGroupList.push(list[i + j]);
        }
        groupedList.push(sameGroupList);
    }
    return groupedList;
}

export default function WebSiteList(
    { hashTagList, webSites, increaseAccessCount, deleteWebSite, windowIsSmall }) {
    const [sortedAndFilterdList, setSortedAndFilterdList] = useState([]);
    const [twoRowList, setTwoRowList] = useState([]);
    const [listRow, setListRow] = useState(
        localStorage.getItem('listRow')
            ? localStorage.getItem('listRow')
            : "one"
    );

    useEffect(() => {
        setTwoRowList(makeGroupedList(sortedAndFilterdList, 2));
    }, [sortedAndFilterdList, listRow])

    return (
        <Card
            variant="outlined"
            sx={{ margin: 2, marginLeft: windowIsSmall ? 2 : 0, }}
        >
            <CardContent>
                <ListArrangeForm
                    hashTagList={hashTagList}
                    webSites={webSites}
                    setSortedAndFilterdList={setSortedAndFilterdList}
                    listRow={listRow}
                    setListRow={setListRow}
                />
            </CardContent>

            <Divider />

            <List sx={{ px: 2 }}>
                {windowIsSmall || listRow === "one"
                    ? sortedAndFilterdList.map((webSite, i) => (
                        <div key={`webSiteList-${i}`}>
                            <WebSiteListItem
                                webSite={webSite}
                                increaseAccessCount={increaseAccessCount}
                                deleteWebSite={deleteWebSite}
                                padding={3}
                            />
                            {i !== sortedAndFilterdList.length - 1
                                ? <Divider />
                                : undefined
                            }
                        </div>
                    ))
                    : twoRowList.map((webSites, i) => (
                        <div key={`webSiteLists-${i}`}>
                            <Grid container>
                                {webSites[0] ?
                                    <Grid item xs={5.95}>
                                        <WebSiteListItem
                                            webSite={webSites[0]}
                                            increaseAccessCount={increaseAccessCount}
                                            deleteWebSite={deleteWebSite}
                                            padding={1}
                                        />
                                    </Grid> :
                                    undefined
                                }
                                <Divider orientation="vertical" variant="middle" flexItem />

                                {webSites[1] ?
                                    <Grid item xs={5.9}>
                                        <WebSiteListItem
                                            webSite={webSites[1]}
                                            increaseAccessCount={increaseAccessCount}
                                            deleteWebSite={deleteWebSite}
                                            padding={1}
                                        />
                                    </Grid> :
                                    undefined
                                }
                            </Grid>
                            {i !== twoRowList.length - 1
                                ? <Divider />
                                : undefined
                            }
                        </div>
                    ))
                }
            </List>
        </Card >
    );
};