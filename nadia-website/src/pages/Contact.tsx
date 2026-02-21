import { useRef, useState } from 'react';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Inquiry from ${data.get('from_name')}`,
      name:    data.get('from_name'),
      email:   data.get('from_email'),
      phone:   data.get('phone') || 'Not provided',
      message: data.get('message'),
    };

    setStatus('loading');
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="section-title">Let's Find Your Dream Home</h2>
        <p className="section-subtitle">Reach out to Nadia today and start your journey to finding the perfect property</p>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Call or Text</h3>
                <p>09224956965</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p>realtornadiac@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <h3>Messenger &amp; Viber</h3>
                <p>Instant messaging available</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            {status === 'success' ? (
              <div className="contact-success">
                <span className="contact-success-icon">✅</span>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. Nadia will get back to you as soon as possible.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  className="form-input"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  className="form-input"
                />
                <textarea
                  name="message"
                  placeholder="Tell me about your ideal property..."
                  className="form-textarea"
                  rows={4}
                  required
                />

                {status === 'error' && (
                  <p className="contact-error">
                    Something went wrong. Please try again or email directly at realtornadiac@gmail.com.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
