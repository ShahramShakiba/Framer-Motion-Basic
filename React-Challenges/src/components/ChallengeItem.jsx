import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';

import { ChallengesContext } from '../store/challenges-context.jsx';

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );

  const handleCancel = () => {
    updateChallengeStatus(challenge.id, 'failed');
  };

  const handleComplete = () => {
    updateChallengeStatus(challenge.id, 'completed');
  };

  return (
    <motion.li layout exit={{ y: -40, opacity: 0 }}>
      <article className="challenge-item">
        <header>
          <img {...challenge.image} />

          <div className="challenge-item-meta">
            <h2> {challenge.title} </h2>

            <p> Complete until {formattedDate}</p>

            <p className="challenge-item-actions">
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button>

              <button onClick={handleComplete}> Mark as completed </button>
            </p>
          </div>
        </header>

        <div
          // className={`challenge-item-details ${isExpanded ? 'expanded' : ''}`}
          className="challenge-item-details"
        >
          <p>
            <button onClick={onViewDetails}>
              View Details
              <motion.span
                className="challenge-item-details-icon"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                &#9650;
              </motion.span>
            </button>
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="challenge-item-description">
                  {challenge.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}

/* 
animate: describe the animation we want to play

transition: configure the animation that will be played 

type: which type of animation should be played(default= 'spring' - inertia - just - keyframes - tween )

bounce: control how much it bounces between 0 - 1
*/
