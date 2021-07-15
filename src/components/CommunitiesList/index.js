export function CommunitiesList({ communities}) {
  return (
    <>
      <h2 className="smallTitle">
        Comunidades ({communities.length})
      </h2>

      <ul>
        {communities.map((c) => {
          return (
            <li key={c.id}>
              <a href={`/users/${c.title}`}>
                <img src={c.image} />
                <span>{c.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}