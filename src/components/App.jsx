import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    setContacts(prevState => {
      return [contact, ...prevState];
    });
  };

  const deleteContact = code => {
    //  console.log(code);
    setContacts(prevState => {
      return prevState.filter(({ id }) => id !== code);
    });
  };
  const isFilterContacts = wordFilter => {
    //  console.log(wordFilter);
    setFilter(wordFilter.toLowerCase());
  };

  const contactsAfterFiltr = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(filter);
  });

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter isFilter={isFilterContacts} />
      {contactsAfterFiltr.length === 0 ? (
        <p>Not contacts</p>
      ) : (
        <ContactList contacts={contactsAfterFiltr} isDelete={deleteContact} />
      )}
    </div>
  );
}
