import { render, screen, waitFor } from '@testing-library/react';
import CreateReview from '../components/Reviews/CreateReview';
import { AuthProvider, useAuth, AuthContext } from '../providers/authProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ActionProvider } from '../providers/actionProvider';
import '@testing-library/jest-dom';

describe('CreateReview', () => {
  const auth = {
    user: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxMzZjYTY4ZjA4ZDEzMDAxNjE5YmFmZCIsInVzZXJuYW1lIjoicGFydGhtIn0sImlhdCI6MTY0OTUzNjk4NH0.b8AuvPdz02jkMPhSC6a7byLHSpqWZ9EAQFYBRPTEfgQ',
      user_id: '6136ca68f08d13001619bafd',
      username: 'parthm',
    },
  };

  // const user = {
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxMzZjYTY4ZjA4ZDEzMDAxNjE5YmFmZCIsInVzZXJuYW1lIjoicGFydGhtIn0sImlhdCI6MTY0OTUzNjk4NH0.b8AuvPdz02jkMPhSC6a7byLHSpqWZ9EAQFYBRPTEfgQ',
  //   user_id: '6136ca68f08d13001619bafd',
  //   username: 'parthm',
  // };

  const queryClient = new QueryClient();
  test('createReview button should not be disabled, auth', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={auth}>
          <ActionProvider>
            <CreateReview />
          </ActionProvider>
        </AuthContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    await waitFor(
      () =>
        expect(screen.getByRole('button')).toHaveProperty('disabled', false),
      { timeout: 1000 }
    );
  });
});

describe('CreateReview', () => {
  const user = false;
  const queryClient = new QueryClient();
  test('createReview button should be disabled, no auth', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider value={user}>
          <ActionProvider>
            <CreateReview />
          </ActionProvider>
        </AuthProvider>
      </QueryClientProvider>
    );

    // screen.debug();

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });
});
