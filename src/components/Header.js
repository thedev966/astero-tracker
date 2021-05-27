import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>AsteroTracker</Logo>
      <Navbar>
        <NavbarItem>
          <a href="#asteroid-table">Get Started</a>
        </NavbarItem>
        <NavbarItem>Credits</NavbarItem>
        <NavbarItem>
          <a href="#footer">Contact</a>
        </NavbarItem>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  place-items: center;
  color: var(--light-gray);
  margin-top: 20px;
  z-index: 3;
`;

const Logo = styled.h2`
  font-size: 26px;
  font-weight: 400;
  cursor: pointer;
`;

const Navbar = styled.ul`
  list-style-type: none;
  display: flex;
  grid-column: 8 / span 5;
`;

const NavbarItem = styled.li`
  display: inline-block;
  margin-left: 40px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
  padding-bottom: 4px;
  transition: all 250ms ease;

  a {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    border-bottom: 3px solid var(--purple);
  }
`;
