function Calendar() {
  return (
    <>
      <header className="text-center">
        <h3>Calendar</h3>
      </header>

      <div className="container container-fluid">
        <div className="row">
          <div className="main-container">
            <div className="card calendar-card" style={{ width: '100%' }}>
              <div className="card-body">
                <div className="card-header calendar-header card-title">
                  <h5>
                    <strong>Today is:</strong> <span id="today"></span>
                  </h5>
                </div>
                {/* <div id="calendar"></div> Calendar component here */}
                <a href="/addEvent">
                  <button className="btn addToCal-btn">Add an Event</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
