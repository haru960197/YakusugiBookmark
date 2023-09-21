import Register from './Register';
import WebSiteList from './WebSiteList';
import HashTagList from './HashTagList';
import { useState } from 'react';
import { Grid } from "@mui/material"

function App() {
  /*
  const [webSites, setWebSites] = useState(
    localStorage.getItem('webSites') ? JSON.parse(localStorage.getItem('webSites')) : []
  );
  */

  const [webSites, setWebSites] = useState(
    localStorage.getItem('webSite') && JSON.parse(localStorage.getItem('webSite')).length > 0
      ? JSON.parse(localStorage.getItem('webSite'))
      : [{
        url: "https://github.com/haru960197/LatexFigureManager",
        title: "俺のGitHub",
        hashTagNames: ["github", "javascript"],
        siteTitle: "Kuro960197's GitHub",
        registerDate: "2023-09-21-09",
        accessCount: 1
      },
      {
        url: "https://mui.com/material-ui/react-autocomplete/",
        title: "MUI-Autocomplete",
        hashTagNames: ["javascript", "react", "mui"],
        siteTitle: 'React Autocomplete component - Material UI',
        registerDate: '2023-09-20-15',
        accessCount: 3
      },
      {
        url: "https://www.opengraph.io/pricing",
        title: "サイトのタイトル取得API",
        hashTagNames: ["javascript", "react", "api"],
        siteTitle: 'Simple Pricing | Simple API',
        registerDate: '2023-09-20-23',
        accessCount: 2
      }]
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
            ? { name: name, count: hashTag.count + 1, lastUsedDate: lastUsedDate}
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
        return ({...webSite, accessCount: webSite.accessCount + 1});
      } else {
        return webSite;
      }
    });
    setWebSites(newWebSites);
    localStorage.setItem('webSites', JSON.stringify(newWebSites));
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item container direction="column" xs={12} sm={4}>
          <Grid item>
            <Register
              registerWebSite={addWebSite}
              hashTags={hashTags}
            />
          </Grid>
          <Grid item>
            <HashTagList hashTags={hashTags} setHashTags={setHashTags}/>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <WebSiteList
            hashTagList={hashTags}
            webSites={webSites}
            increaseAccessCount={increaseAccessCount}
            deleteWebSite={deleteWebSite}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
