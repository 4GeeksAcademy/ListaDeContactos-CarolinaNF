import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const ContactCard = ({ contact }) => {

  const { dispatch } = useContext(Context);

  const deleteContact = () => {

    fetch (`https://playground.4geeks.com/contact/agendas/NickyMouse/contacts/${contact.id}`, {
      method: "DELETE"
    })
      .then(() => {

        dispatch({
          type: "delete_contact",
          payload: contact.id
        });

      });

  };

  return (

    <div className="card mb-3 p-3">

      <div className="row align-items-center">

        <div className="col-2 text-center">

          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="rounded-circle"
            width="100"
          />

        </div>

        <div className="col-8">

          <h5>{contact.full_name}</h5>

          <p>📍 {contact.address}</p>

          <p>📞 {contact.phone}</p>

          <p>✉️ {contact.email}</p>

        </div>

        <div className="col-2 text-end">

          <Link
            to={`/edit/${contact.id}`}
            className="btn btn-light me-2"
          >
            ✏️
          </Link>

          <button
            onClick={deleteContact}
            className="btn btn-light"
          >
            🗑
          </button>

        </div>

      </div>

    </div>

  );

};

export default ContactCard;