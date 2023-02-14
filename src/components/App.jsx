import React, { useState, useEffect } from 'react';
import { Container } from './container/Container.styled';
import { Section } from './Section/Section';
import { ContactList } from './contactList/ContactList';
import { Form } from './form/Form';
import { SearchInput } from './searchInput/SearchInput';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const handleSearchInput = event => {
    setFilter(event.currentTarget.value);
  };
  const handleFormSubmit = ({ name, number }) => {
    setContacts(prevState => {
      if (
        prevState.some(item => item.name.toLowerCase() === name.toLowerCase())
      ) {
        alert(`${name} is already in contacts`);
      } else if (prevState.some(item => item.number === number)) {
        alert(`${number} is already in contacts`);
      } else {
        return [...prevState, { id: nanoid(), name, number }];
      }
    });
  };
  const filteredContacts = () => {
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(item =>
      item.name.toLowerCase().includes(normalisedFilter)
    );
  };
  const deleteContact = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  return (
    <Container>
      <Section title="Add contact" className="aside">
        <Form onFormSubmit={handleFormSubmit}></Form>
      </Section>

      <Section title="Contact List">
        <SearchInput value={filter} onChange={handleSearchInput}></SearchInput>
        <ContactList
          contactData={filteredContacts()}
          deleteContact={deleteContact}
        ></ContactList>
      </Section>
    </Container>
  );
};
