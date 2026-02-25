import Hero from './components/Hero';
import Stats from './components/Stats';
import DonationForm from './components/DonationForm';
import Campaigns from './components/Campaigns';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Campaigns />
      <DonationForm />
      <Footer />
    </div>
  );
}

export default App;
