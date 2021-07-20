// função que faz a chamada para a api do DatoCMS buscar as comunidades já cadastradas
export default {

  getCommunities: () => {
    
    return fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization': '6d2569e410f86a191a964cf0cd403b', // id fornecido no DatoCMS
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // corpo da requisição  - atributos de uma comunidade 
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