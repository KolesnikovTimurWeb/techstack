'use client';
import { Next13ProgressBar } from 'next13-progressbar';
const NextNProgressClient = () => {
   return <Next13ProgressBar
      height="1px" color="#001fff" options={{ showSpinner: false }} showOnShallow
   />;
};

export default NextNProgressClient;