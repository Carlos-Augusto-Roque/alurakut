import {SiteClient} from 'datocms-client'

export default async function requestsReceiver(request,response) {
  if (request.method === 'POST') {
    const TOKEN = 'b28e9a9f1ed7e6dd0b05addb88f18f'
    const client = new SiteClient(TOKEN)
    
    const registerCreated = await client.items.create({
      itemType: "970941",
      ...request.body,
    })
    response.json({
      data: 'qualquer coisa',
      registerCreated : registerCreated
    })
    return
  }  
  response.status(404).json({
    message : 'Ainda não temos nada no GET, mas sim no POST !'
  })
}