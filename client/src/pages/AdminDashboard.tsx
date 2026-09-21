import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2 } from 'lucide-react';
import './Admin.css';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  fitnessGoal: string;
  message: string | null;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  const fetchEnquiries = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiries`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
        return;
      }
      
      const data = await response.json();
      setEnquiries(data);
    } catch (err) {
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    } else {
      fetchEnquiries();
    }
  }, [token, navigate]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  const newCount = enquiries.filter(e => e.status === 'NEW').length;
  const contactedCount = enquiries.filter(e => e.status === 'CONTACTED').length;
  const closedCount = enquiries.filter(e => e.status === 'CLOSED').length;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-brand">DRONACHARYA ADMIN</div>
        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={18} /> Logout
        </button>
      </header>
      
      <main className="admin-main">
        {error && <div className="admin-error">{error}</div>}
        
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Enquiries</h3>
            <div className="stat-value">{enquiries.length}</div>
          </div>
          <div className="stat-card">
            <h3>New</h3>
            <div className="stat-value text-accent">{newCount}</div>
          </div>
          <div className="stat-card">
            <h3>Contacted</h3>
            <div className="stat-value text-warning">{contactedCount}</div>
          </div>
          <div className="stat-card">
            <h3>Closed</h3>
            <div className="stat-value text-success">{closedCount}</div>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Goal</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No enquiries found</td>
                </tr>
              ) : (
                enquiries.map(enquiry => (
                  <tr key={enquiry.id}>
                    <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                    <td className="font-bold">{enquiry.name}</td>
                    <td><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></td>
                    <td><span className="badge badge-gray">{enquiry.fitnessGoal}</span></td>
                    <td className="msg-cell">{enquiry.message || '-'}</td>
                    <td>
                      <select 
                        value={enquiry.status} 
                        onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                        className={`status-select status-${enquiry.status.toLowerCase()}`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => deleteEnquiry(enquiry.id)} className="btn-delete" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
