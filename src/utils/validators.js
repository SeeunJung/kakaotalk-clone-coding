export const isValidEmail = (email) => {
  const regex = /^[A-Za-z0-9]([-.]?[A-Za-z0-9])*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  return regex.test(email);
};

export const isValidPassword = (password) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return regex.test(password);
};

export const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^[0-9]*$/;
  return regex.test(phoneNumber);
};