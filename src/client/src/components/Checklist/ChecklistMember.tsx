export interface ChecklistItemProps {
  name: string;
  done: boolean;
  display: boolean;
}

function ChecklistMember(props: ChecklistItemProps) {
  const { name, done } = props;
  return <li className="list-group-item to-do-item">{name}</li>;
}

export default ChecklistMember;
