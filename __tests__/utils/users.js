module.exports = {
  admin: {
    validAdmin: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    },
    invalidAdmin: {
      id: 1,
      username: 'Admin',
      role: 'undefined',
      email: 'admin@xablau.com',
      password: 'senha_invalida',
    },
  },
  user: {
    validUser: {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    },
    invalidUser: {
      id: 2,
      username: 'User',
      role: 'undefined',
      email: 'user@xablau.com',
      password: 'senha_invalida',
    },
    invalidEmailUsers: [
      {
        id: 2,
        username: 'User',
        role: 'user',
        email: '@user.com',
        password: 'secret_user',
      },
      {
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@.com',
        password: 'secret_user',
      },
      {
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user',
        password: 'secret_user',
      },
    ],
    invalidPasswordUsers: [
      {
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: 'secre',
      },
       {
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '12345',
      },
      {
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '      ',
      },
    ]
  },
};
