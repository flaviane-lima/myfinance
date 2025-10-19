import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const data = req.body

  const id = await createItem(data)

  res.status(200).json({ id })
}

async function createItem(data: any) {
  console.log("Dados recebidos:", data)
  return Math.floor(Math.random() * 1000)
}
