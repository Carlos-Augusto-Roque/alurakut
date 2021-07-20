export default {
  //função que faz a chamada para a api do github e traz os seguidores do usuário
  getFollowers: (username) => {
    
    return fetch(`https://api.github.com/users/${username}/followers`)

    .then((res) => res.json()

    .catch((error) => {
      console.error(error)
    })

    );

  },

  // função que faz a chamada para a api do github e traz os seguidos do usuário
  getFollowing: (username) => {
  
    return fetch(`https://api.github.com/users/${username}/following`)
  
    .then((res) => res.json()

    .catch((error) => {
      console.error(error)
    })
  
    );
  },  
};

// função que faz a chamada para a api do github e traz um usuário
export async function getUser(githubUser) {
  return fetch (`https://api.github.com/users/${githubUser}`)
}

// função que faz a chamada para a api do github e verifica se o usuário existe
export async function userExists(githubUser){
  const response = await getUser(githubUser)
    return response.ok
}