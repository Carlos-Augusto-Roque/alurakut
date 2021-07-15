export function FollowersList({ followers}) {
  return (
    <>
      <h2 className="smallTitle">
        Seguidores do GitHub ({followers.length})
      </h2>

      <ul>
        {followers.slice(0,6).map((f) => {
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
    </>
  )
}