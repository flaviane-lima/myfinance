import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(req:Request) {

  const data = await req.json()
  console.log('📥 Dados recebidos do formulário:', data)

  //validação dos dados antes de salvar
  if (!data.name) {
    return new Response(JSON.stringify({ message: 'O campo nome é obrigatório'}), { status: 400})
  }
  if (!data.description) {
   return new Response(JSON.stringify({ message: 'O campo descrição é obrigatório'}), { status: 400})
  }
  if (!data.category) {
    return new Response(JSON.stringify({ message: 'O campo categoria é obrigatório'}), { status: 400})
  }
  if (isNaN(Number(data.price))) {
  return new Response(JSON.stringify({ message: 'O campo preço é obrigatório'}), { status: 400})
  }

  //buscar ou criar a categoria
  try {
    const category = await prisma.category.upsert({
      where: { name: data.category },
      update: {},
      create: { name: data.category },

    })

    //cria o gasto vinculado a categoria
    const created = await prisma.expense.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        categoryId: category.id,
      },
    })
    return new Response(JSON.stringify({
      message: 'Gasto criado com sucesso',
      data: created,
    }),{
      status: 201,
      headers: { 'Content-Type': 'application/json'}
    })

  } catch (error) {
    console.error('Erro ao salvar no banco', error)
    return new Response(JSON.stringify({ message: 'Erro interno ao salvar gasto'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json'}
    })

  }


}