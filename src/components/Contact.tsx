import React from 'react';

const Contact: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <head>
      <title>Contact Us – TwoZeroFourEight</title>
      <meta name="description" content="Get in touch with the TwoZeroFourEight team for support, feedback, or partnership inquiries." />
    </head>
    <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
    <p className="mb-4">We’d love to hear from you! For support, feedback, or business inquiries, please contact us at:</p>
    <p className="mb-4 font-semibold">Email: <a href="mailto:your@email.com" className="text-amber-700 underline">your@email.com</a></p>
    <p>Or use our <span className="font-semibold">contact form</span> below:</p>
    <form className="mt-4 space-y-4 max-w-md">
      <input type="text" placeholder="Your Name" className="w-full border rounded p-2" required />
      <input type="email" placeholder="Your Email" className="w-full border rounded p-2" required />
      <textarea placeholder="Your Message" className="w-full border rounded p-2" rows={4} required />
      <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded font-bold hover:bg-amber-700">Send Message</button>
    </form>
    <p className="mt-6 text-sm text-amber-600">We aim to respond within 2 business days.</p>
  </div>
);

export default Contact;
