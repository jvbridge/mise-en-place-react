import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import auth from '../../util/auth';
import { useMutation } from '@apollo/client';

// resources
import kanban from './kanban.png';
// enum for the type of modal we will be using
enum ModalType {
  login,
  signup,
}

function Login() {
  // the state for modal visibility
  const [showModal, setShowModal] = useState(false);

  // state for what the modal should be
  const [currModalType, setCurrModalType] = useState(ModalType.login);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (currType: ModalType) => {
    setCurrModalType(currType);
    setShowModal(true);
  };

  const handleSubmit = async (event: Event | MouseEvent) => {
    event.preventDefault();
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="home-body">
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
                  onClick={() => handleOpenModal(ModalType.login)}
                >
                  Login
                </Button>
                {/* Sign Up Button trigger modal */}
                <Button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => handleOpenModal(ModalType.signup)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={(e) => handleSubmit}>
          <Modal.Header closeButton>
            {/* set the title as appropriate */}
            {currModalType === ModalType.login ? (
              <Modal.Title>Log in to Your Account</Modal.Title>
            ) : (
              <Modal.Title>Create Your Account</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <Form.Group controlId="formEmail">
                <Form.Label for="inputEmail" className="col-4 col-form-label">
                  Email
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label
                  for="inputPassword"
                  className="col-4 col-form-label"
                >
                  Password
                </Form.Label>
                <div className="col-sm-10">
                  <Form.Control
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
