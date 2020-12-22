import axios from 'axios';
import Auth from '../../../src/store/modules/auth';

jest.mock('axios');

describe('Auth state mutations', () => {
  const { setLoggedIn, setUser, setLoggingIn, setLoggingOut } = Auth.mutations;

  it('should set loggedIn and checked to true when logged in', () => {
    const mockState = { loggedIn: false, checked: false };
    setLoggedIn(mockState, true);
    expect(mockState.loggedIn).toBe(true);
    expect(mockState.checked).toBe(true);
  });

  it('should set the user', () => {
    const mockState = { currentUser: null };
    setUser(mockState, { username: 'test' });
    expect(mockState.currentUser.username).toBe('test');
  });

  it('should set loggingIn to true', () => {
    const mockState = { loggingIn: false };
    setLoggingIn(mockState, true);
    expect(mockState.loggingIn).toBe(true);
  });

  it('should set loggingOut to true', () => {
    const mockState = { loggingOut: false };
    setLoggingOut(mockState, true);
    expect(mockState.loggingOut).toBe(true);
  });
});

describe('Auth state actions', () => {
  const { checkLoggedIn } = Auth.actions as any;

  it('should set the user as logged in', async () => {
    // Mocks
    const response = { username: 'testing' };
    (axios.get as any).mockImplementation(() => Promise.resolve({ data: response }));
    const commit = jest.fn();

    await checkLoggedIn({ commit, state: null }, null);

    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenCalledWith('setLoggedIn', true);
    expect(commit).toHaveBeenCalledWith('setUser', response);
  });

  it('should set the user as not logged in', async () => {
    // Mocks
    (axios.get as any).mockImplementation(() => { throw ''; });
    const commit = jest.fn();

    await checkLoggedIn({ commit, state: null }, null);

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('setLoggedIn', false);
  });
});
