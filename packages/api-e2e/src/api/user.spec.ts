import { createUserInputFixture } from '@api/app/users/user.fixture';
import axios from 'axios';

describe('User', () => {
  it('should create a new user', async () => {
    const res = await axios.post(`/api`, createUserInputFixture);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
