export const initialStore = () => {
  return {
    contacts: []
  };
};

const storeReducer = (store, action = {}) => {
  switch (action.type) {

    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        )
      };

    default:
      return store; 
  }
};

export default storeReducer;