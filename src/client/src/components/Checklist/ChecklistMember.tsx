import { useState } from 'react';
import { ListGroupItem, ToggleButton } from 'react-bootstrap';

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
    <ListGroupItem className="to-do-item">
      <ToggleButton
        type="checkbox"
        variant=""
        checked={checked}
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        Done
      </ToggleButton>{' '}
      {name}
    </ListGroupItem>
  );
}

export default ChecklistMember;
