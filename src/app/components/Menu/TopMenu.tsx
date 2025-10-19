"use client"

import { useState } from "react"
import Link from "next/link"
import { FaBars } from "react-icons/fa"
import styled from "styled-components"

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #374151;
  cursor: pointer;

  &:hover {
    color: #059669;
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  z-index: 100;
  border: 1px solid #e5e7eb;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;

  &.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  // 🔹 Seta visual que conecta o menu ao botão
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 16px;
    border-width: 0 8px 10px 8px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
    filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.1));
  }
`

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const MenuItem = styled.li`
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: #374151;

    &:hover {
      color: #059669;
    }
  }
`

const menus = [
    { title: "Cadastrar", path: "/dashboard/register" },
    { title: "Página 1", path: "/your-path" },
    { title: "Página 1", path: "/your-path" },

]
export default function TopMenu() {

    const [open, setOpen] = useState(false)

    return (
        
       <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}>
       <span style={{ fontSize: "1rem", color: "#374151" }}>Gestão</span>
       <MenuButton 
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
       >
        <FaBars />
       </MenuButton>
       {open && (
        <DropdownMenu className={open ? "active" : ""}>
          <MenuList>
            {menus.map((item, idx) => (
              <MenuItem key={idx}>
                <Link href={item.path} onClick={() => setOpen(false)}>
                  {item.title}
                </Link>
              </MenuItem>
            ))}
          </MenuList>
        </DropdownMenu>
      )}
        </div>
    )
}