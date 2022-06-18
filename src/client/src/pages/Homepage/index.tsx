import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import kanban from './kanban.png';

function Homepage() {
  const [showSignup, setSignup] = useState(false);
  const [showLogin, setLogin] = useState(false);

  const handleCloseLogin = () => {
    setLogin(false);
  };

  const handleOpenLogin = () => {
    setLogin(true);
  };

  const handleCloseSignup = () => {
    setSignup(false);
  };

  const handleOpenSignup = () => {
    setSignup(true);
  };

  return (
    <>
      <body className="home-body">
        <div className="d-flex home-row justify-content-center align-items-center">
          <div className="col-6">
            <div className="container home-container container-fluid bg-light text-center">
              <h1 className="app-name">Mise en Place</h1>
              <p className="slogan">Put everything in place</p>
              <img src={kanban} width="250px" height="250px" alt="" />
              <h3>Let's Get Organized</h3>
              <div className="button-group">
                {/* Login Button trigger modal  */}
                <Button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleOpenLogin}
                >
                  Login
                </Button>
                {/* Sign Up Button trigger modal */}
                <Button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleOpenSignup}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>

      {/* log in modal */}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Log in to Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseLogin}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* sign up modal */}
      <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignup}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSignup}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Homepage;
