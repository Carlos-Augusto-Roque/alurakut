import React, {useState, useEffect} from 'react'
import GithubApi from '../src/services/GithubApi'
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
export default function Home() { 

  // constante que recebe o usename do github
  const githubUser = 'Carlos-Augusto-Roque'
  // constante que recebe a lista de seguidores do github
  const [followers, setFollowers] = useState([])  
  // constante que recebe quem o usuário está seguindo no github
  const [following, setFollowing] = useState([])  
  // constante que recebe as comunidades
  const [communities,setCommunities] = useState([    
    {id: '1',title: 'Eu odeio acordar cedo',image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'},
    {id: '2',title: 'Queremos Yakut 2 Litros',image: 'https://img10.orkut.br.com/community/543e2091b6a00799f961b5560157011e.jpg'},    
    {id: '4',title: 'League Of Legends',image: 'https://img10.orkut.br.com/community/04381570741a2874e15c367d96a7a133.jpg'},
    {id: '5',title: 'Adoro FDS',image: 'https://img10.orkut.br.com/community/8874c6584f3e2d6cbb24e96c44b51333.jpg'},
    {id: '6',title: 'Galo cego o MITO',image: 'https://img10.orkut.br.com/community/d0a1a7a69ab7204d82fd396031a1394c.jpg'},
  ])  

  //=======================================

  // função para criar uma comunidade
  function handleCreateCommunity(event){    
    event.preventDefault();    
    const formData = new FormData(event.target)    
    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
      link: formData.get('link')          
    }    
    setCommunities([...communities, community])    
  }

  //=======================================
  
  // ciclos de vida 
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
                <input placeholder="URL da imagem para capa"
                      name="image"                      
                      type="file"                                           
                      />
              </div>
              <div>
                <label className="label">Link</label>
                <input placeholder="insira um link para sua nova comunidade"
                      name="link"                                                            
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
