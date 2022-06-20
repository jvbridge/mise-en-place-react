function Calendar() {
  return (
    <>
      <header className="text-center">
        <h3>Calendar</h3>
      </header>

      <div className="container container-fluid">
        <div className="row">
          <div className="col-9 main-container">
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
          {/* TODO: checklist component */}
          <div className="col-3">
            <div className="card to-do-card" style={{ width: '100%' }}>
              <div className="card-header to-do-card-header">
                To Do:
                <a href="checklist" id="plus">
                  <i className="fa-solid fa-plus"></i>
                </a>
              </div>
              <ul className="list-group list-group-flush">
                {/* {{#each checklistItems as |item|}} */}
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
                {/* {{#each checklistItems as |item|}} */}
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

export default Calendar;
