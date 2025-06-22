import React from 'react';
import ContactForm from '../components/form/ContactForm';
import styles from './Contact.module.scss';
import fondo from '../assets/imagenes/fondo-rick-and-morty.jpg';

/**
 * Página de contacto que muestra el formulario.
 */
export default function Contact() {
  return (
    <main
      className={styles.container}
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}
    >
      <h1>Contáctanos</h1>
      <ContactForm />
    </main>
  );
}
