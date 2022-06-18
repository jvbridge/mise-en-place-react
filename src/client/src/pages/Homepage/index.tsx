import kanban from './kanban.png';

function Homepage() {
  return (
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
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Homepage;
