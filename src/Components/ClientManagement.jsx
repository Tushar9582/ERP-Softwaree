import { useState } from 'react';
import './ClientManagement.css';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    additionalDetails: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addClient = () => {
    if (!newClient.name || !newClient.email) {
      alert('Name and Email are required fields');
      return;
    }

    if (editingId !== null) {
      setClients(clients.map(client =>
        client.id === editingId ? { ...newClient, id: editingId } : client
      ));
      setEditingId(null);
    } else {
      setClients([...clients, { ...newClient, id: Date.now() }]);
    }

    resetForm();
  };

  const editClient = (id) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      setNewClient(client);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const deleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const resetForm = () => {
    setNewClient({
      name: '',
      email: '',
      phone: '',
      additionalDetails: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="client-management-container">
      <div className="client-list-panel">
        <div className="header">
          <h1>Clients</h1>
          <button onClick={() => setShowForm(true)}>+ Add Client</button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredClients.length === 0 ? (
          <p>No clients found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone || '-'}</td>
                  <td className="details-cell">{client.additionalDetails || '-'}</td>
                  <td className="actions">
                    <button onClick={() => editClient(client.id)}>Edit</button>
                    <button onClick={() => deleteClient(client.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <>
          <div className="modal-overlay" onClick={resetForm}></div>
          <div className="client-form-modal">
            <h2>{editingId ? 'Edit Client' : 'Add New Client'}</h2>
            <div className="form-group">
              <label>Name*</label>
              <input name="name" value={newClient.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input name="email" value={newClient.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={newClient.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Additional Details</label>
              <textarea name="additionalDetails" value={newClient.additionalDetails} onChange={handleInputChange} />
            </div>
            <div className="form-actions">
              <button onClick={addClient}>{editingId ? 'Update' : 'Add'}</button>
              <button className="cancel-btn" onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientManagement;
