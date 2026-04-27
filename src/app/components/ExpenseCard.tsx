'use client';

import styled from "styled-components";
import { useState } from "react";

type ExpenseProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  icon?: string;
  onDelete?: (id: number) => void;
  onEdit?: () => void;
};


const Card = styled.div`
  background-color: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb; 
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  width: 100%;          // faz o Card ocupar 100% do espaço disponível
  margin-bottom: 1rem;
  box-sizing: border-box; // garante que padding e borda não aumentem o tamanho

   @media (max-width: 480px) {
    padding: 0.75rem;
  }

`;

const LeftContent = styled.div`
display: flex;
align-items: center;
gap: 0.75rem;

min-width: 0; // 🔹 Permite que o conteúdo encolha

@media (max-width: 480px) {
    gap: 0.5rem;
  
  }

`;

const Icon = styled.span`
  font-size: 1.25rem;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0; // 🔹 Impede que o ícone encolha

   @media (max-width: 480px) {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    padding: 0.375rem;
  }

`;

const Texts = styled.div`
flex: 1;
min-width: 0; // 🔹 CRUCIAL para text-overflow funcionar
overflow: hidden; // 🔹 NECESSÁRIO para text-overflow

  @media (max-width: 480px) {
    max-width: calc(100% - 3rem); // 🔹 Considera ícone + espaçamento
  }

`;

const Title = styled.h3`
font-size: 1rem;
font-weight: 600;
color: #1f2937;
margin-bottom: 0.25rem;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

 @media (max-width: 480px) {
    font-size: 0.875rem;
    
  }

`;

const Description = styled.p`
font-size: 0.875rem;
color: #4b5563;
white-space: normal;
margin: 0;
width: 100%;

   @media (max-width: 480px) {
    font-size: 0.75rem;
  }

`;

const Price = styled.span`
font-size: 1rem;
font-weight: 600;
color: #10b981;
margin-right: 0.5rem;
margin-left: 1rem;
white-space: nowrap;
flex-shrink: 0; // 🔹 Impede que o preço encolha

@media (max-width: 480px) {
    font-size: 0.875rem;
    margin-left: 0.5rem;
     margin-right: 0.25rem;
}
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
  position: relative;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


export default function ExpenseCard({ id, name, description, price, icon, onDelete, onEdit }: ExpenseProps) {

  //estado do menu
  const [menuOpen, setMenuOpen] = useState(false);

  //estado para edição
  const [editingName, setEditingName] = useState(name);
  const [editingPrice, setEditingPrice] = useState(price.toString());
  const [editingDescription, setEditingDescription] = useState(description);

  function openMenu() {
    setMenuOpen(prev => !prev);
  }

  //função do PACTH que é para atualizar o campo que o usuário seleciona
  async function updateExpense(
    id: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
    }
  ) {
    await fetch('/api/expenses', {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id,
        ...data
      }),
    });

    //para atualizar a tela
    location.reload()
  }


  return (
    <Card>
      <LeftContent>
        {icon && <Icon>{icon}</Icon>}
        <Texts>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </Texts>
      </LeftContent>
      <RightContent>
        <Price>R$ {price.toFixed(2).replace('.', ',')}</Price>
        <Actions>
          {onDelete && (
            <button onClick={() => onDelete(id)}>🗑️</button>
          )}
          {onEdit && (
            <button onClick={onEdit}>📝</button>
          )}
          <button onClick={openMenu}>...</button>
          {menuOpen && (
            <>
            {/* fundo invisível */}
              <div
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 5,
                }}
              />
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              background: "white",
              border: "1px solid #ccc ",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              gap: "0.5rem",
              minWidth: "220px",
              zIndex: 10,
            }}>
              
              <div style={{display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                 <label style={{ fontSize: "0.75rem", color: "#6b7280" }}>Preço</label>
                <input
                  type="number"
                  value={editingPrice}
                  onChange={(e) => setEditingPrice(e.target.value)}
                  style={{ 
                    padding: "0.4rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "0.85rem"

                  }}
                />
                <button style={{
                  padding: "0.4rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "#10b981",
                  color: "white",
                  fontSize: "0.8rem",
                  cursor: "pointer"

                }} 
                onClick={() => {
                  updateExpense(id, { price: Number(editingPrice) });
                  setMenuOpen(false);
                }}>Salvar</button>
              </div>

            
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.75rem", color: "#6b7280" }}>Nome</label>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  style={{ 
                    padding: "0.4rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "0.85rem"
                  }}
                />
                <button style={{
                  padding: "0.4rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "#10b981",
                  color: "white",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
                onClick={() => {
                  updateExpense(id, { name: editingName });
                  setMenuOpen(false);
                }}>Salvar</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.75rem", color: "#6b7280" }}>Descrição</label>
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  style={{ 
                    padding: "0.4rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "0.85rem"
                  }}
                />
                <button style={{
                  padding: "0.4rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "#10b981",
                  color: "white",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
                onClick={() => {
                  updateExpense(id, { description: editingDescription });
                  setMenuOpen(false);
                }}>Salvar descrição</button>
              </div>

            </div>
          </>
          )}
        </Actions>
      </RightContent>
    </Card>
  );
}