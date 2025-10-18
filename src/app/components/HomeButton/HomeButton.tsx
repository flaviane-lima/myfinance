'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { FaHome } from 'react-icons/fa'

const StyledLink = styled(Link).attrs({
    'aria-label' : 'Tela inicial'
})`

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background-color: #374151;
  color: white;
  text-decoration: none;
  border-radius: 50%;
  font-size: 1.25rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #059669;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.5rem;
  }

`

// função
export default function HomeButton() {
    return (
        <StyledLink href="/">
            <FaHome />
        </StyledLink>
    )
}
