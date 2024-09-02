/* eslint-disable react/display-name */
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const email = localStorage.getItem('email');

      if (!email) {
        router.replace('/signin'); // Redirect to sign-in if email is not found
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
