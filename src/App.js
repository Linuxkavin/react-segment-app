import React, { useState } from 'react';
import { Container, Button, Modal, Form, Row, Col } from 'react-bootstrap';

function App() {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddSchema = () => {
    if (selectedSchema) {
      const newSchema = availableSchemas.find((schema) => schema.value === selectedSchema);
      setSchemas([...schemas, newSchema]);
      setAvailableSchemas(availableSchemas.filter((schema) => schema.value !== selectedSchema));
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = async () => {
    const webhookUrl = "https://webhook.site/efc5956c-5922-4a0e-913d-858ec5a86552"
    const data = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    alert('Segment saved!');
    handleClose();
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Save Segment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="segmentName">
              <Form.Label>Segment Name</Form.Label>
              <Form.Control
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="schema">
              <Form.Label>Add schema to segment</Form.Label>
              <Form.Control
                as="select"
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
              >
                <option value="">Select schema</option>
                {availableSchemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="link" onClick={handleAddSchema}>
              +Add new schema
            </Button>
            <div style={{ border: '1px solid blue', padding: '10px', marginTop: '10px' }}>
              {schemas.map((schema, index) => (
                <Row key={index}>
                  <Col>
                    <Form.Control as="select" defaultValue={schema.value} disabled>
                      <option value={schema.value}>{schema.label}</option>
                    </Form.Control>
                  </Col>
                </Row>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveSegment}>
            Save Segment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;

