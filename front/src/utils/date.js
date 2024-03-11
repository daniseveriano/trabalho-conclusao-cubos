import { differenceInDays, parseISO } from 'date-fns';

function addZeroEsquerda(numero) {
  return (numero <= 9) ? `0${numero}` : `${numero}`;
}

export function dateISOtoDDMMYYYY(iso) {
  const date = new Date(iso.slice(0, -1));
  return `${addZeroEsquerda(date.getDate())}/${addZeroEsquerda(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function isVencida(dataStr) {
  const data = parseISO(dataStr.slice(0, -1));
  const today = new Date();
  const days = differenceInDays(today, data);
  return days > 0;
}
