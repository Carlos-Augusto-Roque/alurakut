import React, {useState, useEffect} from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

// Função que retorna os dados do usuário a partir de seu username utilizando a API do github 
function ProfileSidebar(properties) {  
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
          @{properties.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

//função geral para a página Home
export default function Home() { 

  // constante que recebe o usename do github
  const user = 'Carlos-Augusto-Roque'
  const name = 'Carlos'

  // constante que recebe os states das comunidades
  const [communities,setCommunities] = useState([

    {
      id: '1', 
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },

    {
      id: '2', 
      title: 'Queremos Yakut 2 Litros',
      image: 'https://img10.orkut.br.com/community/543e2091b6a00799f961b5560157011e.jpg'
    },

    {
      id: '3', 
      title: 'Queria sorvete mas era feijão',
      image: 'https://img10.orkut.br.com/community/5772468e52cea8b6dc2d07653185140b.jpg'
    },

  ])   

  // constante que recebe os amigos por seus usernames do github
  const friends = [
    'diego3g',
    'filipedeschamps',
    'peas',
    'rafaballerini',
    'saulomsantos',
    'paulobrandaodev',
           
  ]

  // função para criar uma comunidade
  function handleCreateCommunity(event){

    event.preventDefault();

    const dataForm = new FormData(event.target)

    const community = {
      id: new Date().toISOString(),
      title: dataForm.get('title'),
      image: dataForm.get('image'),
      link: dataForm.get('link')          
    }   

    setCommunities([...communities, community])

  }
  
  //renderização da página home
  return (
    <>
      <AlurakutMenu />

      <MainGrid>

        {/* Coluna 1 - profileArea */}

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>

         {/* Coluna 2 - welcomeArea */}

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo, {name}  ! 
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
                      aria-aria-label="Qual vai ser o nome da sua comunidade?"
                      type="text"
                      />
              </div>

              <div>
                <label className="label">Imagem</label>
                <input placeholder="URL da imagem para capa"
                      name="image"
                      aria-aria-label="Adicione uma URL de imagem para usarmos de capa"
                      type="file"                                           
                      />
              </div>

              <div>
                <label className="label">Link</label>
                <input placeholder="insira um link para sua nova comunidade"
                      name="link"
                      aria-aria-label="Adicione um link para sua nova comunidade"                                           
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
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> 

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Devs Inspiração ({friends.length})
            </h2>

            <ul>
              {friends.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
    </>
  )
}
