import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          Visit us on our site<sourcelink>www.foodcourt.com</sourcelink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
