import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddContacts = () => {
  const [form, setForm] = useState({
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

  const saveContact = () => {
    if (!form.full_name || !form.email) {
      alert("Por favor completa el nombre y el email.");
      return;
    }

    const bodyData = {
      name: form.full_name,      
      email: form.email,
      phone: form.phone,
      address: form.address,
      agenda_slug: "NickyMouse"
    };

    fetch("https://playground.4geeks.com/contact/agendas/NickyMouse/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData)
    })
      .then(async response => {
        if (!response.ok) {
          try {
            const errorData = await response.json();
            console.error("Error creando contacto:", errorData);
            if (errorData.detail) {
              const missingFields = errorData.detail
                .map(item => item.loc[1] || item.loc[0])
                .join(", ");
              alert(`Faltan campos obligatorios: ${missingFields}`);
            } else {
              alert(`Error creando contacto: ${response.status}`);
            }
            throw new Error("Error creando contacto");
          } catch {
            alert(`Error creando contacto: ${response.status}`);
            throw new Error("Error creando contacto");
          }
        }
        return response.json();
      })
      .then(data => {
        console.log("Contacto creado:", data);
        alert("Contacto creado correctamente!");
        setForm({ full_name: "", email: "", phone: "", address: "" });
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add a new contact</h1>

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

      <button onClick={saveContact} className="btn btn-primary w-100 mb-3">
        Save
      </button>

      <Link to="/">Or get back to contacts</Link>
    </div>
  );
};

export default AddContacts;