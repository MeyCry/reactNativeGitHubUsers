var api = {
  getUserRepo(user){
    user = user.toLowerCase().trim();
    var url = `https://api.github.com/users/${user}/repos`;

    return fetch(url).then( (res) => res.json());
  },
  getBio(user){
    user = user.toLowerCase().trim();
    var url = `https://api.github.com/users/${user}`;

    return fetch(url).then( (res) => res.json());
  },
  getNotes(username){
    username = username.toLowerCase().trim();
    var url = `https://test-meycry.firebaseio.com/${username}.json`

    return fatch(url).then((res) => res.json());
  },
  addNote(username, note){
    username = username.toLowerCase().trim();
    var url = `https://test-meycry.firebaseio.com/${username}.json`

    return fatch(url, {
      method: "post",
      body: JSON.stringify(note)
    }).then((res) => res.json())
  }
};

module.exports = api;