import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

interface NavLinks {
  path: string;
  label: string;
}

interface NavbarProps {
  showBrand?: boolean;
  links?: NavLinks[];
}

const NavbarContainer = ({ showBrand, links }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }
  return (
    <Navbar color="light" light expand="md">
      {showBrand && (
        <NavbarBrand id="nav-brand" href="/">
          Valhalla Chat
        </NavbarBrand>
      )}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {links && renderLinks()}
        </Nav>
      </Collapse>
    </Navbar>
  );

  function renderLinks() {
    return links!.map((link: NavLinks, index: any) => {
      return (
        <NavItem key={index}>
          <NavLink id={`link-${index}`} href={link.path}>
            {link.label}
          </NavLink>
        </NavItem>
      );
    });
  }
};

NavbarContainer.defaultProps = {
  showBrand: true,
};

export default NavbarContainer;

{
  /* <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */
}