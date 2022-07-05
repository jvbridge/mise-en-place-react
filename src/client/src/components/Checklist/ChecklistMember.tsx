import { useState } from 'react';
import { ListGroupItem } from 'react-bootstrap';

export interface ChecklistItemProps {
  name: string;
  done: boolean;
  display: boolean;
  id: string;
  checklistId: string;
}

// TODO: import values

function ChecklistMember(props: ChecklistItemProps) {
  const { name, done, display, id, checklistId } = props;
  const [checked, setChecked] = useState(done);

  return (
    <ListGroupItem style={{ padding: 0 }}>
      <div className="d-flex  align-items-center to-do-item justify-items-between">
        <input
          className="form-check-input checklist-item-checkbox mx-1"
          type="checkbox"
          value=""
          onChange={(e) => setChecked(e.currentTarget.checked)}
          checked={checked}
        />
        <div className="p-2 ">{name}</div>
        {display ? (
          <></>
        ) : (
          <button className="addon-btn p-2">Delete item</button>
        )}
      </div>
    </ListGroupItem>
  );
}

export default ChecklistMember;
