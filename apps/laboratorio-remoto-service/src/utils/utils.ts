import * as dayjs from 'dayjs';

export function arredondarIntervaloHora(date: Date) {
  const start = dayjs(date);
  const remainder = 30 - (start.minute() % 30);
  const dataAtual = dayjs(start)
    .add(remainder, 'minute')
    .format('YYYY-MM-DD HH:mm');
  return dataAtual;
}
