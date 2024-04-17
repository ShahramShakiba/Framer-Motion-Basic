import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';

import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  const handleSelectType = (newType) => {
    setSelectedType(newType);
  };

  const handleViewDetails = (id) => {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  };

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),

    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),

    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* disappears items with help of "AnimatePresence" */}
        <AnimatePresence mode="wait">
          {displayedChallenges.length > 0 && (
            <motion.ol
              key="list"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ y: -40, opacity: 0, transition: { duration: 0.2 } }}
              className="challenge-items"
            >
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}

          {displayedChallenges.length === 0 && (
            <motion.p
              key="fallback"
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -25 }}
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}

/* key
- to get back the removal animation back we need to tell framer-motion to set apart "ol" and "p" from each other
*/

/* mode
- default is mode='sync':
  - sync: all children are removed at the same time

- mode='wait':
  - wait: children are removed one by one
*/
