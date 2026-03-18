import React, { useEffect, useContext } from "react";
import  useGlobalReducer  from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";

const Contacts = () => {

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
  fetch("https://playground.4geeks.com/contact/agendas/NickyMouse/contacts")
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: "set_contacts",
        payload: data.contacts
      });
    })
    .catch(err => console.log(err));
}, []);

  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-end mb-3">

        <Link to="/add" className="btn btn-success">
          Add new contact
        </Link>

      </div>

      {store.contacts.map(contact => (

        <ContactCard
          key={contact.id}
          contact={contact}
        />

      ))}

    </div>

  );

};

export default Contacts;