'use client'
import { Category } from "@prisma/client"

export default function ExpenseForm(props: any) {
  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <form onSubmit={props.onSubmit}>
        <div>
            <label htmlFor='name' className='block text-sm font-semibold text-gray-800 mb-1'>
              Nome
            </label>

            <input
              type="text"
              name="name"
              id="name"
              value={props.formData.name}
              onChange={(e) => props.formActionsetName(e.target.value)}
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
              value={props.formDatadescription}
              onChange={(e) => props.formAction.setDescription(e.target.value)}
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
              value={props.formData.category}
              onChange={(e) => props.formAction.setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">--Selecione--</option>
              {props.categorias.map((cat: Category) => (
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
              value={props.formData.price}
              onChange={(e) => props.formAction.setPrice(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
              placeholder='digite aqui'
            />
          </div>
          <button type="submit" className='w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'>{props.isSubmitting
            ? 'Enviando...'
            : props.isEdit
              ? 'Atualizar'
              : 'Enviar'}</button>
      </form>
    </div>
  )
}