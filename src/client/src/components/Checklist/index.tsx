import { useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react';
import {
  Card,
  ListGroup,
  Form,
  FormControl,
  ListGroupItem,
} from 'react-bootstrap';
import {
  ADD_CHECKLIST_ITEM,
  REMOVE_CHECKLIST_ITEM,
} from '../../util/mutations';

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

  // import checklist items from parent, make a usestate for it
  const [items, setItems] = useState(checklistItems);

  // mutation for adding new items to a checklist
  const [addItem] = useMutation(ADD_CHECKLIST_ITEM, {
    // propogate the new items to our usestate
    onCompleted: (data) => {
      setItems(data.addChecklistItem);
    },
  });

  const [removeItem] = useMutation(REMOVE_CHECKLIST_ITEM, {
    onCompleted: (data) => {
      setItems(data.removeChecklistItem);
    },
  });

  // submission for handling a new item on the checklists
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // make sure we have an item to submit
    if (!newItem.name) return;

    // send the gql state for the item
    await addItem({
      variables: { itemName: newItem.name, addChecklistItemId: id },
    });

    // empty the form and hide it
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

  const deleteItem = async (itemId: string) => {
    await removeItem({
      variables: {
        checklistId: id,
        itemId,
      },
    });
  };

  // conditional rendering for adding an item to the list (for display lists)
  let addItemDisplay;

  if (!displayList) {
    addItemDisplay = (
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
          {addItemDisplay}
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
        {items.length ? (
          items.map((item, index) => {
            return (
              <ListGroupItem
                key={`List ${id}, item ${index}`}
                style={{ padding: 0 }}
              >
                <div className="d-flex align-items-center to-do-item">
                  <input
                    className="form-check-input checklist-item-checkbox mx-3"
                    type="checkbox"
                    onChange={(e) =>
                      console.log('setting checked for: ', item._id)
                    }
                    checked={item.done}
                  />
                  <div className="flex-fill">{item.name}</div>
                  {displayList ? (
                    <></>
                  ) : (
                    <button
                      className="addon-btn p-2"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete item
                    </button>
                  )}
                </div>
              </ListGroupItem>
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
