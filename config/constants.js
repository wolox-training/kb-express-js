module.exports = {
  loggerPaths: {
    userService: 'services:users',
    weetService: 'services:weet'
  },
  roles: {
    REGULAR: '0',
    ADMIN: '1'
  },
  weets: {
    maxLength: 140
  },
  positions: {
    DEVELOPER: { min: 0, max: 4, label: 'DEVELOPER' },
    LEAD: { min: 5, max: 9, label: 'LEAD' },
    TL: { min: 10, max: 19, label: 'TL' },
    EM: { min: 20, max: 29, label: 'EM' },
    HEAD: { min: 30, max: 49, label: 'HEAD' },
    CEO: { min: 50, label: 'CEO' }
  }
};
