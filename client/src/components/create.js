import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    nameAndSurname: "", 
    institution: "", 
    email: "", 
    specialisation: "", 
    publications: "", 
    totalCitations: ""
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:4000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ nameAndSurname: "", institution: "", email: "", specialisation: "", publications: "", totalCitations: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Researcher</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nameAndSurname">Name and Surname</label>
          <input
            type="text"
            className="form-control"
            id="nameAndSurname"
            value={form.nameAndSurname}
            onChange={(e) => updateForm({ nameAndSurname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="institution">Institution</label>
          <input
            type="text"
            className="form-control"
            id="institution"
            value={form.institution}
            onChange={(e) => updateForm({ institution: e.target.value })}
          />
        </div>
        <div className="form-group">
        <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
        <label htmlFor="specialisation">Specialisation</label>
          <input
            type="text"
            className="form-control"
            id="specialisation"
            value={form.specialisation}
            onChange={(e) => updateForm({ specialisation: e.target.value })}
          />
        </div>
        <div className="form-group">
        <label htmlFor="publications">Publications</label>
          <input
            type="text"
            className="form-control"
            id="publications"
            value={form.publications}
            onChange={(e) => updateForm({ publications: e.target.value })}
          />
        </div>
        <div className="form-group">
        <label htmlFor="totalCitations">Total Citations</label>
          <input
            type="text"
            className="form-control"
            id="totalCitations"
            value={form.totalCitations}
            onChange={(e) => updateForm({ totalCitations: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create researcher"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}