import React, {useState} from 'react';
import './App.scss';
import { ContactDetails } from './ContactDetails/ContactDetails';
import ContactsList from './ContactsList/ContactsList';
import NewContactForm from './NewContactForm/NewContactForm';


const contact0 = {
  id: 0,
  contactName: '',
  surname:'',
  email:'',
  tel: '',
  dateOfBirth: '',
}

function App() {
  const [contacts, setContacts] = useState([]);
  const [detailsIsShown, setDetailsIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);
  const [selectedContact, setSelectedContact] = useState(contact0); /*should work with null */

  const addContact = (contact) => {
    setContacts([contact, ...contacts])
    // localStorage.setItem(contact.id, JSON.stringify(contacts))
  };

  const deleteContact = (contact) => {
    setContacts(contacts.filter(el => el.id !== contact.id))
    // localStorage.removeItem(contact.id, JSON.stringify(contacts))
  };

  const editContact = (currentContact, changedContact) => {
    setContacts(contacts.map(el => {
     if ( el.id !== currentContact.id) {
       return el;
     };
    //  setSelectedContact(contact2)
     return changedContact;
    }))
    // localStorage.removeItem(contact.id, JSON.stringify(contacts))
  };

  const toggleDetailsPage = () => {
    setDetailsIsShown(!detailsIsShown)
  };

  const selectContact = (contact) => {
    setSelectedContact(contact)
  };

  const hideForm = () => {
    setFormIsShown(false)
  };

  return (
    <div className="App">
      <h1 className="title">My contact list</h1>
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

      {formIsShown && (<NewContactForm addContact={addContact} hideForm={hideForm} />)}

      <button
          className="button"
          onClick={()=> setFormIsShown(!formIsShown)}
        >
          {!formIsShown ? ('+  Add contact') : ('Cancel')}
        </button>
    </div>
  );
}

export default App;
