import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditContacts = () => {
  const [form, setForm] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateContact = () => {
    if (!form.id || !form.full_name || !form.email) {
      alert("Por favor completa el ID, nombre y email.");
      return;
    }

    const bodyData = {
      name: form.full_name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      agenda_slug: "NickyMouse"
    };

    fetch(`https://playground.4geeks.com/contact/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.error("Error actualizando contacto:", errorData);
            if (errorData.detail) {
              const missingFields = errorData.detail
                .map(item => item.loc[1] || item.loc[0])
                .join(", ");
              alert(`Faltan campos obligatorios: ${missingFields}`);
            } else {
              alert(`Error actualizando contacto: ${response.status}`);
            }
            throw new Error("Error actualizando contacto");
          }).catch(() => {
            alert(`Error actualizando contacto: ${response.status}`);
            throw new Error("Error actualizando contacto");
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Contacto actualizado:", data);
        alert("Contacto actualizado correctamente!");
        
        setForm({ id: "", full_name: "", email: "", phone: "", address: "" });
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Contact</h1>

      <input
        name="id"
        placeholder="Contact ID"
        className="form-control mb-3"
        value={form.id}
        onChange={handleChange}
      />
      <input
        name="full_name"
        placeholder="Name"
        className="form-control mb-3"
        value={form.full_name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Enter email"
        className="form-control mb-3"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Enter phone"
        className="form-control mb-3"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Enter address"
        className="form-control mb-3"
        value={form.address}
        onChange={handleChange}
      />

      <button onClick={updateContact} className="btn btn-primary w-100 mb-3">
        Update
      </button>

      <Link to="/">Or get back to contacts</Link>
    </div>
  );
};

export default EditContacts;