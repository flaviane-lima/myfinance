import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const categorias = await prisma.category.findMany()
    return NextResponse.json(categorias, { status: 200 })
  
  
}