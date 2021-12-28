import React from 'react';
import { Contact } from '../types/Contact';

type Props = {
  reject: () => void,
  submit: (contactToDelete?:Contact) => void,
  contactToDelete?:Contact,
  hideConfirmation: () => void,
}
export const ConfirmationWindow: React.FC<Props> = ({ reject, submit, contactToDelete, hideConfirmation }) => (
<div className="confirmation">
  <span className="confirmation__title">
    Do you want to save the changes? 
  </span>

  <button
    className="button confirmation__button"
    onClick={() => {
      if (contactToDelete) {
        submit(contactToDelete);
      } else {
        submit()
      }
      hideConfirmation()
    }}
  >
    Yes
  </button>

  <button
    className="button confirmation__button"
    onClick={reject}
  >
    No
  </button>
</div>
);
