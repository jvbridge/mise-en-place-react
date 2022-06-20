import Checklist from '../../components/Checklist';
import { ChecklistItem } from '../../components/Checklist';

function Dashboard() {
  const items: ChecklistItem[] = [{ name: 'test Item', done: true }];

  const missedItems: ChecklistItem[] = [];
  return (
    <>
      <div>Dashboard</div>
      <div className="container">
        <div className="row">
          <div className="col-9">filer space</div>
          <div className="col-3">
            <Checklist
              name="Passed in name"
              checklistItems={items}
              displayList={false}
            />
            <Checklist
              name="Missed Todos:"
              checklistItems={missedItems}
              displayList={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
