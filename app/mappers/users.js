exports.signIn = data => ({
  email: data.email,
  password: data.password
});

exports.signUp = data => ({
  name: data.name,
  lastName: data.last_name,
  ...exports.signIn(data)
});
