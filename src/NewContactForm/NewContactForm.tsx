import React, { useState } from 'react';
import { Contact } from '../types/Contact';

type Props = {
  addContact: (contact:Contact) => void;
  hideForm: (contact:Contact) => void;
}

const NewContactForm: React.FC<Props> = ({ addContact, hideForm }) => {

  const useInput = (initial, required) => {
    const [value, setValue] = useState(initial);
    const [error, setError] = useState(null);
  
    return {
      value,
      onBlur: (event) => {
        if (!event.target.value && required){
          setError("Required field");
        } else {
          setError(null);
        }
      },
      onChange: event => setValue(event.target.value),
      error
    };
  };

  const name = useInput('', true);
  const surname = useInput('', false);
  const email = useInput('', false);
  const tel = useInput('', false);
  const dateOfBirth = useInput('', false);

  const addNewContact = (event) => {
    event.preventDefault()
    addContact({name: name.value, surname: surname.value, email: email.value, tel: tel.value, dateOfBirth:dateOfBirth.value, id: +new Date() })
    hideForm()
  };

  return (
    <form
      className="form form--wide"
      onSubmit={(event) => addNewContact(event)}
    >
      <span>Name</span>
      <input
        {...name}
        type="text"
        placeholder='Dan'
        className="form__field"
        pattern="[a-zA-Z][a-zA-Z ]{1,}"
        minLength={3}
        maxLength={32}
        required
      />
        {name.error && <span style={{ color: 'red'}}>{name.error}</span>}

      <span>Surname</span>
      <input
        {...surname}
        type="text"
        placeholder='Brown'
        className="form__field"
        pattern="\w+"
        minLength={3}
        maxLength={32}
      />
        {surname.error && <span style={{ color: 'red'}}>{surname.error}</span>}

        <span>Email</span>
      <input
        {...email}
        type="email"
        placeholder='example@gmail.com'
        className="form__field"
      />
        {email.error && <span style={{ color: 'red'}}>{email.error}</span>}

      <span>Phone number</span>
      <input
        {...tel}
        type="tel"
        placeholder='380951234567'
        className="form__field"
        pattern="\d+"
        minLength={10}
        maxLength={12}
      />
        {tel.error && <span style={{ color: 'red'}}>{tel.error}</span>}

      <span>Date of birth</span>
      <input
        {...dateOfBirth}
        type="date"
        className="form__field"
      />
        {dateOfBirth.error && <span style={{ color: 'red'}}>{dateOfBirth.error}</span>}

      <button
        className="button"
      >
        Add a contact
      </button>
    </form>
  )
}

export default NewContactForm;
