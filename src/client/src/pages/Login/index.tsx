import { FormEvent, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import auth from '../../util/auth';
import { useMutation } from '@apollo/client';

import { ADD_USER, LOGIN } from '../../util/mutations';

// resources
import kanban from './kanban.png';
// enum for the type of modal we will be using
enum ModalType {
  login,
  signup,
}

function Login() {
  // apollo mutation for adding a user
  const [addUser /*{ error: signUpError, data: signUpData }*/] =
    useMutation(ADD_USER);

  // apollo mutation for logging in
  const [login /*{ error: loginError, data: loginData }*/] = useMutation(LOGIN);

  // the state for modal visibility
  const [showModal, setShowModal] = useState(false);

  // state for what the modal should be
  const [currModalType, setCurrModalType] = useState(ModalType.login);

  // handlers for opening and closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (currType: ModalType) => {
    setCurrModalType(currType);
    setShowModal(true);
  };

  // use state for the form to submit
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  // handling the changes so that the formstate will appropriately login
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handler for submission of the field
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('submitted form');
    try {
      // logging in
      if (currModalType === ModalType.login) {
        const { data } = await login({
          variables: { ...formState },
        });
        auth.login(data.login.token);
      }
      // signing up
      if (currModalType === ModalType.signup) {
        // send the data to the graphql serer
        const { data } = await addUser({
          variables: { ...formState },
        });

        // then add the token to local storage
        auth.login(data.addUser.token);
      }
    } catch (error) {
      console.error('got error:\n', error);
    }
  };

  return (
    <>
      {/* main body of the page */}
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
      {/* modal for logging in */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
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
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
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
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
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
