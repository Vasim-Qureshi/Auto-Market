import React, { useState } from "react";

const CompareSection = () => {
  const vehicles = [
    { name: "Toyota Camry", type: "Car", engine: "2.5L", fuel: "Petrol", mileage: "15 km/l", price: "₹28,00,000" },
    { name: "Honda Civic", type: "Car", engine: "1.8L", fuel: "Petrol", mileage: "17 km/l", price: "₹22,50,000" },
    { name: "Hyundai Creta", type: "SUV", engine: "1.5L", fuel: "Diesel", mileage: "20 km/l", price: "₹18,00,000" },
    { name: "Maruti Swift", type: "Hatchback", engine: "1.2L", fuel: "Petrol", mileage: "22 km/l", price: "₹8,50,000" },
    { name: "Tata Harrier", type: "SUV", engine: "2.0L", fuel: "Diesel", mileage: "17 km/l", price: "₹24,00,000" },
    { name: "Mahindra XUV700", type: "SUV", engine: "2.0L", fuel: "Diesel", mileage: "15 km/l", price: "₹27,00,000" },
    { name: "Kia Seltos", type: "SUV", engine: "1.5L", fuel: "Petrol", mileage: "17 km/l", price: "₹16,00,000" },
    { name: "BMW 3 Series", type: "Luxury", engine: "2.0L Turbo", fuel: "Petrol", mileage: "12 km/l", price: "₹58,00,000" },
    { name: "Mercedes C-Class", type: "Luxury", engine: "2.0L Turbo", fuel: "Petrol", mileage: "11 km/l", price: "₹62,00,000" },
    { name: "Hyundai i20", type: "Hatchback", engine: "1.2L", fuel: "Petrol", mileage: "19 km/l", price: "₹11,00,000" }
  ];

  const [selected, setSelected] = useState({
    v1: "",
    v2: "",
    v3: ""
  });

  const handleSelect = (e) => {
    setSelected({
      ...selected,
      [e.target.name]: e.target.value
    });
  };

  const getVehicle = (name) => vehicles.find((v) => v.name === name);

  return (
    <section className="container py-5">
      <h4>Compare Vehicles</h4>

      {/* Dropdown selectors */}
      <div className="bg-white shadow-sm p-3 rounded mb-4">
        <div className="d-flex gap-2 flex-wrap">
          <select className="form-control" name="v1" value={selected.v1} onChange={handleSelect}>
            <option value="">Select Vehicle 1</option>
            {vehicles.map((v, i) => <option key={i} value={v.name}>{v.name}</option>)}
          </select>

          <select className="form-control" name="v2" value={selected.v2} onChange={handleSelect}>
            <option value="">Select Vehicle 2</option>
            {vehicles.map((v, i) => <option key={i} value={v.name}>{v.name}</option>)}
          </select>

          <select className="form-control" name="v3" value={selected.v3} onChange={handleSelect}>
            <option value="">Select Vehicle 3</option>
            {vehicles.map((v, i) => <option key={i} value={v.name}>{v.name}</option>)}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      {(selected.v1 || selected.v2 || selected.v3) && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Features</th>
                <th>{selected.v1 || "-"}</th>
                <th>{selected.v2 || "-"}</th>
                <th>{selected.v3 || "-"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Type</td>
                <td>{getVehicle(selected.v1)?.type || "-"}</td>
                <td>{getVehicle(selected.v2)?.type || "-"}</td>
                <td>{getVehicle(selected.v3)?.type || "-"}</td>
              </tr>
              <tr>
                <td>Engine</td>
                <td>{getVehicle(selected.v1)?.engine || "-"}</td>
                <td>{getVehicle(selected.v2)?.engine || "-"}</td>
                <td>{getVehicle(selected.v3)?.engine || "-"}</td>
              </tr>
              <tr>
                <td>Fuel Type</td>
                <td>{getVehicle(selected.v1)?.fuel || "-"}</td>
                <td>{getVehicle(selected.v2)?.fuel || "-"}</td>
                <td>{getVehicle(selected.v3)?.fuel || "-"}</td>
              </tr>
              <tr>
                <td>Mileage</td>
                <td>{getVehicle(selected.v1)?.mileage || "-"}</td>
                <td>{getVehicle(selected.v2)?.mileage || "-"}</td>
                <td>{getVehicle(selected.v3)?.mileage || "-"}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{getVehicle(selected.v1)?.price || "-"}</td>
                <td>{getVehicle(selected.v2)?.price || "-"}</td>
                <td>{getVehicle(selected.v3)?.price || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default CompareSection;
