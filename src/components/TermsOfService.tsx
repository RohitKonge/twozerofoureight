import React from 'react';

const TermsOfService: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <head>
      <title>Terms of Service – 2048</title>
      <meta name="description" content="Review the terms and conditions for using the 2048 website and game." />
    </head>
    <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
    <p className="mb-4">By using 2048, you agree to the following terms:</p>
    <ul className="list-disc pl-6 mb-4">
      <li>The game is provided “as is” for personal, non-commercial use.</li>
      <li>We may update or discontinue features at any time.</li>
      <li>We are not liable for any damages or data loss.</li>
      <li>You agree not to misuse or attempt to disrupt the website.</li>
      <li>We may display ads to support the service.</li>
    </ul>
    <p>For questions, contact <a href="mailto:support@play2048.live" className="text-amber-700 underline">support@play2048.live</a>.</p>
  </div>
);

export default TermsOfService;
