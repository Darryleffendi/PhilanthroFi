import { Suspense, useEffect, useState } from 'react';

const CompleteRegistration = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <div>ini abis auth complete regis ya sayang</div>;
    </Suspense>
  );
};

export default CompleteRegistration;
