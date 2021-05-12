exports.signUp = data => ({
  id: data.id,
  name: data.name,
  last_name: data.lastName,
  email: data.email,
  is_admin: data.isAdmin
});
