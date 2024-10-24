"use client"

import React from 'react';
import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div className="container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Oops! Page not found.</h2>
      <p className="description">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className='back-home'>
      back-to-home
      </Link>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          text-align: center;
          background: linear-gradient(135deg, #f06, #d63);
          color: #fff;
          font-family: 'Arial', sans-serif;
        }

        .error-code {
          font-size: 6rem;
          font-weight: bold;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
        }

        .error-message {
          font-size: 2rem;
          margin: 10px 0;
          color: rgba(255, 255, 255, 0.8);
        }

        .description {
          margin: 20px 0;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .back-home {
          display: inline-block;
          margin-top: 30px;
          padding: 12px 24px;
          background-color: #ff6363;
          color: #fff;
          text-decoration: none;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }

        .back-home:hover {
          background-color: #ff4b4b;
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;
