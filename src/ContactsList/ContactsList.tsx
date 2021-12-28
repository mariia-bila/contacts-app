import React, {useState, SyntheticEvent} from 'react';
import { ConfirmationWindow } from '../ConfirmationWindow/ConfirmationWindow';
import { Contact } from '../types/Contact';


type Props = {
  contacts: Contact[];
  deleteContact: (contact?:Contact) => void;
  selectContact: (contact:Contact) => void;
  toggleDetailsPage: () => void;
};

const ContactsList: React.FC<Props> = ({ contacts, deleteContact, toggleDetailsPage, selectContact }) => {
  const [confirmationIsVisible, setConfirmationIsVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<null | Contact>(null);
  const [inputsDisabled, setInputsDisabled] = useState(false);

  const hideConfirmation = () => {
    setConfirmationIsVisible(false);
    setInputsDisabled(false);
  };

  const deleteItem = (event:SyntheticEvent, contact:Contact) => {
    event.preventDefault();
    setConfirmationIsVisible(true)
    setContactToDelete({...contact})
    setInputsDisabled(true)
  };

  const getDetails = (event:SyntheticEvent, contact:Contact) => {
    event.preventDefault();
    toggleDetailsPage();
    selectContact(contact);
  };

  return (
    <div>
      <ul className="list">
      {contacts.map(contact => (
        <li
          key={contact.id}
          className="card"
        >
          <span className="card__name">
            {contact.name}
          </span>

          {contact.surname && (
            <span className="card__name">
              {contact.surname}
            </span>
          )}

          <p className="card__tel">
            {contact.tel}
          </p>

          <button
            className="button card__button"
            onClick={(event) => deleteItem(event, contact)}
            disabled={inputsDisabled}
          >
           Delete
          </button>

          <button
            className="button card__button"
            onClick={(event) => getDetails(event, contact)}
            disabled={inputsDisabled}
          >
            Details
         </button>
         </li>
        ))}
      </ul>

      {confirmationIsVisible && contactToDelete && (
        <ConfirmationWindow
          reject={hideConfirmation}
          submit={deleteContact}
          contactToDelete={contactToDelete}
          hideConfirmation={hideConfirmation}
        />
      )}
    </div>
  )
};

export default ContactsList;