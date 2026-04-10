import { useState } from 'react';

const CONTACT_LOGO_URL =
  'https://res.cloudinary.com/dtsoyzdfu/image/upload/q_auto,f_auto,c_fill,w_120,h_120,g_auto/v1775831043/home/nadia-realestate/nadia-brand-logo-20260410.png';

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleContactClick = (method: string) => {
    switch(method) {
      case 'phone':
        window.location.href = 'tel:+639224956965';
        break;
      case 'email':
        window.location.href = 'mailto:realtornadiac@gmail.com';
        break;
      case 'messenger':
        window.open('https://www.messenger.com/t/100073887523966', '_blank');
        break;
      case 'viber':
        window.location.href = 'viber://chat?number=+639224956965';
        break;
    }
  };

  const toggleMenu = () => {
    setIsPinned(!isPinned);
    setIsExpanded(!isPinned);
  };

  const handleMouseEnter = () => {
    if (!isPinned) setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) setIsExpanded(false);
  };

  return (
    <div 
      className="floating-contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`contact-menu ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className="contact-btn phone" 
          onClick={() => handleContactClick('phone')}
          title="Call Now"
        >
          <i className="fas fa-phone-alt"></i>
        </button>
        <button 
          className="contact-btn email" 
          onClick={() => handleContactClick('email')}
          title="Email"
        >
          <i className="fas fa-envelope"></i>
        </button>
        <button 
          className="contact-btn messenger" 
          onClick={() => handleContactClick('messenger')}
          title="Messenger"
        >
          <i className="fab fa-facebook-messenger"></i>
        </button>
        <button 
          className="contact-btn viber" 
          onClick={() => handleContactClick('viber')}
          title="Viber"
        >
          <i className="fab fa-viber"></i>
        </button>
      </div>
      
      <button 
        className="contact-btn main-btn" 
        onClick={toggleMenu}
        title="Contact Me"
      >
        <img
          src={CONTACT_LOGO_URL}
          alt="Nadia Cagay Realty Logo"
          className="main-btn-avatar"
        />
      </button>
    </div>
  );
}
