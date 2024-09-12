import React from 'react';
import { Button } from 'react-bootstrap';
import { FcHighPriority } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <section className='tw-text-center tw-h-screen tw-py-20 tw-space-y-9'>
      <FcHighPriority className='mx-auto tw-text-9xl' />

      <h1>404!</h1>

      <p>
        Sorry, it seems like you lost your way. Click this link and you'll be
        fine.
      </p>

      <Button as={Link} to='/login' variant='primary'>
        Go to Login
      </Button>
    </section>
  );
};

export default NoMatch;
