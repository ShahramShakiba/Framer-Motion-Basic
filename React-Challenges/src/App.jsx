import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ChallengesPage from './pages/Challenges.jsx';
import WelcomePage from './pages/Welcome.jsx';

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/challenges', element: <ChallengesPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
