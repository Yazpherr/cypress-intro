// src/components/form/ContactForm.jsx
import React, { useState } from 'react';
import { Form, Row, Col, Button as BsButton, Alert } from 'react-bootstrap';
import { toast } from 'sonner';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  // Estado del formulario y de errores
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    terms: false,
  });
  const [formErrors, setFormErrors] = useState({}); 
  const [success, setSuccess] = useState(false);

  // Maneja cambios en inputs y checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Validación simple de campos
  const validate = () => {
    const errors = {};
    if (!formData.name || formData.name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    if (!formData.email) {
      errors.email = 'El correo es obligatorio';
    }
    if (!formData.phone || !/^\d{7,15}$/.test(formData.phone)) {
      errors.phone = 'Teléfono inválido (7–15 dígitos)';
    }
    if (!formData.subject) {
      errors.subject = 'Selecciona un asunto';
    }
    if (!formData.message || formData.message.length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    if (!formData.terms) {
      errors.terms = 'Debes aceptar los términos';
    }
    return errors;
  };

  // Envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Toast global
      toast.success('¡Mensaje enviado con éxito!');
      // Mensaje inline para pruebas y accesibilidad
      setSuccess(true);
      // Reinicia formulario tras éxito
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        terms: false,
      });
    } else {
      setSuccess(false);
    }
  };

  return (
    <Form
      data-cy="contact-form"
      className={`${styles.form} ${styles.card}`}
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        borderRadius: '1rem',
        padding: '2rem',
      }}
    >
      {/* Fila 1: Nombre y Correo */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="name">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              data-cy="input-name"
              name="name"
              type="text"
              minLength={3}
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <div data-cy="error-name" className="text-danger">
                {formErrors.name}
              </div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>Correo *</Form.Label>
            <Form.Control
              data-cy="input-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <div data-cy="error-email" className="text-danger">
                {formErrors.email}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Fila 2: Teléfono y Empresa */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="phone">
            <Form.Label>Teléfono *</Form.Label>
            <Form.Control
              data-cy="input-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && (
              <div data-cy="error-phone" className="text-danger">
                {formErrors.phone}
              </div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="company">
            <Form.Label>Empresa</Form.Label>
            <Form.Control
              data-cy="input-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Fila 3: Asunto */}
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="subject">
            <Form.Label>Asunto *</Form.Label>
            <Form.Select
              data-cy="select-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">-- Selecciona --</option>
              <option value="soporte">Soporte</option>
              <option value="ventas">Ventas</option>
              <option value="info">Información general</option>
            </Form.Select>
            {formErrors.subject && (
              <div data-cy="error-subject" className="text-danger">
                {formErrors.subject}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Fila 4: Mensaje */}
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="message">
            <Form.Label>Mensaje *</Form.Label>
            <Form.Control
              data-cy="input-message"
              as="textarea"
              name="message"
              rows={4}
              minLength={10}
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && (
              <div data-cy="error-message" className="text-danger">
                {formErrors.message}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Fila 5: Términos */}
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="terms">
            <Form.Check
              data-cy="checkbox-terms"
              name="terms"
              type="checkbox"
              label="Acepto los términos y condiciones *"
              checked={formData.terms}
              onChange={handleChange}
            />
            {formErrors.terms && (
              <div data-cy="error-terms" className="text-danger">
                {formErrors.terms}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Mensaje de éxito inline */}
      {success && (
        <Alert data-cy="success-msg" variant="success">
          ¡Mensaje enviado con éxito!
        </Alert>
      )}

      {/* Botón de envío */}
      <BsButton data-cy="submit-btn" variant="primary" type="submit">
        Enviar
      </BsButton>
    </Form>
  );
}
