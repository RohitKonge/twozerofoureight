import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <head>
      <title>Privacy Policy – TwoZeroFourEight</title>
      <meta name="description" content="Read our privacy policy to learn how we handle your data, cookies, analytics, and advertising." />
    </head>
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-4">Your privacy is important to us. This policy explains how TwoZeroFourEight (“we”, “us”, or “our”) collects, uses, and protects your information.</p>
    <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>We use cookies to enhance your experience and remember your high scores.</li>
      <li>We use analytics tools (such as Google Analytics) to track website usage and improve our services.</li>
      <li>We may display ads from third-party networks.</li>
    </ul>
    <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>To provide and improve our game and website.</li>
      <li>To analyze usage trends and optimize performance.</li>
      <li>To display relevant ads (if applicable).</li>
    </ul>
    <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>You can disable cookies in your browser settings.</li>
      <li>You may opt out of personalized ads via your ad settings.</li>
    </ul>
    <h2 className="text-xl font-semibold mb-2">Data Security</h2>
    <p className="mb-4">We do not collect personal information. All high scores are stored locally in your browser.</p>
    <h2 className="text-xl font-semibold mb-2">Contact</h2>
    <p>For privacy questions, contact us at <a href="mailto:your@email.com" className="text-amber-700 underline">your@email.com</a>.</p>
  </div>
);

export default PrivacyPolicy;
