import Checklist from '../../components/Checklist';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CHECKLISTS } from '../../util/queries';
import React, { FormEvent, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { ADD_CHECKLIST, REMOVE_CHECKLIST } from '../../util/mutations';

function ChecklistPage() {
  // the list of checklists
  const [lists, setLists] = useState([]);

  // query to get the state
  const { loading, error } = useQuery(GET_CHECKLISTS, {
    onCompleted: (data) => {
      setLists(data.checklists);
    },
  });

  // error printing if something happened bad with the server
  if (error) console.error('error: ', error);

  // usestate for creating new checklists
  const [newChecklistState, setNewChecklistState] = useState({
    hidden: true,
    name: '',
  });

  // Mutation for adding a new checklist
  const [addChecklist] = useMutation(ADD_CHECKLIST, {
    onCompleted: (data) => {
      setLists(data.addChecklist);
    },
  });

  // Mutation for deleting a checklist
  const [removeChecklist] = useMutation(REMOVE_CHECKLIST, {
    onCompleted: (data) => {
      setLists(data.removeChecklist);
    },
    onError: (error) => {
      console.error('error with removing checklist: ', error);
    },
  });

  // submission of new checklist creation form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('create new list using name: ', newChecklistState.name);
    // send the server the update, propogate to the lists
    await addChecklist({
      variables: {
        name: newChecklistState.name,
      },
    });
    // empty and hide the create new bar
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

  // handler for delete buttons deleting a list
  const handleDelete = async (id: string) => {
    await removeChecklist({ variables: { id } });
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

                  {lists.map((list: any, index: number) => {
                    return (
                      <div className="d-flex" key={'list ' + index}>
                        <Checklist
                          checklistItems={list.items}
                          name={list.name}
                          displayList={false}
                          id={list._id}
                        />
                        <button
                          className="btn btn-dark"
                          onClick={() => {
                            handleDelete(list._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
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
