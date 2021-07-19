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

export async function getUser(githubUser) {
  return fetch (`https://api.github.com/users/${githubUser}`)
}

export async function userExists(githubUser){
  const response = await getUser(githubUser)
    return response.ok
}