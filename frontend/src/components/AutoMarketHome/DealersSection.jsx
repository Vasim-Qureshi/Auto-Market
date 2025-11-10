import React from 'react';

const DealersSection = () => {
  const dealers = [
    { name: "AutoWorld Motors", city: "Jaipur", phone: "9876543210" },
    { name: "Shree Car Point", city: "Mumbai", phone: "9123456780" },
    { name: "Elite Auto Traders", city: "Delhi", phone: "9988776655" },
    { name: "Prime Wheels Hub", city: "Ahmedabad", phone: "9090909090" }
  ];

  return (
    <section className="bg-light py-5">
      <div className="container">
        <h4>Trusted Dealers</h4>
        <div className="row mt-3">
          {dealers.map((dealer, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div className="card p-3 text-center">
                <h6>{dealer.name}</h6>
                <p className="small text-muted">{dealer.city}</p>
                <p className="small">📞 {dealer.phone}</p>
                <button className="btn btn-sm btn-outline-secondary">View Dealer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealersSection;
