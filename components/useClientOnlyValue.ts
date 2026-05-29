import React from 'react';

// This is a simple implementation of useClientOnlyValue to bypass server/client rendering logic in pure React Native (Expo Go)
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (hasMounted) {
    return client;
  }

  return server;
}
