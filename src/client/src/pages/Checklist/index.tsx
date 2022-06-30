import Checklist from '../../components/Checklist';
import { useQuery } from '@apollo/client';
import { GET_CHECKLISTS } from '../../util/queries';
import { useState } from 'react';

function ChecklistPage() {
  const { loading, data, error } = useQuery(GET_CHECKLISTS);

  // the list of checklists
  const lists = data?.checklists || [];

  // error printing if something happened bad with the server
  if (error) console.error('error: ', error);

  // usestate for creating new checklists
  const [newChecklistState, setNewChecklistState] = useState({
    hidden: true,
    name: '',
  });

  return (
    <>
      {loading ? (
        <h3>"Loading Checklists..."</h3>
      ) : (
        <div className="row">
          <div className="main-container">
            <div className="card checklist-card" style={{ width: '100%' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between card-header dash-header card-title">
                  <h5>Your Checklists!</h5>
                  <button
                    className="addCheck link-button plus"
                    onClick={() => {
                      setNewChecklistState({
                        ...newChecklistState,
                        hidden: !newChecklistState.hidden,
                      });
                    }}
                  >
                    <i className="fa-solid fa-plus " aria-hidden="false"></i>
                  </button>
                </div>
                <div className="checklist-form">
                  <div
                    className="input-group mb-3"
                    id="addCheck-form"
                    hidden={newChecklistState.hidden}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New Checklist List"
                      aria-label="checklist-item"
                      aria-describedby="button-addon2"
                      id="addInput"
                    />
                    <button
                      type="button"
                      id="addon-btn"
                      onClick={() => {
                        console.log(
                          'create new list using name: ',
                          newChecklistState.name
                        );
                      }}
                    >
                      Add List
                    </button>
                  </div>

                  {lists?.map((list: any, index: number) => {
                    return (
                      <Checklist
                        key={'list' + index}
                        checklistItems={list.items}
                        name={list.name}
                        displayList={false}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChecklistPage;
