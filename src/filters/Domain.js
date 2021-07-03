import Vue from 'vue';

export default function (value) {
  if (!value) return '';

  if (value.indexOf('http') < 0) {
    return '';
  }
  if (value.indexOf('https') < 0) {
    //https
    const sub = value.slice(value.indexOf('http') + 8);
    return sub.slice(0, sub.indexOf('/'));
  }

  const i = value.indexOf(value.indexOf('http')) + 8;
  let str = value.slice(i + 1);

  console.log(str);
  debugger
  return str.slice(0 , str.indexOf('/'));

  if (str.indexOf('?') > 0) {
    return str.slice(0, str.indexOf('?'));
  }
  return value.slice(i + 1).replace('/', '');
}
