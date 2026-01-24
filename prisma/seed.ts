import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
async function main() {
  const categorias = ['Alimentação', 'Utilidade', 'Saúde', 'Lazer']
for (let i = 0; i < categorias.length; i++) {
  const categoria = categorias[i]
  // aqui dentro você usa categoria no upsert
  await prisma.category.upsert({
    where: { name: categoria },
    update: {},
    create: {
      name: categoria
      },
  })
}
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })