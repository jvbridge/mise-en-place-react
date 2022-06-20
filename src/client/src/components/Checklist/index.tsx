import ChecklistMember from './ChecklistMember';

export interface ChecklistProps {
  checklistItems: ChecklistItem[];
  name: string;
  displayList: boolean;
}

export interface ChecklistItem {
  name: string;
  done: boolean;
}

function Checklist({ checklistItems, name, displayList }: ChecklistProps) {
  // conditional rendering for adding an item to the list
  let addItem;

  if (!displayList) {
    addItem = (
      <a href="" id="plus">
        <i className="fa-solid fa-plus"></i>
      </a>
    );
  }

  return (
    <div className="card to-do-card" style={{ width: '100%' }}>
      <div className="card-header to-do-card-header">
        {name}
        {addItem}
      </div>
      <ul className="list-group list-group-flush">
        {checklistItems.length ? (
          checklistItems.map((item) => {
            return (
              <ChecklistMember
                name={item.name}
                done={item.done}
                display={displayList}
              />
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
