import {
    List,
    ListItem,
    Typography,
    Box
} from "@mui/material";
import HashTagsSorter from "./HashTagsSorter";

export default function HashTagList({ hashTags, setHashTags }) {
    return (
        <>
            <HashTagsSorter hashTags={hashTags} setHashTags={setHashTags} />
            <Box sx={{ border: 2, borderColor: "black" }}>
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
        </>
    );
}