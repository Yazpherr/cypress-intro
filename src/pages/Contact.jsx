import React from 'react';
import ContactForm from '../components/form/ContactForm';
import styles from './Contact.module.scss';

/**
 * Página de contacto que muestra el formulario.
 */
export default function Contact() {
  return (
    <main className={styles.container}>
      <h1>Contáctanos</h1>
      <ContactForm />
    </main>
  );
}
