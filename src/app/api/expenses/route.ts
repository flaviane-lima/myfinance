import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'


const prisma = new PrismaClient()

//cadastrar os dados
export async function POST(req: Request) {

  const data = await req.json()
  console.log('📥 Dados recebidos do formulário:', data)

  //validação dos dados antes de salvar
  if (!data.name) {
    return NextResponse.json({ message: 'O campo nome é obrigatório' }, { status: 400 })
  }
  if (!data.description) {
    return NextResponse.json({ message: 'O campo descrição é obrigatório' }, { status: 400 })
  }
  if (!data.category) {
    return NextResponse.json({ message: 'O campo categoria é obrigatório' }, { status: 400 })
  }
  if (!data.price || isNaN(parseFloat(data.price))) {
    return NextResponse.json({ message: 'O campo preço é obrigatório' }, { status: 400 })
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
    return NextResponse.json(
      { message: 'Gasto criado com sucesso', data: created },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro ao salvar no banco', error)
    return NextResponse.json({ message: 'Erro interno ao salvar gasto' }, { status: 500 })
  }

}

// listar os dados
export async function GET() {
  const expenses = await prisma.expense.findMany({
    include: { category: true }
  })
  return NextResponse.json(expenses, { status: 200 })
}

// deletar informações desnecessárias
export async function DELETE(req: Request) {

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID é obrigatório" }, { status: 400 });
    }

    //comando prisma
    await prisma.expense.delete({

      where: { id: Number(id) },

    });
    return NextResponse.json({ message: `Item ${id} deletado` }, { status: 200 })
  } catch (error) {

    console.error("Erro ao deletar:", error)
    return NextResponse.json({ message: "Erro ao deletar" }, { status: 400 })


  }

}

// atualiza os dados
export async function PUT(req: Request) {

  try {
    //extrair os dados enviado pelo o front
    const { id, name, description, price} = await req.json();

    // valida se o id foi informado
    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400}
      );
    }

    //atualiza o registro no banco, entra o comando do prisma
    const updatedExpense = await prisma.expense.update({
      where: { id: Number(id) },
      data: { name, description, price },
    });

    //retorna o objeto atualizado
    return NextResponse.json(updatedExpense, { status: 200 });

  } catch (error) {
    console.error("Ero ao atualizar:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar" },
      { status: 400 },
    );
  } 
}