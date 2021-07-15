// função que faz a chamada para buscar as comunidades já cadastradas no DatoCSM
export default {

  getCommunities: () => {
    
    return fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization': '6d2569e410f86a191a964cf0cd403b',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities{
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })

    .then((res) => res.json())
    .then((res) => {     
      setCommunities(res.data.allCommunities) 
      console.log(res)
    })
  }
}