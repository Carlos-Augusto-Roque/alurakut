import React, { useState, useEffect } from 'react'
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
  const [communities, setCommunities] = useState([])

  //=======================================

  // comportamento ver mais e ver menos
  //constantes para states de comunidades, seguindo e seguidos
  const [isShowingMoreCommunities, setIsShowingMoreCommunities] = useState(false)
  const [isShowingMoreFollowers, setIsShowingMoreFollowers] = useState(false)
  const [isShowingMoreFollowing, setIsShowingMoreFollowing] = useState(false)

  //funções para alterar os states acima
  function handleShowMoreCommunities(e) {
    e.preventDefault()
    setIsShowingMoreCommunities(!isShowingMoreCommunities)
  }
  function handleShowMoreFollowers(e) {
    e.preventDefault()
    setIsShowingMoreFollowers(!isShowingMoreFollowers)
  }
  function handleShowMoreFollowing(e) {
    e.preventDefault()
    setIsShowingMoreFollowing(!isShowingMoreFollowing)
  }

  //=======================================

  // função para criar uma comunidade
  function handleCreateCommunity(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const community = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(community)
    }).then(async response => {
      const dados = await response.json()
      const communityNew = dados.registerCreated
      const updatedCommunities = [communityNew, ...communities]
      setCommunities(updatedCommunities)
    })
  }

  //=======================================

  // ciclo de vida para a listagem das comunidades cadastradas no DatoCMS
  useEffect(() => {
    // chamada para a API do DatoCMS
    fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        Authorization: '6d2569e410f86a191a964cf0cd403b',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `query {
        allCommunities{
          title
          id
          imageUrl
          creatorSlug
        }
      }`
      })
    })
      .then(res => res.json())
      .then(res => {
        setCommunities(res.data.allCommunities)
        console.log(res)
      })
  }, [])

  //=======================================

  // ciclos de vida para trazer os seguidores e os seguidos
  useEffect(() => {
    GithubApi.getFollowers(githubUser).then(res => {
      setFollowers(res)
    })
    GithubApi.getFollowing(githubUser).then(res => {
      setFollowing(res)
    })
  }, [githubUser])

  //=======================================

  //renderização da página home
  return (
    <>
      {/* styled component "AlurakutMenu" - header */}
      <AlurakutMenu githubUser={githubUser} />
      {/* styled component "MainGrid" - main */}
      <MainGrid>
        {/* Coluna 1 - profileArea */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          {/*styled component "Box" - content-profile*/}
          <Box as="aside">
            {/* foto de perfil do usuário trazido pelo github */}
            <img
              src={`https://github.com/${githubUser}.png`}
              style={{ borderRadius: '8px' }}
            />
            <hr />
            <p>
              {/* link do usarname do usuario */}
              <a className="boxLink" href={`https://github.com/${githubUser}`}>
                @{githubUser}
              </a>
            </p>
            <hr />
            {/* styled component "AlurakutProfileSidebarMenuDefault" - demais itens */}
            <AlurakutProfileSidebarMenuDefault />
          </Box>
        </div>

        {/* Coluna 2 - welcomeArea */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          {/*styled component "Box" - content-welcome*/}
          <Box>
            <h1 className="title">Bem vindo, {githubUser} !</h1>
            {/*styled component "OrkutNostalgicIconSet" - itens do welcome*/}
            <OrkutNostalgicIconSet />
          </Box>

          {/*styled component "Box" - content communityCreated*/}
          <Box>
            <h2 className="subTitle">Crie sua própria comunidade !</h2>
            {/* form submetido á função de criar uma comunidade */}
            <form onSubmit={event => handleCreateCommunity(event)}>
              <div>
                <label className="label">Comunidade</label>
                <input
                  placeholder="insira aqui o nome da comunidade"
                  name="title"
                  type="text"
                />
              </div>
              <div>
                <label className="label">Imagem</label>
                <input
                  placeholder="Insira a Url da imagem"
                  name="image"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        {/* Coluna 3 - profileRelationsArea */}
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          {/*styled component "ProfileRelationsBoxWrapper" - content-communities*/}
          <ProfileRelationsBoxWrapper
            //está mostrando + itens = {state inicial = false}
            isShowingMoreItems={isShowingMoreCommunities}
          >
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>

            <ul>
              {/* mapeamento do array de comunidades trazendo a imagem e o titulo */}
              {communities.map(c => {
                return (
                  <li key={c.id}>
                    <a href={`/communities/${c.id}`}>
                      <img src={c.imageUrl} />
                      <span>{c.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {/* se o tamanho das comunidades for maior que 6 */}
            {communities.length > 6 && (
              <>
                {/* então mostre o botão */}
                <button
                  className="toggleButton"
                  // e ao clicar no botão , submeta a função
                  onClick={e => handleShowMoreCommunities(e)}
                >
                  {/* que alterará o state inicial e/ou retornará para ele */}
                  {/* ao submeter á função , o tamanho do box vai se ajustar */}
                  {isShowingMoreCommunities ? 'Ver menos -' : 'Ver mais +'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

          {/*styled component "ProfileRelationsBoxWrapper" - content-followers*/}
          <ProfileRelationsBoxWrapper
            //está mostrando + itens = {state inicial = false}
            isShowingMoreItems={isShowingMoreFollowers}
          >
            <h2 className="smallTitle">
              Seguidores do GitHub ({followers.length})
            </h2>

            <ul>
              {/* mapeamento do array de seguidores trazendo a imagem e o nome */}
              {followers.map(f => {
                return (
                  <li key={f.id}>
                    <a href={`https://github.com/${f.login}`}>
                      <img src={`https://github.com/${f.login}.png`} />
                      <span>{f.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {/* se o tamanho dos seguidores for maior que 6 */}
            {followers.length > 6 && (
              <>
                {/* então mostre o botão */}
                <button
                  className="toggleButton"
                  // e ao clicar no botão , submeta a função
                  onClick={e => handleShowMoreFollowers(e)}
                >
                  {/* que alterará o state inicial e/ou retornará para ele */}
                  {/* ao submeter á função , o tamanho do box vai se ajustar */}
                  {isShowingMoreFollowers ? 'Ver menos -' : 'Ver mais +'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

          {/*styled component "ProfileRelationsBoxWrapper" - content-following */}
          <ProfileRelationsBoxWrapper
            //está mostrando + itens = {state inicial = false}
            isShowingMoreItems={isShowingMoreFollowing}
          >
            <h2 className="smallTitle">
              Seguindo no GitHub ({following.length})
            </h2>

            <ul>
              {/* mapeamento do array de seguidos trazendo a imagem e o nome */}
              {following.map(f => {
                return (
                  <li key={f.id}>
                    <a href={`https://github.com/${f.login}`}>
                      <img src={`https://github.com/${f.login}.png`} />
                      <span>{f.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {/* se o tamanho dos seguidores for maior que 6 */}
            {following.length > 6 && (
              <>
                <button
                  className="toggleButton"
                  // e ao clicar no botão , submeta a função
                  onClick={event => handleShowMoreFollowing(event)}
                >
                  {/* que alterará o state inicial e/ou retornará para ele */}
                  {/* ao submeter á função , o tamanho do box vai se ajustar */}
                  {isShowingMoreFollowing ? 'Ver menos -' : 'Ver mais +'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

//=======================================

// validação do login no servidor
export async function getServerSideProps(context) {

  const cookies = nookies.get(context)

  const token = cookies.USER_TOKEN

  const { isAuthenticated } = await fetch(
    'https://alurakut.vercel.app/api/auth',
    {
      headers: {
        Authorization: token
      }
    }
  ).then(resposta => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    } // will be passed to the page component as props
  }
}
