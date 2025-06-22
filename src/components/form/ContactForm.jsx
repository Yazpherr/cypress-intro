// src/components/form/ContactForm.jsx
import React, { useState } from 'react';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validamos manualmente
    const { name, email, message } = formData;
    if (name.length < 3 || !email || message.length < 10) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p data-cy="success-msg" className={styles.success}>
        ¡Mensaje enviado con éxito! 🎉
      </p>
    );
  }

  return (
    <form data-cy="contact-form" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Nombre:</label>
        <input
          data-cy="input-name"
          id="name"
          name="name"
          type="text"
          minLength={3}
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Correo:</label>
        <input
          data-cy="input-email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Mensaje:</label>
        <textarea
          data-cy="input-message"
          id="message"
          name="message"
          minLength={10}
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button data-cy="submit-btn" type="submit" className={styles.button}>
        Enviar
      </button>
    </form>
  );
}
