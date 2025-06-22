import React from 'react';
import styles from './Button.module.scss';

/**
 * Botón reutilizable con estilo encapsulado en módulo SCSS.
 *
 * @param {{ onClick: Function, children: React.ReactNode, disabled?: boolean }} props
 */
export function Button({ onClick, children, disabled = false }) {
  return (
    <button
      // Usamos la clase del módulo SCSS para mantener el scope
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
