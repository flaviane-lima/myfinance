'use client';

import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #f3f4f6;
  width: 100%;
  padding: 2rem 0rem;
  color: #1f2937;
  text-align: left;
  box-sizing: border-box;
  margin-bottom: 0.8rem;


  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    margin: 0;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Gestão Financeira</h1>
    </StyledHeader>
  );
}
