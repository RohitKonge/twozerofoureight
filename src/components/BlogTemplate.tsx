import React from 'react';

interface BlogTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({ title, description, children }) => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </head>
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    {children}
    <div className="mt-8 p-4 bg-amber-100 rounded-lg text-center">
      <p className="mb-2 font-semibold">Ready to try your skills?</p>
      <a href="/" className="text-amber-700 underline font-bold">Play 2048 Now</a>
      <span className="mx-2">|</span>
      <a href="/faq" className="text-amber-700 underline font-bold">Read FAQ</a>
    </div>
  </div>
);

export default BlogTemplate;
