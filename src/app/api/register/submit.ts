import type { NextApiRequest, NextApiResponse } from 'next'

type ItemData = {
  name: string
  description: string
  category: string
  price: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const data = req.body

  //validação dos dados antes de salvar
  if (!data.name) {
    return res.status(400).json({message:"O campo nome é obrigatório"})
  }
  if (!data.description) {
    return res.status(400).json({message:"O campo descrição é obrigatório"})
  }
  if (!data.category) {
    return res.status(400).json({message:"O campo categoria é obrigatório"})
  }
  if (isNaN(Number(data.price))) {
  return res.status(400).json({ message: 'O campo "price" deve ser um número válido.' })
  }

  //criação do objeto tipado
  const item: ItemData= {
    name: data.name,
    description: data.description,
    category: data.category,
    price: Number(data.price)

  }

  const id = await createItem(item)

  res.status(200).json({ id })
}

async function createItem(data: ItemData) {
  console.log("Dados recebidos:", data)
  return Math.floor(Math.random() * 1000)
}
