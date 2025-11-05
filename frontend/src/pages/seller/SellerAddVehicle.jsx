import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import URL from '../../services/api';

const SellerAddVehiclePage = () => {
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
    location: '',
    mileage: '',
    color: '',
    transmission: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return '';
    const form = new FormData();
    form.append('image', imageFile);
    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${URL}/api/upload/seller/image/cloudinary`, form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setUploading(false);
      return res.data.imageUrl;
    } catch (err) {
      setUploading(false);
      alert('Image upload failed');
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();
      const payload = { ...formData, image: imageUrl, ownerId: user?._id };

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in as a seller to add a vehicle');
        return;
      }

      await axios.post(`${URL}/api/seller/vehicles`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Vehicle added successfully!');
      navigate('/seller/manage-vehicles');
    } catch (err) {
      console.error(err);
      alert('Failed to add vehicle');
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: '#346fabff',
        marginTop: '60px',
        maxWidth: '900px',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <h3 className="text-white border-bottom pb-2">Add Vehicle (Seller)</h3>
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
              {/* Vehicle Type */}
              {field === 'type' && (
                <select
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="truck">Truck</option>
                  <option value="bus">Bus</option>
                  <option value="minibus">Minibus</option>
                  <option value="car">Car</option>
                </select>
              )}

              {/* Vehicle Make */}
              {field === 'make' && (
                <select
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Make</option>
                  <option value="maruti suzuki">Maruti Suzuki</option>
                  <option value="tata">Tata</option>
                  <option value="mahindra">Mahindra</option>
                  <option value="ashoka leyland">Ashoka Leyland</option>
                  <option value="force">Force</option>
                  <option value="isuzu">Isuzu</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="ford">Ford</option>
                  <option value="nissan">Nissan</option>
                  <option value="bmw">BMW</option>
                  <option value="audi">Audi</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="hyundai">Hyundai</option>
                  <option value="kia">Kia</option>
                  <option value="other">Other</option>
                </select>
              )}

              {/* Model */}
              {field === 'model' && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Model..."
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              )}

              {/* Year */}
              {field === 'year' && (
                <select
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              )}

              {/* Fuel Type */}
              {field === 'fuelType' && (
                <select
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              )}

              {/* Price */}
              {field === 'price' && (
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Price..."
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              )}

              {/* Description */}
              {field === 'description' && (
                <textarea
                  className="form-control"
                  placeholder="Enter Description..."
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              )}

              {/* Category */}
              {field === 'category' && (
                <select
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="coupe">Coupe</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="suv">SUV</option>
                  <option value="muv">MUV</option>
                  <option value="van">Van</option>
                  <option value="truck">Truck</option>
                  <option value="bus">Bus</option>
                  <option value="other">Other</option>
                </select>
              )}

              {/* Transmission */}
              {field === 'transmission' && (
                <select
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Transmission</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              )}

              {/* Color */}
              {field === 'color' && (
                <select
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="silver">Silver</option>
                </select>
              )}

              {/* Mileage */}
              {field === 'mileage' && (
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Mileage..."
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          {/* Image Upload */}
          <div className="col-md-6 mb-3">
            <label className="form-label text-white">Vehicle Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            {uploading && <div className="text-primary mt-1">Uploading...</div>}
          </div>
        </div>

        <button
          type="submit"
          className="container btn btn-primary mt-3"
          disabled={uploading}
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default SellerAddVehiclePage;
