import React from 'react';

const About: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <head>
      <title>About 2048 – The Best Place to Play 2048 Online</title>
      <meta name="description" content="Learn about the creators of 2048, our mission, and why we’re passionate about delivering the best 2048 experience online." />
    </head>
    <h1 className="text-3xl font-bold mb-4">About Us</h1>
    <p className="mb-4">2048 was created by a team of passionate developers and puzzle lovers who wanted to bring the joy of 2048 to everyone, everywhere. Our mission is simple: make classic games accessible, enjoyable, and fast for all users, on any device.</p>
    <h2 className="text-xl font-semibold mb-2">Why Trust Us?</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>Experienced web developers with a love for games</li>
      <li>Committed to privacy and a smooth user experience</li>
      <li>Always improving based on your feedback</li>
    </ul>
    <p>Thank you for playing and being part of our growing community!</p>
  </div>
);

export default About;
