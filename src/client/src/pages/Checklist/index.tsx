import Checklist from '../../components/Checklist';
import { useQuery } from '@apollo/client';
import { GET_CHECKLISTS } from '../../util/queries';

function ChecklistPage() {
  const { loading, data, error } = useQuery(GET_CHECKLISTS);
  const lists = data?.checklists || [];
  if (data) console.log('data: ', data);
  if (error) console.error('error: ', error);

  return (
    <div>
      {loading ? (
        <h3>"Loading Checklists..."</h3>
      ) : (
        <div className="row">
          <div className="main-container">
            <div className="card checklist-card" style={{ width: '100%' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between card-header dash-header card-title">
                  <h5>Your Checklists!</h5>
                  <button className="addCheck link-button plus">
                    <i className="fa-solid fa-plus " aria-hidden="false"></i>
                  </button>
                </div>
                <div className="checklist-form">
                  <div className="input-group mb-3" id="addCheck-form" hidden>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New To Do List"
                      aria-label="checklist-item"
                      aria-describedby="button-addon2"
                      id="addInput"
                    />
                    <button type="button" id="addon-btn">
                      Add List
                    </button>
                  </div>

                  {lists?.map((list: any) => {
                    return (
                      <Checklist
                        checklistItems={list.items}
                        name={list.name}
                        displayList={false}
                      />
                    );
                  })}

                  {/* Checklists go here
              
              {{#each checklists as |checklist|}}
                <div
                  className="checklist-id-wrapper"
                  data-checklist-id="{{checklist.id}}"
                >
  
                  <ul><h3 id="checklist-name">{{checklist.name}}</h3>
                    {{#each checklist.checklist_items as |item|}}
                      <input
                        className="form-check-input checklist-item-checkbox"
                        type="checkbox"
                        value=""
                        id="checklist-item-{{item.id}}"
                        {{#if item.is_complete}}checked{{/if}}
                      />
                      <label className="form-check-label" for="flexCheckChecked">{{item.description}}
                      </label>
                      <br />
                    {{/each}}
                  </ul>
                </div>
  
                <button className="add-item-btn" type="button" id="addon-btn-{{checklist.id}}">Add Item</button>
              {{/each}} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChecklistPage;
