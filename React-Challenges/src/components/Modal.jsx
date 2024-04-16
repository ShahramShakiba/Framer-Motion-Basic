import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />

      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        exit="hidden"
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

variants: defining and reusing certain animation states
*/
