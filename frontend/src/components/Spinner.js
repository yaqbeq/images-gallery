import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  return (
    <div className="text-center mt-5">
      <BootstrapSpinner animation="border" role="status" variant="primary" />
    </div>
  );
};

export default Spinner;
