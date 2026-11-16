import { useCallback, useEffect, useState } from 'react';
import type { ServiceItem } from './data/services';
import { initGA } from './utils/analytics';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Experiences } from './components/Experiences';
import { Stay } from './components/Stay';
import { HowItWorks } from './components/HowItWorks';
import { Gallery } from './components/Gallery';
import { Policies } from './components/Policies';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { QuickActions } from './components/QuickActions';
import { ServiceDrawer } from './components/ServiceDrawer';
import { BookingModal } from './components/BookingModal';

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [detail, setDetail] = useState<ServiceItem | null>(null);

  useEffect(() => {
    initGA();
  }, []);

  const openBooking = useCallback((service: ServiceItem | null = null) => {
    setDetail(null);
    setBookingService(service);
    setBookingOpen(true);
  }, []);
  const book = useCallback(() => openBooking(null), [openBooking]);
  const closeBooking = useCallback(() => setBookingOpen(false), []);
  const closeDetail = useCallback(() => setDetail(null), []);

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar onBook={book} />
      <main>
        <Hero onBook={book} />
        <Intro />
        <Experiences onOpen={setDetail} onBook={openBooking} />
        <Stay onBook={openBooking} />
        <HowItWorks onBook={book} />
        <Gallery />
        <Policies />
        <Contact />
      </main>
      <Footer onBook={book} />

      <QuickActions onBook={book} hidden={bookingOpen || !!detail} />
      <ServiceDrawer service={detail} onClose={closeDetail} onBook={openBooking} />
      <BookingModal isOpen={bookingOpen} initialService={bookingService} onClose={closeBooking} />
    </div>
  );
}

export default App;
