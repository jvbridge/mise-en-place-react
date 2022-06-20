function Dashboard() {
  return (
    <>
      <header className="text-center">
        <h3>Dashboard</h3>
      </header>

      {/* Today Overview column */}
      <div className="container container-fluid">
        <div className="row">
          <div className="col-9 dash-container">
            <div className="card day-card" style={{ width: '100%' }}>
              <div className="card-body">
                <div className="card-header dash-header card-title">
                  <h5>What Your Day Looks Like:</h5>
                </div>
                <div className="card-subtitle mb-2 text-muted">
                  <h5>
                    <strong>Today is:</strong> <span id="today"></span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* TODO: checklist component */}
          {/* To-Do Column */}
          <div className="col-3">
            <div className="card to-do-card" style={{ width: '100%' }}>
              <div className="card-header to-do-card-header">
                To Do:
                <a href="checklist" id="plus">
                  <i className="fa-solid fa-plus"></i>
                </a>
              </div>
              <ul className="list-group list-group-flush">
                {/* {{#each checklistItems as | item | }} */}
                <li className="list-group-item to-do-item">
                  checklist name here
                </li>
                {/* {{/each}} */}
              </ul>
            </div>

            <div className="card to-do-card" style={{ width: '100%' }}>
              <div className="card-header missed-card-header">
                Missed To Dos:
              </div>
              <ul className="list-group list-group-flush">
                {/* {{#each checklistItems as | item | }} */}
                <li className="list-group-item missed-item">
                  checklist name here
                </li>
                {/* {{/each}} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
