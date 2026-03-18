import { RegionalProvider } from '@pn/config';
import { LandingPage } from './landing-page';

export function App() {
  return (
    <RegionalProvider>
      <LandingPage />
    </RegionalProvider>
  );
}

export default App;
