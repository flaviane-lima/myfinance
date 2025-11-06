'use client'

import { FormEvent } from 'react'
 
export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
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
    const response = await fetch('/api/register/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    
    //lê a resposta que a API envia
    const result = await response.json()
    if (response.ok) {
      alert('Cadastro realizado com sucesso')
    } else {
      alert(`Erro: ${result.message || 'Não foi possível cadastrar'}`)
    }
  }
 
  return (
    <form onSubmit={onSubmit}>
    <label>
      Nome:
      <input type="text" name="name" />
    </label> 
    <label>
      Descrição:
      <input type="text" name="description" />
    </label> 
    <label>
      Categoria:  
      <input type="text" name="category" />
    </label> 
    <label> 
      Preço:
      <input type="number" name="price" step="0.01" />
    </label>  
      <button type="submit">Submit</button>
    </form>
    
  )
}