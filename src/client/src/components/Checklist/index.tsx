export type ChecklistProps = {
  checklistItems: [checklistItem];
  name: string;
};

export type checklistItem = {
  name: string;
  done: boolean;
};

function Checklist(props: ChecklistProps) {
  const { checklistItems, name } = props;

  return (
    <>
      <div className="card to-do-card" style={{ width: '100%' }}>
        <div className="card-header to-do-card-header">
          To Do:
          <a href="checklist" id="plus">
            <i className="fa-solid fa-plus"></i>
          </a>
        </div>
        <ul className="list-group list-group-flush">
          {/* {{#each checklistItems as |item|}} */}
          <li className="list-group-item to-do-item">Name goes here</li>
          {/* {{/each}} */}
        </ul>
      </div>

      <div className="card to-do-card" style={{ width: '100%' }}>
        <div className="card-header missed-card-header">Missed To Dos:</div>
        <ul className="list-group list-group-flush">
          {/* {{#each checklistItems as |item|}} */}
          <li className="list-group-item missed-item">Name goes here</li>
          {/* {{/each}} */}
        </ul>
      </div>
    </>
  );
}

export default Checklist;
