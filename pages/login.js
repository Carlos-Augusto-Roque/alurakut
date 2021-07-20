import React from 'react'
// Hook do NextJs
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useState } from 'react'
import { userExists } from '../src/services/GithubApi'

// função geral para a página de login
export default function LoginScreen() {
  // constante que define a utilização de rotas
  const router = useRouter()

  // states para o usuário
  const [model, setModel] = useState({
    githubUser: 'Carlos-Augusto-Roque',
    error: ''
  })

  // renderização da página
  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          {/* form submetido á função login */}
          <form
            className="box"
            onSubmit={async event => {
              event.preventDefault()
              // constante que recebe a informação se o usuário existe ou não - vinda da função userExists
              const userValid = await userExists(model.githubUser)

              //se usuário não existir,
              if (!userValid) {
                //informe esse valor no state e envie uma mensagem de erro, que tal user não existe
                setModel({
                  ...model,
                  error: `Usuário ${model.githubUser} não encontrado!`
                })
                return
              }
              // caso contrário(que ele exista,)
              // faz a chamada para a api da vercel passando os dados do usuário logado e seu token e guarde a resposta dentro da constante response
              const response = await fetch(
                'https://alurakut.vercel.app/api/login',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ githubUser: model.githubUser })
                }
              ).then(async response => {
                const dados = await response.json()
                const token = dados.token
                nookies.set(null, 'USER_TOKEN', token, {
                  path: '/',
                  maxAge: 86400 * 7
                })
                router.push('/')
              })
            }}
          >
            <p>
              Acesse agora mesmo com seu usuário do{' '}
              <strong id="strong-git">GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={model.githubUser}
              onChange={event => {
                setModel({ ...model, githubUser: event.target.value })
              }}
            />
            {model.githubUser.length === 0 ? (
              <span id="span-campo">Preencha o campo !</span>
            ) : (
              ''
            )}
            <span style={{ color: 'yellow' }}>{model.error}</span>
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{' '}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{' '}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
