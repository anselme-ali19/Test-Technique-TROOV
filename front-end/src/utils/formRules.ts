import validator from "validator";
const optionsEmail = {
    allow_utf8_local_part: false,
    blacklisted_chars: "!#$%&'*+/=?^_`{|}~",
  };
export const formRules = {
    required: (value : string | number) => !!value || 'Ce champ est requis',
    numeric: (value : string | number) => /(^(\d)+(\.)?(\d)+$|^\d$)/.test(value?.toString()) || 'Doit être un nombre valide',
    email : (value : string) => validator.isEmail(value, optionsEmail) || 'Email invalide',
    passwordLength: (value : string ) => /^.{4,}$/.test(value) || 'doit contenir au moins 4 caractères',
    password: (value : string) => !value.includes(' ') || 'ne doit pas contenir d\'espaces',
    integer: (value : string | number) => /(^\d+$)/.test(value?.toString()) || 'Doit être un nombre valide',
}