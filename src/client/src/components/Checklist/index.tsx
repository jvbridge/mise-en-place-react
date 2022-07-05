import React, { FormEvent, useState } from 'react';
import { Card, ListGroup, Form, FormControl } from 'react-bootstrap';
import ChecklistMember from './ChecklistMember';

export interface ChecklistProps {
  checklistItems: ChecklistItem[];
  name: string;
  displayList: boolean;
  id: string;
}

export interface ChecklistItem {
  _id: string;
  name: string;
  done: boolean;
}

function Checklist({ checklistItems, name, displayList, id }: ChecklistProps) {
  // usestate for adding new items to the list
  const [newItem, setNewItem] = useState({ name: '', hidden: true });

  // submission for handling a new item on the checklists
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('submitting: ', newItem.name);
    setNewItem({ name: '', hidden: true });
  };

  // handler that propagates the value to the usestate
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewItem({
      hidden: newItem.hidden,
      name: value,
    });
  };

  // conditional rendering for adding an item to the list (for display lists)
  let addItem;

  if (!displayList) {
    addItem = (
      <button
        className="link-button plus"
        onClick={() => {
          setNewItem({
            name: newItem.name,
            hidden: !newItem.hidden,
          });
        }}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    );
  }

  return (
    <Card className="to-do-card" style={{ width: '100%' }}>
      <Card.Header className="to-do-card-header">
        <div className="d-flex justify-content-between">
          {name}
          {addItem}
        </div>
      </Card.Header>
      <Form
        onSubmit={handleSubmit}
        className="input-group"
        hidden={newItem.hidden}
      >
        <FormControl
          type="text"
          placeholder="New Checklist Item"
          aria-label="checklist-item"
          aria-describedby="button-addon2"
          onChange={handleChange}
          value={newItem.name}
        />
        <button type="button" className="addon-btn" onClick={handleSubmit}>
          Add Item
        </button>
      </Form>
      <ListGroup variant="flush">
        {checklistItems.length ? (
          checklistItems.map((item, index) => {
            return (
              <ChecklistMember
                key={`List ${id}, item ${index}`}
                id={item._id}
                name={item.name}
                done={item.done}
                display={displayList}
              />
            );
          })
        ) : (
          <li className="list-group-item to-do-item">No items yet!</li>
        )}
      </ListGroup>
    </Card>
  );
}

export default Checklist;
