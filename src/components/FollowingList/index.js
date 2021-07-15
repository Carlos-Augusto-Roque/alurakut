export function FollowingList({ following}) {
  return (
    <>
      <h2 className="smallTitle">
        Seguindo no GitHub ({following.length})
      </h2>

      <ul>
        {following.slice(0,6).map((f) => {
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