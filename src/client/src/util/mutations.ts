import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        todo {
          _id
        }
      }
    }
  }
`;

export const ADD_CHECKLIST = gql`
  mutation AddChecklist($name: String!) {
    addChecklist(name: $name) {
      _id
      name
      items {
        name
        done
        _id
      }
    }
  }
`;

export const REMOVE_CHECKLIST = gql`
  mutation RemoveChecklist($id: ID!) {
    removeChecklist(id: $id) {
      name
      _id
      items {
        name
        done
        _id
      }
    }
  }
`;

export const ADD_CHECKLIST_ITEM = gql`
  mutation AddChecklistItem($addChecklistItemId: ID!, $itemName: String!) {
    addChecklistItem(id: $addChecklistItemId, itemName: $itemName) {
      _id
      name
      done
    }
  }
`;

export const REMOVE_CHECKLIST_ITEM = gql`
  mutation RemoveChecklistItem($checklistId: ID!, $itemId: ID!) {
    removeChecklistItem(checklistId: $checklistId, itemId: $itemId) {
      _id
      name
      done
    }
  }
`;

export const MARK_ITEM_DONE = gql`
  mutation MarkItemDone($checklistId: ID!, $itemId: ID!) {
    markItemDone(checklistId: $checklistId, itemId: $itemId) {
      _id
      name
      done
    }
  }
`;

export const MARK_ITEM_NOT_DONE = gql`
  mutation MarkItemNotDone($checklistId: ID!, $itemId: ID!) {
    markItemNotDone(checklistId: $checklistId, itemId: $itemId) {
      _id
      name
      done
    }
  }
`;

export const MARK_ALL_NOT_DONE = gql`
  mutation MarkAllNotDone($checklistId: ID!) {
    markAllNotDone(checklistId: $checklistId) {
      _id
      name
      done
    }
  }
`;
