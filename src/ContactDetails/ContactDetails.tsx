import React, {useState} from 'react';
import { ConfirmationWindow } from '../ConfirmationWindow/ConfirmationWindow';
import { Contact } from '../types/Contact';

type Props = {
  selectedContact: Contact;
  toggleDetailsPage: () => void;
  editContact: (contact:Contact) => void;
}

export const ContactDetails: React.FC<Props> = ({ selectedContact, toggleDetailsPage, editContact }) => {
  const [fields, setFields] = useState(Object.entries(selectedContact));
  const [currentContact, setCurrentContact] = useState(selectedContact);
  const [contactBackup, setContactBackup] = useState(selectedContact);
  const [newField, setNewField] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [confirmationIsVisible, setConfirmationIsVisible] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);

  const hideConfirmation = () => {
    setConfirmationIsVisible(false);
    setInputsDisabled(false);
  }
  
  const rejectChanges = () => {
    setCurrentContact(contactBackup);
    setFields(Object.entries(contactBackup));
    hideConfirmation();
  }

  const closeAndSave = (event) => {
    event.preventDefault();
    editContact(selectedContact, {...currentContact, id: selectedContact.id});
    toggleDetailsPage();
  };

  const undo = (event) => {
    event.preventDefault();
    setCurrentContact(contactBackup)
    setFields(Object.entries(contactBackup))
  };

  const deleteField = (event, key) => {
    event.preventDefault();
    setContactBackup({...currentContact})
    setFields(fields.filter(el => el[0] !== key))
    setConfirmationIsVisible(true)
    setInputsDisabled(true)
    setCurrentContact({...currentContact, [key]: null})
  };

  const changeInfo = (event, key) => {
    setCurrentContact({...currentContact, [key]:event.target.value})
  };

  const confirmChanges = (event) => {
    event.preventDefault()
    setConfirmationIsVisible(true)
    setInputsDisabled(true)
  };

  const addNewField = (event) =>{
    event.preventDefault();
    setCurrentContact({...currentContact, [newField]: newFieldValue })
    setNewFieldValue('')
    setNewField('')
    setFields([...fields, [newField, newFieldValue]])
    editContact(selectedContact, {...currentContact, id: selectedContact.id});
    setFormIsVisible(false)
  }

  return (
    <div className="card">
      <form>
        <button
          className="button card__button"
            onClick={(event) => undo(event)}
          disabled={inputsDisabled}
        >
          Undo
        </button>

        {fields.map(field => {
          const key = field[0];

          if (key !== 'id' && field[1]) {
            return (
              <div>
                <span className="card__name">{key}</span>

                <button
                  className="button card__button"
                  onClick={(event) => deleteField(event, key)}
                  disabled={inputsDisabled}
                >
                  X
                </button>

                <input
                  name="formField"
                  className="form__field"
                  value={currentContact[key]}
                  onChange={(event) => changeInfo(event, key)}
                  onFocus={() => setContactBackup({...currentContact})}
                  onBlur={(event) => confirmChanges(event)}
                  required
                  disabled={inputsDisabled}
                />
              </div>
            )
          }
        })}

        {confirmationIsVisible && (<ConfirmationWindow reject={rejectChanges} submit={hideConfirmation} hideConfirmation={hideConfirmation} />)}

        <button
          type="button"
          onClick={() => setFormIsVisible(!formIsVisible)}
          className="button card__button"
          disabled={inputsDisabled}
        >
          {formIsVisible ? ('Cancel') : ('+ Add new field')}
        </button>
      </form>

      {formIsVisible && (
        <form
          className="form"
          onSubmit={(event) => addNewField(event)}
        >
          <input
            name="fieldName"
            type="text"
            value={newField}
            onChange={(event) => setNewField(event.target.value)}
            placeholder="Enter field Name"
            className="form__field"
          />

          <input
            name="fieldValue"
            type="text"
            value={newFieldValue}
            onChange={(event) => setNewFieldValue(event.target.value)}
            placeholder="Enter field value"
            className="form__field"
          />
        
          <button className="button">
              Add
          </button>
        </form>)}

      <button
        type="button"
        className="button"
        onClick={(event) => closeAndSave(event)}
        disabled={inputsDisabled}
      >
        Close details
      </button>
    </div>
  )
}
