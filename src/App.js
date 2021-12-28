import React, {useState} from 'react';
import './styles/blocks/App.scss';
import { ContactDetails } from './ContactDetails/ContactDetails';
import ContactsList from './ContactsList/ContactsList';
import NewContactForm from './NewContactForm/NewContactForm';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initialValue)

  const save = (value) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
}

function App() {
  const [detailsIsShown, setDetailsIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const addContact = (contact) => {
    setContacts([contact, ...contacts]);
    localStorage.setItem(contact.id, JSON.stringify(contacts));
  };

  const deleteContact = (contact) => {
    setContacts(contacts.filter(el => el.id !== contact.id));
    localStorage.removeItem(contact.id, JSON.stringify(contacts));
  };

  const editContact = (currentContact, changedContact) => {
    setContacts(contacts.map(el => {
     if ( el.id !== currentContact.id) {
       return el;
     };

     return changedContact;
    }));

    localStorage.removeItem(currentContact.id, JSON.stringify(contacts));
    localStorage.setItem(changedContact.id, JSON.stringify(contacts));
  };

  const toggleDetailsPage = () => {
    setDetailsIsShown(!detailsIsShown);
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
  };

  const hideForm = () => {
    setFormIsShown(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">My contact list</h1>

      {contacts.length === 0 && ('No contacts yet')}

      {!detailsIsShown && (
        <ContactsList
          contacts={contacts}
          deleteContact={deleteContact}
          toggleDetailsPage={toggleDetailsPage}
          selectContact={selectContact}
        />
      )}
      
      {detailsIsShown && (
        <ContactDetails
          selectedContact={selectedContact}
          toggleDetailsPage={toggleDetailsPage} 
          editContact={editContact}
        />)}

      {formIsShown && !detailsIsShown && (<NewContactForm addContact={addContact} hideForm={hideForm} />)}

      {!detailsIsShown && (
        <button
          className="button"
          onClick={()=> setFormIsShown(!formIsShown)}
      >
          {!formIsShown ? ('+  Add contact') : ('Cancel')}
      </button>)}
    </div>
  );
}

export default App;
