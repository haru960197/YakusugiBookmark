import Register from './Register';
import WebSiteList from './WebSiteList';
import HashTagList from './HashTagList';
import ApiKeyDialog from './ApiKeyDialog';
import ColorModeButton from './ColorModeButton';
import ApiKeyResetButton from './ApiKeyResetButton';
import { useMemo, useState } from 'react';
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [dialogOpen, setDialogOpen] = useState(!Boolean(localStorage.getItem('apiKey')));

  const [mode, setMode] = useState(
    localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light'
  );
  function getDesignToken(mode) {
    return (
      {
        palette: {
          mode,
          ...(mode === 'light'
            ? {}
            : {
              text: {
                primary: '#1e88e5',
              },
            })
        }
      }
    );
  }
  const theme = useMemo(() => createTheme(getDesignToken(mode)), [mode]);
  function toggleMode() {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  }

  const windowIsSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [apiKey, setApiKey] = useState(
    localStorage.getItem('apiKey') ? localStorage.getItem('apiKey') : ''
  );

  const [webSites, setWebSites] = useState(
    localStorage.getItem('webSites') ? JSON.parse(localStorage.getItem('webSites')) : []
  );

  const [hashTags, setHashTags] = useState(
    localStorage.getItem('hashTags') ? JSON.parse(localStorage.getItem('hashTags')) : []
    /* [...{ name: '', count: 0, lastUsedDate: '' }] */
  );

  function increaseHashTags(names) {
    let newHashTags = [...hashTags];

    const date = new Date();
    const lastUsedDate =
      `${date.getFullYear() * 1000000 + date.getMonth() * 10000
      + date.getDate() * 100 + date.getHours()}`;

    names.forEach((name) => {
      if (hashTags.find((hashTag) => hashTag.name === name)) {
        // name is already registered.
        newHashTags = newHashTags.map((hashTag) =>
          hashTag.name === name
            ? { name: name, count: hashTag.count + 1, lastUsedDate: lastUsedDate }
            : hashTag
        );
      } else {
        // register new name hashtag.
        newHashTags.unshift({ name: name, count: 1, lastUsedDate: lastUsedDate });
      }
    });

    setHashTags(newHashTags);
    localStorage.setItem('hashTags', JSON.stringify(newHashTags));
  }

  function decreaseHashTags(names) {
    let newHashTags = hashTags.map((hashTag) => {
      if (names.includes(hashTag.name)) {
        return ({ name: hashTag.name, count: hashTag.count - 1 });
      } else {
        return hashTag;
      }
    });
    newHashTags = newHashTags.filter((hashTag) => hashTag.count > 0);
    setHashTags(newHashTags);
    localStorage.setItem('hashTags', JSON.stringify(newHashTags));
  }

  function addWebSite(webSite) {
    // Process all the hashTags
    increaseHashTags(webSite.hashTagNames);

    const newWebSites = [webSite, ...webSites];
    setWebSites(newWebSites);
    localStorage.setItem('webSites', JSON.stringify(newWebSites));
  }

  function deleteWebSite(webSite) {
    // Process all the hashTags
    decreaseHashTags(webSite.hashTagNames);

    const newWebSites = webSites.filter((web) => web !== webSite);
    setWebSites(newWebSites);
    localStorage.setItem('webSites', JSON.stringify(newWebSites));
  }

  function increaseAccessCount(targetWebSite) {
    const newWebSites = webSites.map((webSite) => {
      if (webSite === targetWebSite) {
        return ({ ...webSite, accessCount: webSite.accessCount + 1 });
      } else {
        return webSite;
      }
    });
    setWebSites(newWebSites);
    localStorage.setItem('webSites', JSON.stringify(newWebSites));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApiKeyDialog open={dialogOpen} setOpen={setDialogOpen} setApiKey={setApiKey} />
      <Grid container spacing={windowIsSmall ? 0 : 4}>
        <Grid item container direction="column" xs={12} sm={4}>
          <Grid item sx={{ marginTop: 2, marginBottom: 1, mx: 5 }}>
            <Typography variant={windowIsSmall ? 'h5' : 'h4'}>屋久杉ブックマーク</Typography>
          </Grid>
          <Grid item>
            <Register
              registerWebSite={addWebSite}
              hashTags={hashTags}
              apiKey={apiKey}
              windowIsSmall={windowIsSmall}
            />
          </Grid>
          <Grid item>
            <HashTagList
              hashTags={hashTags}
              setHashTags={setHashTags}
              windowIsSmall={windowIsSmall}
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={8}>
          <Grid item container justifyContent="flex-end" >
            <ColorModeButton toggleColorMode={toggleMode} />
          </Grid>
          <Grid item>
            <WebSiteList
              hashTagList={hashTags}
              webSites={webSites}
              increaseAccessCount={increaseAccessCount}
              deleteWebSite={deleteWebSite}
              windowIsSmall={windowIsSmall}
            />
            <Grid item container justifyContent="flex-end" >
              <ApiKeyResetButton setDialogOpen={setDialogOpen} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
