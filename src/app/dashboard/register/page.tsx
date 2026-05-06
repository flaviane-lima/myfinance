'use client'

import { FormEvent, useState, useEffect } from 'react'
import { Category } from '@prisma/client'
import DashboardLayout from '@/app/components/DashboardLayout'
import { useSearchParams } from 'next/navigation'
import ExpenseForm from '@/app/components/ExpenseForm'


export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false) // controla o clique
  const [categorias, setCategoria] = useState<Category[]>([]);
  const [isEdit, setIsEdit] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null);

  //adicionando novos estados
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  //pegar o (id) da URL
  const searchParams = useSearchParams()
  const id = searchParams.get('id')


  useEffect(() => {
    fetch('/api/category')
      .then(res => res.json())
      .then(data => {
        console.log('Categorias recebidas:', data) // mostra no console
        setCategoria(data) // atualiza o estado
      })
  }, [])

  // ✅ CARREGAR DADOS PARA EDIÇÃO
  useEffect(() => {
    if (id) {
      fetch('/api/expenses')
        .then(res => res.json())
        .then(data => {
          const expense = data.find((item: any) => item.id === Number(id))

          if (expense) {
            setName(expense.name ?? '')
            setDescription(expense.description ?? '')
            setCategory(expense.category.name ?? '')
            setPrice(expense.price != null ? String(expense.price) : '')

            setSelectedId(expense.id)
            setIsEdit(true)
          }
        })
    } else {
      //limpa o formulário quando não tem id
      setName('')
      setDescription('')
      setCategory('')
      setIsEdit(false)
      setSelectedId(null)
    }
  }, [id])

  // Função chamada quando o formulário é enviado
  async function onSubmit(event: FormEvent<HTMLFormElement>) {

    // Evita o comportamento padrão do form (recarregar a página)
    event.preventDefault()

    // Ativa o estado de envio (botão fica "Enviando...")
    setIsSubmitting(true)

    // Referência ao formulário antes de usar await
    const form = event.currentTarget

    //captura os dados do formulário
    const formData = new FormData(event.currentTarget)

    //transformando os dados do formulário em um objeto
    const data = Object.fromEntries(formData.entries())

    // Validação: verifica se todos os campos foram preenchidos
    if (!data.name || !data.description || !data.category || !data.price) {
      alert('Os campos devem ser preenchido corretamente')
      setIsSubmitting(false)
      return
    }

    let response
    // Se estiver em modo edição e houver id selecionado → PUT
    if (isEdit && selectedId !== null) {
      response = await fetch('/api/expenses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedId,
          name: data.name,
          description: data.description,
          category: data.category,   // se quiser atualizar categoria também
          price: Number(data.price),
        }),
      })
    } else {
      // Caso contrário → POST (novo registro)
      response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
    }

    // Mostra status da API no console
    console.log("STATUS DA API:", response.status)

    //lê a resposta que a API envia
    const result = await response.json()
    console.log("Resposta do back:", result)

    // Trata a resposta da API após o envio do formulário
    if (response.ok) {
      alert('Operação realizada com sucesso')

      // Limpa os campos do formulário, voltando os estados para vazio
      setName('')
      setDescription('')
      setCategory('')
      setPrice('')
      setIsEdit(false)
      setSelectedId(null)
    } else {
      // Caso erro: mostra alerta com mensagem do backend
      alert(`Erro: ${result.message || 'Não foi possível processar'}`)
    }
    // Finaliza o estado de envio, liberando o botão novamente
    setIsSubmitting(false)
  }
  
  //valores
  const formData =  {
    name,
    description,
    category,
    price
  }

  //funções
  const formAction = {
    setName,
    setDescription,
    setCategory,
    setPrice
  }

  return (
    <DashboardLayout>
     <ExpenseForm
     formData={formData}
     formAction={formAction}
     categorias={categorias}
     isSubmitting={isSubmitting}
     isEdit={isEdit}
     onSubmit={onSubmit}

     />
    </DashboardLayout>

  )
}