import Register from './Register';
import { useState } from 'react';

function App() {
  const [webSites, setWebSites] = useState([]);
  const [hashTags, setHashTags] = useState(
    [{name: "hoge", count: 1}, {name: "fuga", count: 3}/*{ name: '', count: 0 }*/]
  );

  function processHashTag(name) {
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

  return (
    <div>
      <Register
        registerWebSite={(webSite) => setWebSites([...webSites, webSite])}
        hashTags={hashTags}
        processHashTag={processHashTag}
      />
    </div>
  );
}

export default App;
