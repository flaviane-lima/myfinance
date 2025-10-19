'use client'

import { FormEvent } from 'react'
 
export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()
    // ...
  }
 
  return (
    <form onSubmit={onSubmit}>
    <label>
      Nome:
      <input type="text" name="name" />
    </label> 
    <label>
      Desrição:
      <input type="text" name="description" />
    </label> 
    <label>
      Categoria:  
      <input type="text" name="category" />
    </label> 
    <label> 
      Preço:
      <input type="number" name="price" />
    </label>  
      <button type="submit">Submit</button>
    </form>
    
  )
}