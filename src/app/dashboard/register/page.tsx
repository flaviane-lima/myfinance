'use client'

import { FormEvent, useState, useEffect } from 'react'
import { Category } from '@prisma/client'
import DashboardLayout from '@/app/components/DashboardLayout'
import { useSearchParams } from 'next/navigation'

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

  return (
    <DashboardLayout>
      <div className='min-h-screen bg-gray-50 py-10 px-4'>

        <form onSubmit={onSubmit} className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-semibold text-gray-800 mb-1'>
              Nome
            </label>

            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
              placeholder='digite aqui'
            />
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-semibold text-gray-800 mb-1'>
              Descrição
            </label>

            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
              placeholder='digite aqui'
            />
          </div>

          <div>
            <label htmlFor='category' className='block text-sm font-semibold text-gray-800 mb-1'>
              Categoria
            </label>

            <select
              name="category"
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">--Selecione--</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='price' className='block text-sm font-semibold text-gray-800 mb-1'>Preço</label>
            <input
              type="number"
              name="price"
              step="0.01"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
              placeholder='digite aqui'
            />
          </div>
          <button type="submit" className='w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'>{isSubmitting
            ? 'Enviando...'
            : isEdit
              ? 'Atualizar'
              : 'Enviar'}</button>
        </form>

      </div>
    </DashboardLayout>

  )
}