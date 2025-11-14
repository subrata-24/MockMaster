export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  //test method is a built-in JavaScript method that belongs to the RegExp prototype.
};

export const validatePassword = (password) => {
  if (password.length < 8) return "Password must be at least 8 characters";

  let ch = 0,
    num = 0,
    sp = 0;

  for (let i = 0; i < password.length; i++) {
    const chr = password[i];

    if ((chr >= "a" && chr <= "z") || (chr >= "A" && chr <= "Z")) ch++;
    else if (chr >= "0" && chr <= "9") num++;
    else sp++;
  }

  if (num === 0) return "Password must contain at least one digit";
  if (ch === 0) return "Password must contain at least one character";
  if (sp === 0) return "Password must contain at least one special character";

  return null;
};
