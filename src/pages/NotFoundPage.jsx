import React from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <main className="min-h-screen pt-40 pb-24 bg-[#F7F7F5] flex items-center justify-center">
      <Container>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <span className="font-mono text-5xl font-extrabold text-[#D85B3F]">404</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#111111]">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B67]">
            The requested page does not exist or has been relocated within our studio directory.
          </p>
          <div className="pt-4">
            <Button href="/" variant="primary" size="md">
              Return to Homepage
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};
