import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    type: '',
    make: '',
    model: '',
    year: '',
    fuelType: '',
    price: '',
    description: '',
    category: '',
    image: '',
    location: '',
    mileage: '',
    color: '',
    transmission: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch existing vehicle data
  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`${URL}/api/vehicles/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error('Error fetching vehicle:', err);
      alert('Failed to fetch vehicle details');
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image;
    const form = new FormData();
    form.append('image', imageFile);
    setUploading(true);
    try {
      const res = await axios.post(`${URL}/api/upload/image`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUploading(false);
      return res.data.imageUrl;
    } catch (err) {
      setUploading(false);
      console.error('Image upload failed:', err);
      alert('Image upload failed');
      return formData.image;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();

      const updatedData = { ...formData, image: imageUrl };

      await axios.put(`${URL}/api/admin/vehicles/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('Vehicle updated successfully');
      navigate('/admin/manage-vehicles');
    } catch (err) {
      console.error(err);
      alert('Failed to update vehicle');
    }
  };

  return (
    <div className="container-fluid py-5 my-5 text-white" style={{maxWidth: '900px', maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#346fabff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)'}}>
      <h3 className="border-bottom pb-2">Edit Vehicle</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {[
            'type',
            'make',
            'model',
            'year',
            'fuelType',
            'price',
            'description',
            'category',
            'location',
            'mileage',
            'color',
            'transmission',
          ].map((field) => (
            <div className="col-md-6 mb-3" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                type="text"
                className="form-control"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={['type', 'make', 'model', 'year', 'fuelType', 'price', 'category'].includes(field)}
              />
            </div>
          ))}

          <div className="col-md-6 mb-3">
            <label className="form-label">Change Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
            />
            {uploading && <div className="text-primary mt-1">Uploading...</div>}
          </div>
        </div>
        <button type="submit" className="container btn btn-primary mt-3" disabled={uploading}>
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default EditVehiclePage;
