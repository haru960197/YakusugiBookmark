import { List, ListItem, Typography, Link, Box } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
function WebSiteListItem({ webSite, deleteWebSite }) {
    return (
        <ListItem>
            <Typography variant="h4">{webSite.title}</Typography>
            {webSite.hashTagNames.map((name, i) => 
                <Typography key={`${webSite.name}-hashtags-${i}`} variant="subtitle2">{name}</Typography>
            )}
            <Link variant="h6" href="#">サイトタイトル</Link>
            <DeleteOutlineOutlinedIcon onClick={(e) => deleteWebSite(webSite)}/>
        </ListItem>
    );
}

export default function WebSiteList({ webSites, deleteWebSite }) {
    return (
        <Box sx={{ border: 2, borderColor: "black" }}>
            <List>
                {webSites.map((webSite, i) => 
                    <WebSiteListItem
                        key={`webSiteList-${i}`}
                        webSite={webSite}
                        deleteWebSite={deleteWebSite}
                    />
                )}
            </List>
        </Box>
    );
};