import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
	const localContacts = localStorage.getItem('contacts')
	return localContacts===null? undefined : this.setState ({contacts: JSON.parse(localContacts)})
  }

  componentDidUpdate(prevState) {
if (prevState.contacts!== this.state.contacts) {
	localStorage.setItem( 'contacts', JSON.stringify(this.state.contacts))
}
  }

  addContact = contact => {
   //  console.log(contact);
    this.setState(prevState => {
      // console.log(prevState);
      return { contacts: [contact, ...prevState.contacts] };
    });
  };
  deleteContact = code => {
   //  console.log(code);
    this.setState(prevState => {
      return { contacts: prevState.contacts.filter(({ id }) => id !== code) };
    });
  };
  isFilterContacts = wordFilter => {
   //  console.log(wordFilter);
    this.setState({ filter: wordFilter.toLowerCase() });
  };

  render() {
    const { contacts, filter } = this.state;
    const contactsAfterFiltr = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
   //  console.log(this.state);
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter isFilter={this.isFilterContacts} />
        <ContactList
          contacts={contactsAfterFiltr}
          isDelete={this.deleteContact}
        />
      </div>
    );
  }
}
