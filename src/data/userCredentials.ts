export interface UserCredentials {
  email: string;
  password: string;
  type: 'hospital' | 'dentist' | 'pharmacy';
}

export const validCredentials: UserCredentials[] = [
  {
    email: 'mayowa.adeoye@reddington.com',
    password: 'heldapw',
    type: 'hospital'
  },
  {
    email: 'Umar.ali@smile.com',
    password: 'heldapw',
    type: 'dentist'
  },
  {
    email: 'chichi.udeh@medplus.com',
    password: 'heldapw',
    type: 'pharmacy'
  }
];

export const validateLogin = (email: string, password: string, type: 'hospital' | 'dentist' | 'pharmacy') => {
  const user = validCredentials.find(cred => cred.email === email && cred.type === type);
  
  if (!user) {
    return { isValid: false, error: 'email' };
  }
  
  if (user.password !== password) {
    return { isValid: false, error: 'password' };
  }
  
  return { isValid: true, error: null };
};
