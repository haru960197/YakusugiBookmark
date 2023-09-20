import Register from './Register';
import WebSiteList from './WebSiteList';
import HashTagList from './HashTagList';
import { useState } from 'react';

function App() {
  const [webSites, setWebSites] = useState(
    localStorage.getItem('webSites') ? JSON.parse(localStorage.getItem('webSites')) : []
  );
  const [hashTags, setHashTags] = useState(
    [{name: "hoge", count: 1}, {name: "fuga", count: 3}/*{ name: '', count: 0 }*/]
  );

  function increaseHashTag(name) {
    if (hashTags.find((hashTag) => hashTag.name === name)) {
        // name is already registered.
        setHashTags(hashTags.map((hashTag) => 
            hashTag.name === name ? 
                { name: name, count: hashTag.count + 1} :
                hashTag
        ))
    } else {
        // register new name hashtag.
        setHashTags([
            { name: name, count: 1 },
            ...hashTags
        ]);
    }
  }

  function decreaseHashTag(name) {
    let newHashTags = hashTags.map((hashTag) => {
      if (hashTag.name === name) {
        return ({ name: hashTag.name, count: hashTag.count - 1 });
      } else {
        return hashTag;
      }
    });
    newHashTags = newHashTags.filter((hashTag) => hashTag.count > 0);
    setHashTags(newHashTags);
  }

  function addWebSite(webSite) {
    // Process all the hashTags
    webSite.hashTagNames.forEach((hashTag) => increaseHashTag(hashTag));

    const newWebSites = [webSite, ...webSites];
    setWebSites(newWebSites);
    localStorage.setItem('webSites', JSON.stringify(newWebSites));
  }

  function deleteWebSite(webSite) {
    // Process all the hashTags
    webSite.hashTagNames.forEach((hashTag) => decreaseHashTag(hashTag));

    const newWebSites = webSites.filter((web) => web !== webSite);
    setWebSites(newWebSites);
    localStorage.setItem('webSites', JSON.stringify(newWebSites));
  }

  return (
    <div>
      <Register
        registerWebSite={addWebSite}
        hashTags={hashTags}
      />
      <HashTagList hashTags={hashTags} />
      <WebSiteList webSites={webSites} deleteWebSite={deleteWebSite}/>
    </div>
  );
}

export default App;
