export const formRules = {
    required: (value : string | number) => !!value || 'Ce champ est requis',
    numeric: (value : string | number) => /(^(\d)+(\.)?(\d)+$|^\d$)/.test(value?.toString()) || 'Doit être un nombre valide',
}