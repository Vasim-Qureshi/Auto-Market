// File: src/pages/Search.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import URL from "../services/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounced Search
  useEffect(() => {
    if (!query) {
      setResults([]);
      setError("");
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${URL}/api/search?query=${query}`);
        setResults(response.data.results || []);
      } catch (err) {
        setError("Something went wrong while fetching vehicles.");
        setResults([]);
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <Container className="py-5">
      {/* Heading */}
      <h2 className="mb-4 text-center fw-bold text-primary">
        🔍 Search Vehicles
      </h2>

      {/* Search Bar */}
      <Form
        className="mb-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by model, brand, or location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="shadow-sm"
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      {/* Loader */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Fetching vehicles...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Results */}
      <Row>
        {Array.isArray(results) && results.length > 0 ? (
          results.map((vehicle) => (
            <Col md={6} lg={4} key={vehicle._id} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={vehicle.image || "https://via.placeholder.com/300x180"}
                  alt={vehicle.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold text-dark">
                    {vehicle.title || `${vehicle.make} ${vehicle.model}`}
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    <strong>Type:</strong> {vehicle.type} <br />
                    <strong>Make:</strong> {vehicle.make} <br />
                    <strong>Model:</strong> {vehicle.model} <br />
                    <strong>Category:</strong> {vehicle.category} <br />
                    <strong>Location:</strong> {vehicle.location} <br />
                    <strong>Price:</strong>{" "}
                    <span className="text-success fw-semibold">
                      ₹{vehicle.price?.toLocaleString("en-IN")}
                    </span>
                  </Card.Text>
                  <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="btn btn-outline-primary w-100"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          !loading && (
            <Col>
              <p className="text-center text-muted mt-4">
                🚗 No vehicles found. Try another search.
              </p>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default Search;
