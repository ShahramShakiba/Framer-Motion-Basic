import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />

      <motion.dialog
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0, y: -30 }}
        open
        className="modal"
      >
        <h2> {title} </h2>

        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}

/*
initial: will be assumed immediately after this element has been added to the DOM - set the starting state

exit: animate to when the element removed from the DOM
*/
