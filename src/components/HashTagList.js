import {
    List,
    ListItem,
    Typography,
    Box,
    Stack
} from "@mui/material";
import HashTagsSorter from "./HashTagsSorter";

export default function HashTagList({ hashTags, setHashTags }) {
    return (
        <Stack sx={{ margin: 4, marginTop: 0 }}>
            <HashTagsSorter hashTags={hashTags} setHashTags={setHashTags} />
            <Box sx={{ border: 2, borderColor: "#263238" }}>
                <List>
                    {hashTags.map((hashTag) => (
                        <ListItem key={hashTag.name}>
                            <Typography variant="subtitle2">
                                {"#" + hashTag.name + ' ' + hashTag.lastUsedDate + ' ' + hashTag.count}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Stack>
    );
}