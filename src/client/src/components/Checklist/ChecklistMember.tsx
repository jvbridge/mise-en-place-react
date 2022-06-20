import { ListGroupItem } from 'react-bootstrap';

export interface ChecklistItemProps {
  name: string;
  done: boolean;
  display: boolean;
}

function ChecklistMember(props: ChecklistItemProps) {
  const { name, done } = props;
  return (
    <ListGroupItem className="list-group-item to-do-item">{name}</ListGroupItem>
  );
}

export default ChecklistMember;
