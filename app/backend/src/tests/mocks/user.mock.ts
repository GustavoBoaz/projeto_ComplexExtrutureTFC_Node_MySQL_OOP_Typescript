const userMock = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

const validLoginMock = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const notEmailLoginMock = {
  password: "secret_admin"
}

const notPasswordLoginMock = {
  email: "admin@admin.com"
}

const notFoundEmailLoginMock = {
  email: "notFound@admin.com",
  password: "secret_notFound"
}

const notFoundPasswordLoginMock = {
  email: "admin@admin.com",
  password: "secret_notFound"
}

const payloadDecodeMock = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
}

const invalidEmailsMock = [
  {
    email: "@admin.com",
    password: "secret_admin"
  },
  {
    email: "admin@admin",
    password: "secret_admin"
  },
  {
    email: "admin@.com",
    password: "secret_admin"
  },
  {
    email: "admin.admin.com",
    password: "secret_admin"
  }
]

const invalidPasswordsMock = [
  {
    email: "admin@admin.com",
    password: "12345"
  },
  {
    email: "admin@admin.com",
    password: " "
  }
]

export {
  userMock,
	validLoginMock,
  notEmailLoginMock,
  notPasswordLoginMock,
  notFoundEmailLoginMock,
  notFoundPasswordLoginMock,
  payloadDecodeMock,
  invalidEmailsMock,
  invalidPasswordsMock
}