function Dashboard() {
  return (
    <>
      <header className="text-center">
        <h3>Dashboard</h3>
      </header>

      {/* Today Overview column */}
      <div className="container container-fluid">
        <div className="dash-container">
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
      </div>
    </>
  );
}

export default Dashboard;
