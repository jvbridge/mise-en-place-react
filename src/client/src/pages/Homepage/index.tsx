import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import kanban from './kanban.png';

function Homepage() {
  const [showSignup, setSignup] = useState(false);
  // const [showLogin, setLogin] = useState(false);

  const handleCloseSignup = () => {
    setSignup(false);
  };

  const handleShowSignup = () => {
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
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </button>
                {/* Sign Up Button trigger modal */}
                <Button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleShowSignup}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>

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
