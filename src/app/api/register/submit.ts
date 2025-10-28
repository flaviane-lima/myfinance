import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()


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

  //buscar ou criar a categoria
  try {
    const category = await prisma.category.upsert({
      where: { name: data.category },
      update: {},
      create: { name: data.category },

    })

    //cria o gasto vinculado a categoria
    const creatd = await prisma.expense.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        categoryId: category.id,
      },
    })
  } catch (error) {
    console.error('Erro ao salvar no banco', error)
    return res.status(500).json({ message: 'Erro interno ao salvar gasto' })

  }


}