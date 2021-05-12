exports.signUp = data => ({
  id: data.id,
  name: data.name,
  last_name: data.lastName,
  email: data.email
});

exports.usersList = data => data.map(user => exports.signUp(user));
