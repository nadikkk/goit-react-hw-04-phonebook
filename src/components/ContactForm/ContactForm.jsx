import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  changeInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { contacts, onSubmit } = this.props;
    const { name} = this.state;
    const id = nanoid();
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    } onSubmit({ id, ...this.state });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form action="" onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor="">Name</label>
        <input
          className={css.input}
          onChange={this.changeInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label htmlFor="">Number</label>
        <input
          className={css.input}
          onChange={this.changeInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
