import {
    List,
    ListItem,
    Typography,
    Card,
    CardContent,
    Divider,
    Box
} from "@mui/material";
import HashTagsSorter from "./HashTagsSorter";

export default function HashTagList({ hashTags, setHashTags, windowIsSmall }) {
    return (
        <Card
            variant="outlined"
            sx={{ margin: 2, marginLeft: windowIsSmall ? 2 : 4, }}
        >
            <Box sx={{ margin: 2, marginBottom: 1 }} >
                <HashTagsSorter hashTags={hashTags} setHashTags={setHashTags} />
            </Box>
            <Divider />
            <Box sx={{ margin: 2, my: 0 }}>
                <List >
                    {hashTags.map((hashTag) => (
                        <ListItem key={hashTag.name} sx={{ py: 0.3 }}>
                            <Typography variant="subtitle2">
                                {"#" + hashTag.name}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Card>
    );
}