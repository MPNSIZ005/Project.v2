import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    nameAndSurname: "",
    institution: "",
    email: "",
    specialisation: "",
    publications: "",
    totalCitations: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      nameAndSurname: form.nameAndSurname,
      institution: form.institution,
      email: form.email,
      specialisation: form.specialisation,
      publications: form.publications,
      totalCitations: form.totalCitations
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:4000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nameAndSurname">Name and Surname: </label>
          <input
            type="text"
            className="form-control"
            id="nameAndSurname"
            value={form.nameAndSurname}
            onChange={(e) => updateForm({ nameAndSurname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="institution">Institution: </label>
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
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}