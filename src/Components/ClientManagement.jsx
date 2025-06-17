import { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import './ClientManagement.css';

const ClientManagement = () => {
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem('erp-clients');
    return savedClients ? JSON.parse(savedClients) : [];
  });
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  // Save clients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('erp-clients', JSON.stringify(clients));
  }, [clients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newClient.name.trim()) newErrors.name = 'Name is required';
    if (!newClient.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(newClient.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addClient = () => {
    if (!validateForm()) return;

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
      company: '',
      address: '',
      notes: ''
    });
    setEditingId(null);
    setShowForm(false);
    setErrors({});
  };

  const filteredClients = clients.filter(client =>
    Object.values(client).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="client-management">
      <div className="client-list-container">
        <div className="list-header">
          <h1>Client Management</h1>
          <div className="controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="add-client-btn"
              onClick={() => setShowForm(true)}
            >
              <FaPlus /> Add Client
            </button>
          </div>
        </div>

        {filteredClients.length === 0 ? (
          <div className="empty-state">
            <p>No clients found</p>
            <button 
              className="add-client-btn"
              onClick={() => setShowForm(true)}
            >
              <FaPlus /> Add Your First Client
            </button>
          </div>
        ) : (
          <div className="client-table-container">
            <table className="client-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id}>
                    <td>
                      <div className="client-name">
                        {client.name}
                        {client.notes && (
                          <span className="notes-indicator" title={client.notes}>📝</span>
                        )}
                      </div>
                    </td>
                    <td>{client.email}</td>
                    <td>{client.phone || '-'}</td>
                    <td>{client.company || '-'}</td>
                    <td className="actions">
                      <button 
                        className="edit-btn"
                        onClick={() => editClient(client.id)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteClient(client.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="client-form-container">
            <div className="form-header">
              <h2>{editingId ? 'Edit Client' : 'Add New Client'}</h2>
              <button className="close-btn" onClick={resetForm}>
                <FaTimes />
              </button>
            </div>
            
            <div className="form-body">
              <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <label>Full Name*</label>
                <input 
                  name="name" 
                  value={newClient.name} 
                  onChange={handleInputChange} 
                  placeholder="John Doe"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label>Email*</label>
                <input 
                  name="email" 
                  value={newClient.email} 
                  onChange={handleInputChange} 
                  placeholder="john@example.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input 
                  name="phone" 
                  value={newClient.phone} 
                  onChange={handleInputChange} 
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="form-group">
                <label>Company</label>
                <input 
                  name="company" 
                  value={newClient.company} 
                  onChange={handleInputChange} 
                  placeholder="Acme Inc."
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input 
                  name="address" 
                  value={newClient.address} 
                  onChange={handleInputChange} 
                  placeholder="123 Main St, City, Country"
                />
              </div>
              
              <div className="form-group">
                <label>Notes</label>
                <textarea 
                  name="notes" 
                  value={newClient.notes} 
                  onChange={handleInputChange} 
                  placeholder="Any additional information..."
                  rows="3"
                />
              </div>
            </div>
            
            <div className="form-footer">
              <button className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
              <button className="save-btn" onClick={addClient}>
                <FaSave /> {editingId ? 'Update Client' : 'Save Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;