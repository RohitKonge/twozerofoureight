import React from 'react';

const FAQ: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <head>
      <title>2048 Game FAQ – Answers to Common Questions</title>
      <meta name="description" content="Find answers to frequently asked questions about playing 2048 online, game rules, privacy, and more." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type": "Question","name": "What is 2048?","acceptedAnswer": {"@type": "Answer","text": "2048 is a popular sliding tile puzzle game where you combine numbers to reach the 2048 tile."}},
          {"@type": "Question","name": "How do I play 2048?","acceptedAnswer": {"@type": "Answer","text": "Use your arrow keys or swipe to move tiles. Combine tiles with the same number to add them together. Reach 2048 to win!"}},
          {"@type": "Question","name": "Is 2048 free to play?","acceptedAnswer": {"@type": "Answer","text": "Yes, our 2048 game is completely free to play with no sign-up required."}},
          {"@type": "Question","name": "Can I play on my phone or tablet?","acceptedAnswer": {"@type": "Answer","text": "Absolutely! Our site is mobile-friendly and works on all devices."}},
          {"@type": "Question","name": "Do you store my game data?","acceptedAnswer": {"@type": "Answer","text": "We only store your high scores locally in your browser. No personal data is collected."}},
          {"@type": "Question","name": "Are there any ads?","acceptedAnswer": {"@type": "Answer","text": "We keep ads minimal to ensure a smooth gaming experience."}},
          {"@type": "Question","name": "How can I contact support?","acceptedAnswer": {"@type": "Answer","text": "Visit our Contact page or email us at support@play2048.live."}},
          {"@type": "Question","name": "Can I share my high score?","acceptedAnswer": {"@type": "Answer","text": "Yes! After each game, you can share your score with friends via social media."}}
        ]
      })}} />
    </head>
    <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold">What is 2048?</h2>
        <p>2048 is a popular sliding tile puzzle game where you combine numbers to reach the 2048 tile.</p>
      </div>
      <div>
        <h2 className="font-semibold">How do I play 2048?</h2>
        <p>Use your arrow keys or swipe to move tiles. Combine tiles with the same number to add them together. Reach 2048 to win!</p>
      </div>
      <div>
        <h2 className="font-semibold">Is 2048 free to play?</h2>
        <p>Yes, our 2048 game is completely free to play with no sign-up required.</p>
      </div>
      <div>
        <h2 className="font-semibold">Can I play on my phone or tablet?</h2>
        <p>Absolutely! Our site is mobile-friendly and works on all devices.</p>
      </div>
      <div>
        <h2 className="font-semibold">Do you store my game data?</h2>
        <p>We only store your high scores locally in your browser. No personal data is collected.</p>
      </div>
      <div>
        <h2 className="font-semibold">Are there any ads?</h2>
        <p>We keep ads minimal to ensure a smooth gaming experience.</p>
      </div>
      <div>
        <h2 className="font-semibold">How can I contact support?</h2>
        <p>Visit our Contact page or email us at support@play2048.live.</p>
      </div>
      <div>
        <h2 className="font-semibold">Can I share my high score?</h2>
        <p>Yes! After each game, you can share your score with friends via social media.</p>
      </div>
    </div>
  </div>
);

export default FAQ;
