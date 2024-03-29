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
  MARK_ITEM_DONE,
  MARK_ITEM_NOT_DONE,
  MARK_ALL_NOT_DONE,
} from '../../util/mutations';

export interface ChecklistProps {
  checklistItems: ChecklistItem[];
  name: string;
  id: string;
}

export interface ChecklistItem {
  _id: string;
  name: string;
  done: boolean;
}

function Checklist({ checklistItems, name, id }: ChecklistProps) {
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

  // mutation for removing an item from the checklist
  const [removeItem] = useMutation(REMOVE_CHECKLIST_ITEM, {
    onCompleted: (data) => {
      setItems(data.removeChecklistItem);
    },
  });

  // mutations for marking items done or not done
  const [setItemDone] = useMutation(MARK_ITEM_DONE, {
    onCompleted: (data) => {
      setItems(data.markItemDone);
    },
  });

  const [setItemNotDone] = useMutation(MARK_ITEM_NOT_DONE, {
    onCompleted: (data) => {
      setItems(data.markItemNotDone);
    },
  });

  const [setAllNotDone] = useMutation(MARK_ALL_NOT_DONE, {
    onCompleted: (data) => {
      setItems(data.markAllNotDone);
    },
  });
  // submission for handling adding a new item on the checklists
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

  // handler for deleting individual items from a checklist
  const deleteItem = async (itemId: string) => {
    await removeItem({
      variables: {
        checklistId: id,
        itemId,
      },
    });
  };

  // handler for toggling the state of an item on a list
  const toggleItem = async (itemId: string, done: boolean) => {
    done
      ? setItemDone({
          variables: {
            checklistId: id,
            itemId,
          },
        })
      : setItemNotDone({
          variables: {
            checklistId: id,
            itemId,
          },
        });
  };

  return (
    // the whole checklist is a bootstrap Card
    <Card className="to-do-card" style={{ width: '100%' }}>
      <Card.Header className="to-do-card-header">
        <div className="d-flex justify-content-between">
          {name}
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
        </div>
      </Card.Header>
      {/* conditionally rendered section for adding new items */}
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
      {/* list group of all items */}
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
                    onChange={(e) => toggleItem(item._id, e.target.checked)}
                    checked={item.done}
                  />
                  <div className="flex-fill">{item.name}</div>
                  <button
                    className="addon-btn p-2"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete item
                  </button>
                </div>
              </ListGroupItem>
            );
          })
        ) : (
          <li className="list-group-item to-do-item">No items yet!</li>
        )}
      </ListGroup>
      <button
        className="btn"
        onClick={() => {
          setAllNotDone({
            variables: {
              checklistId: id,
            },
          });
        }}
      >
        Mark all not done
      </button>
    </Card>
  );
}

export default Checklist;
