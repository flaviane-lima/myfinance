'use client'

import { FormEvent, useState } from 'react'
import DashboardLayout from '@/app/components/DashboardLayout'

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false) // controla o clique

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
     setIsSubmitting(true) // ativa o estado

    // Pegamos a referência do form ANTES do await
    const form = event.currentTarget

    //captura os dados do formulário
    const formData = new FormData(event.currentTarget)

    //transformando os dados do formulário em um objeto
    const data = Object.fromEntries(formData.entries())

    //validação dos campos para ver se está tudo preenchido
    if (!data.name || !data.description || !data.category || !data.price) {
      alert('Os campos devem ser preenchido corretamente')

      return
    }

    // enviando os dados para o backend
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    console.log("STATUS DA API:", response.status)

    //lê a resposta que a API envia
    const result = await response.json()
    
    if (response.ok) {
      alert('Cadastro realizado com sucesso')
      // Agora funciona sem erro
      form.reset()
    } else {
      alert(`Erro: ${result.message || 'Não foi possível cadastrar'}`)
    }
  }

  return (
    <DashboardLayout>
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <form onSubmit={onSubmit} className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-semibold text-gray-800 mb-1'>Nome</label>

          <input type="text" name="name" id='name' className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='digite aqui' />
        </div>

        <div>
        <label htmlFor='description' className='block text-sm font-semibold text-gray-800 mb-1'>Descrição</label>
          <input type="text" name="description" id='description' className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='digite aqui'/>
        </div>
        <div>
        <label htmlFor='category' className='block text-sm font-semibold text-gray-800 mb-1'>Categoria</label>
           <select name="category" id="category-select"  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
  <option value="">--Selecione--</option>
  <option value="alimentação">Alimentação</option>
  <option value="utilidades">Utilidades</option>
  <option value="saúde">Saúde</option>
  <option value="lazer">Lazer</option>
</select>
        </div>
        <div>
        <label htmlFor='price' className='block text-sm font-semibold text-gray-800 mb-1'>Preço</label>
          <input type="number" name="price" step="0.01" id='price' className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='digite aqui'/>
        </div>
        <button type="submit" className='w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'>{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
      </form>

    </div>
    </DashboardLayout>

  )
}