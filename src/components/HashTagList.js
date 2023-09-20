import { List, ListItem, Typography, Box } from "@mui/material";

export default function HashTagList({ hashTags }) {
    return (
        <Box sx={{ border: 2, borderColor: "black" }}>
            <List>
                {hashTags.map((hashTag) => (
                    <ListItem key={hashTag.name}>
                        <Typography variant="subtitle2">
                            {"#" + hashTag.name}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}