export const number = value => (
  value && Number.isNaN(parseInt(value, 10)) ? 'Musi być liczbą' : undefined
);

export const minLength = min => value => (
  value && value.length < min ? `Musi zawierać minimalnie ${min} znaków` : undefined
);

export const required = value => (
  value || typeof value === 'number' ? undefined : 'Pole jest wymagane'
);

const maxLength = max => value => (
  value && value.length > max ? `Musi zawierać maksymalnie ${max} znaków` : undefined
);
export const maxLength32 = maxLength(32);

export const password = value => (
  value && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value) ? 'Hasło musi zawierać co najmniej 1 cyfrę, 1 literę, 1 znak specjalny i mieć długość co najmniej 8 znaków' : undefined
);

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Nieprawidłowy adres email' : undefined
);

export const postCode = value => (
  value && !/^\d{5}$/.test(value) ? 'Nieprawidłowy kod pocztowy' : undefined
);

export const nip = value => (
  value && !/^\d{10}$/.test(value) ? 'Nieprawidłowy NIP' : undefined
);

export const passwordMatch = (value, allValues) => (
  value !== allValues.newPassword ? 'Hasła nie są identyczne' : undefined
);

export const size = value => (
  value && !/^\d+x\d+x\d+$/.test(value) ? 'Rozmiar powinien być w formacie: 000x000x000' : undefined
);
