export default {

  getFollowers: (username) => {
    
    return fetch(`https://api.github.com/users/${username}/followers`)

    .then((res) => res.json()

    .catch((error) => {
      console.error(error)
    })

    );

  },

  getFollowing: (username) => {
  
    return fetch(`https://api.github.com/users/${username}/following`)
  
    .then((res) => res.json()

    .catch((error) => {
      console.error(error)
    })
  
    );
  },
  
};