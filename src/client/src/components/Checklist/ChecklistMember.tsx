import { useState } from 'react';
import { ListGroupItem } from 'react-bootstrap';

export interface ChecklistItemProps {
  name: string;
  done: boolean;
  display: boolean;
}

// TODO: import values

function ChecklistMember(props: ChecklistItemProps) {
  const { name, done } = props;
  const [checked, setChecked] = useState(done);
  return (
    <ListGroupItem className="to-do-item d-flex justify-content-between">
      {name}
      <input
        className="form-check-input checklist-item-checkbox"
        type="checkbox"
        value=""
        onChange={(e) => setChecked(e.currentTarget.checked)}
        checked={checked}
      />
    </ListGroupItem>
  );
}

export default ChecklistMember;
