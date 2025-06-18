import { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import './ClientManagement.css';

// Firebase configuration remains unchanged
const firebaseConfig = {
  apiKey: "AIzaSyCXc6nHRIzXWnjd-ie2gtr_-4AVKm7_sf8",
  authDomain: "tansupliments-53fb4.firebaseapp.com",
  databaseURL: "https://tansupliments-53fb4-default-rtdb.firebaseio.com",
  projectId: "tansupliments-53fb4",
  storageBucket: "tansupliments-53fb4.firebasestorage.app",
  messagingSenderId: "354616029451",
  appId: "1:354616029451:web:dc3a0dc92b8fe791abb20e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const clientsRef = ref(database, 'clients');

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);

  // Load clients from Firebase
  useEffect(() => {
    const unsubscribe = onValue(clientsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const clientsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setClients(clientsArray);
        } else {
          setClients([]);
        }
        setFirebaseError(null);
      } catch (error) {
        console.error("Firebase read error:", error);
        setFirebaseError("Failed to load clients. Please refresh the page.");
      }
    }, (error) => {
      console.error("Firebase connection error:", error);
      setFirebaseError("Cannot connect to database. Check your internet connection.");
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
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

  const addClient = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setFirebaseError(null);
    
    try {
      if (editingId !== null) {
        // Update existing client - remove id before saving
        const { id, ...clientData } = newClient;
        await update(ref(database, `clients/${editingId}`), clientData);
        setEditingId(null);
      } else {
        // Add new client - remove id (Firebase will generate)
        const { id, ...clientData } = newClient;
        await push(clientsRef, clientData);
      }
      resetForm();
    } catch (error) {
      console.error("Firebase save error:", error);
      setFirebaseError('Failed to save client. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const editClient = (id) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      setNewClient(client);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await remove(ref(database, `clients/${id}`));
      } catch (error) {
        console.error("Error deleting client:", error);
        setFirebaseError('Failed to delete client. Please try again.');
      }
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
    setFirebaseError(null);
  };

  const filteredClients = clients.filter(client =>
    Object.values(client).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="client-management">
      {firebaseError && (
        <div className="firebase-error">
          {firebaseError}
          <button onClick={() => setFirebaseError(null)}>×</button>
        </div>
      )}

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
              disabled={loading}
            >
              <FaPlus /> {loading ? 'Loading...' : 'Add Client'}
            </button>
          </div>
        </div>

        {filteredClients.length === 0 ? (
          <div className="empty-state">
            <p>{clients.length === 0 ? 'No clients yet' : 'No matching clients found'}</p>
            <button 
              className="add-client-btn"
              onClick={() => setShowForm(true)}
              disabled={loading}
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
                        disabled={loading}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteClient(client.id)}
                        title="Delete"
                        disabled={loading}
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
              <button className="close-btn" onClick={resetForm} disabled={loading}>
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Company</label>
                <input 
                  name="company" 
                  value={newClient.company} 
                  onChange={handleInputChange} 
                  placeholder="Acme Inc."
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input 
                  name="address" 
                  value={newClient.address} 
                  onChange={handleInputChange} 
                  placeholder="123 Main St, City, Country"
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-footer">
              <button className="cancel-btn" onClick={resetForm} disabled={loading}>
                Cancel
              </button>
              <button className="save-btn" onClick={addClient} disabled={loading}>
                <FaSave /> {loading ? 'Saving...' : editingId ? 'Update Client' : 'Save Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;