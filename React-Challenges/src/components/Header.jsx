import { useState } from 'react';

import NewChallenge from './NewChallenge.jsx';
import { AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  const addNewChallengeHandler = () => {
    setIsCreatingNewChallenge(true);
  };

  const handleDone = () => {
    setIsCreatingNewChallenge(false);
  };

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1> Your Challenges </h1>

        <button onClick={addNewChallengeHandler} className="button">
          Add Challenge
        </button>
      </header>
    </>
  );
}

/* AnimatePresence
to be used as a wrapper around the code that conditionally displays or removes elements if you wanna animate those elements - especially to animate the "disappearance" of those elements
*/
