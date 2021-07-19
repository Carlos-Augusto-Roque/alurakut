import React, {useState, useEffect} from 'react'
import GithubApi from '../src/services/GithubApi'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { 
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'       
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { FollowersList } from '../src/components/FollowersList'
import { FollowingList } from '../src/components/FollowingList'
import { CommunitiesList } from '../src/components/CommunitiesList'


//=======================================

// Função que retorna os dados do usuário a partir de seu username utilizando a API do github 
function ProfileSidebar({ githubUser}) {
  return (
    <Box as="aside">
      <img 
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

//=======================================

//função geral para a página Home
export default function Home(props) { 

  // constante que recebe o usename do github
  const githubUser = props.githubUser
  // constante que recebe a lista de seguidores do github
  const [followers, setFollowers] = useState([])  
  // constante que recebe quem o usuário está seguindo no github
  const [following, setFollowing] = useState([])  
  // constante que recebe as comunidades
  const [communities,setCommunities] = useState([])  

  //=======================================

  // função para criar uma comunidade
  function handleCreateCommunity(event){    
    event.preventDefault();    
    const formData = new FormData(event.target)  

    const community = {      
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser,          
    }          
    
    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community)
    })
    .then(async (response) => {
      const dados = await response.json();
      const communityNew = dados.registerCreated;
      const updatedCommunities = [communityNew, ...communities];
      setCommunities(updatedCommunities);
    })
  }
  
  //=======================================

  // ciclo de vida para a listagem das comunidades cadastradas no DatoCMS
  useEffect(() => {
    // chamada para a API do DatoCMS
    fetch(`https://graphql.datocms.com/`, {
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
  },[])
  


  //=======================================
  
  // ciclos de vida para trazer os seguidores e os que o usuário está seguindo
  useEffect(() => {    
    GithubApi.getFollowers(githubUser).then((res) => {
      setFollowers(res);
    }); 
    GithubApi.getFollowing(githubUser).then((res) => {
      setFollowing(res);
    });

    
  }, [githubUser]);
  
  

  //=======================================

  //renderização da página home
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>

        {/* Coluna 1 - profileArea */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

         {/* Coluna 2 - welcomeArea */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>

          <Box>
            <h1 className="title">
              Bem vindo, {githubUser}  ! 
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>

            <h2 className="subTitle">Crie sua própria comunidade !</h2> 

            <form onSubmit={(event) => handleCreateCommunity(event)}>

              <div>
                <label className="label">Comunidade</label>
                <input placeholder="insira aqui o nome da comunidade"
                      name="title"                      
                      type="text"
                      />
              </div>
              <div>
                <label className="label">Imagem</label>
                <input placeholder="Insira a Url da imagem"
                      name="image"                      
                      type="text"                                         
                      />
              </div>            

              <button>
                  Criar comunidade
              </button>

            </form>

          </Box>

        </div>

        {/* Coluna 3 - profileRelationsArea */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
            <CommunitiesList communities={communities}/>            
          </ProfileRelationsBoxWrapper> 

          <ProfileRelationsBoxWrapper>
             <FollowersList followers={followers}/>            
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <FollowingList following={following}/>            
          </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
    </>
  )
}

// validação do login no servidor
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { isAuthenticated } = await fetch('https://alurakut-4f9fmajrt-carlos-augusto-roque.vercel.app/api/auth', {
    headers: {
      Authorization: token,
    },
  })
  .then((resposta) => resposta.json())  
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 

