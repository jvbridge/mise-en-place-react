import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import logo from './mise_en_place_transparent.png';
function Homebar() {
  return (
    <Navbar className="justify-content-center">
      <img src={logo} alt="" width="100" height="80" id="logo" />
      <Container>
        <Nav>
          <LinkContainer to={'/Home'}>
            <Nav.Link href="/Home">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Dashboard'}>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Calendar'}>
            <Nav.Link href="/Calendar">Calendar</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Upcoming'}>
            <Nav.Link href="/Upcoming">Upcoming</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Repeated'}>
            <Nav.Link href="/Repeated">Repeated</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Checklist'}>
            <Nav.Link href="/Checklist">Checklist</Nav.Link>
          </LinkContainer>
          {/*             
Need conditional for logged in
            <li class="nav-item">
                <a class="nav-link" id="logout" href="/login">Logout</a>
            </li> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Homebar;
