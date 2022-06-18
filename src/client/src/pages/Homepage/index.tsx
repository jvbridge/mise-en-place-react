import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import kanban from './kanban.png';

function Homepage() {
  const [showModal, setModal] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleOpenModal = () => {
    setModal(true);
  };

  // TODO: attach to backend

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
                  onClick={handleOpenModal}
                >
                  Login
                </Button>
                {/* Sign Up Button trigger modal */}
                <Button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleOpenModal}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>

      {/* log in modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log in to Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="signup-form">
            <div className="row mb-3">
              <Form.Label
                for="inputEmailSignUp"
                className="col-4 col-form-label"
              >
                Email
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  className="form-control"
                  id="email-input-signup"
                  placeholder="Email"
                />
              </div>

              <Form.Label
                for="inputPasswordSign"
                className="col-4 col-form-label"
              >
                Password
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="password"
                  className="form-control"
                  id="password-input-signup"
                  placeholder="Password"
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Homepage;
