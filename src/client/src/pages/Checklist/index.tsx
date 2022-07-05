import Checklist from '../../components/Checklist';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHECKLISTS } from '../../util/queries';
import React, { FormEvent, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { ADD_CHECKLIST } from '../../util/mutations';

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

  // Mutation for adding a new checklist
  const [addChecklist] = useMutation(ADD_CHECKLIST);

  // submission of new checklist creation form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('create new list using name: ', newChecklistState.name);
    // send the server the update
    await addChecklist({
      variables: {
        name: newChecklistState.name,
      },
    });
    // empty and hide the create new bar, also forces component to re-render
    setNewChecklistState({ hidden: true, name: '' });
  };

  // handler for form that propogates value to usestate
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewChecklistState({
      hidden: newChecklistState.hidden,
      name: value,
    });
  };

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
                  <Form
                    onSubmit={handleSubmit}
                    className="input-group mb-3"
                    id="addCheck-form"
                    hidden={newChecklistState.hidden}
                  >
                    <FormControl
                      type="text"
                      className="form-control"
                      placeholder="New Checklist Name"
                      aria-label="checklist-item"
                      aria-describedby="button-addon2"
                      onChange={handleChange}
                      value={newChecklistState.name}
                    />
                    <button
                      type="button"
                      className="addon-btn"
                      onClick={handleSubmit}
                    >
                      Add List
                    </button>
                  </Form>

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
