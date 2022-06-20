export type ChecklistProps = {
  checklistItems: checklistItem[];
  name: string;
  displayList: boolean;
};

export type checklistItem = {
  name: string;
  done: boolean;
};

/**
 * Intellisense is cool
 * @param props
 * @returns
 */
function Checklist(props: ChecklistProps) {
  // destructuring the props
  const { checklistItems, name } = props;

  return (
    <div className="card to-do-card" style={{ width: '100%' }}>
      <div className="card-header to-do-card-header">
        {name}
        <a href="" id="plus">
          <i className="fa-solid fa-plus"></i>
        </a>
      </div>
      <ul className="list-group list-group-flush">
        {checklistItems.length ? (
          checklistItems.map((item) => {
            return (
              <li className="list-group-item to-do-item">Name goes here</li>
            );
          })
        ) : (
          <li className="list-group-item to-do-item">No items yet!</li>
        )}
      </ul>
    </div>
  );
}

export default Checklist;
