import { Card, ListGroup } from 'react-bootstrap';
import ChecklistMember from './ChecklistMember';

export interface ChecklistProps {
  checklistItems: ChecklistItem[];
  name: string;
  displayList: boolean;
  id: string;
}

export interface ChecklistItem {
  _id: string;
  name: string;
  done: boolean;
}

function Checklist({ checklistItems, name, displayList, id }: ChecklistProps) {
  // conditional rendering for adding an item to the list
  let addItem;

  if (!displayList) {
    addItem = (
      <button className="link-button plus">
        <i className="fa-solid fa-plus"></i>
      </button>
    );
  }

  return (
    <Card className="to-do-card" style={{ width: '100%' }}>
      <Card.Header className="to-do-card-header">
        <div className="d-flex justify-content-between">
          {name}
          {addItem}
        </div>
      </Card.Header>
      <ListGroup variant="flush">
        {checklistItems.length ? (
          checklistItems.map((item) => {
            return (
              <ChecklistMember
                id={item._id}
                name={item.name}
                done={item.done}
                display={displayList}
              />
            );
          })
        ) : (
          <li className="list-group-item to-do-item">No items yet!</li>
        )}
      </ListGroup>
    </Card>
  );
}

export default Checklist;
