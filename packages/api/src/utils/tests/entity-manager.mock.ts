export const entityManagerMock = {
  persistAndFlush: jest.fn().mockImplementation(() => {
    return Promise.resolve();
  }),
  create: jest.fn().mockImplementation(() => {
    return Promise.resolve();
  }),
};
