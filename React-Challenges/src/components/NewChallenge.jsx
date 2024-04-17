import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import images from '../assets/images.js';
import Modal from './Modal.jsx';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  //      ref ,   fun
  const [scope, animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      // Imperative Animations
      animate(
        'input, textarea',
        { x: [-15, 0, 15, 0] },
        {
          type: 'spring',
          duration: 0.3,
          delay: stagger(0.08),
        }
      );

      return;
    }

    onDone();
    addChallenge(challenge);
  };

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title"> Title </label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description"> Description </label>
          <textarea
            ref={description}
            name="description"
            id="description"
            rows="5"
          />
        </p>

        <p>
          <label htmlFor="deadline"> Deadline </label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.3 },
                visible: { opacity: 1, scale: [0.5, 1.2, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button className='cancel-challenge' type="button" onClick={onDone}>
            Cancel
          </button>

          <button className='add-challenge'> Add Challenge </button>
        </p>
      </form>
    </Modal>
  );
}

/* why we should not use:  exit="hidden"

- first of all we need to use "exit" since we get a delay of removal

- if you use this the "entry animation" of these "images" will gone 

- if you set one of those animation-props like initial, animate, exit on some child-component when using that "variants" feature to activate animations

- you must not use one of your variant names here in child-component

instead you should use it like this:   exit={{ opacity: 1, scale: 1 }}

- to not causing this delay in the removal here in "images"
*/

/* Stagger animations - staggerChildren
- to delay Children - play them after each other instead of simultaneously
*/

/* Working with Keyframes
-  scale: [0.5, 1.2, 1] <- keyframes: an array of numbers instead of one number
*/
