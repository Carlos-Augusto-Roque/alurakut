// componente que traz a lista das comunidades do DatoCMS
export function CommunitiesList({ communities}) {
  return (
    <>
      <h2 className="smallTitle">
        Comunidades ({communities.length})
      </h2>

      <ul>
        {communities.slice(0,6).map((c) => {
          return (
            <li key={c.id}>
              <a href={`/communities/${c.id}`}>
                <img src={c.imageUrl}/>
                <span>{c.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}


