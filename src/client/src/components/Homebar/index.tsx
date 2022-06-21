import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import auth from '../../util/auth';

import logo from './mise_en_place_transparent.png';
function Homebar(/*{ loggedIn }: { loggedIn: boolean }*/) {
  let logOut;

  if (auth.loggedIn())
    logOut = (
      <LinkContainer to={'/'}>
        <Nav.Link onClick={() => auth.logout()}>Log Out</Nav.Link>
      </LinkContainer>
    );

  return (
    <Navbar className="justify-content-center">
      <img src={logo} alt="" width="100" height="80" id="logo" />
      <Container className="justify-content-center">
        <Nav>
          <LinkContainer to={'/Home'}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Dashboard'}>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Calendar'}>
            <Nav.Link>Calendar</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Upcoming'}>
            <Nav.Link>Upcoming</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Repeated'}>
            <Nav.Link>Repeated</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/Checklist'}>
            <Nav.Link>Checklist</Nav.Link>
          </LinkContainer>
          {logOut}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Homebar;
