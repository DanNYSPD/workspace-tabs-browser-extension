import Vue from 'vue';

export default function (value) {
  if (!value) return '';
  value = value.toString();
  const i = value.indexOf('/');
  let str=value.slice(i+1).replace('/','')
  if(str.indexOf('?')>0){
    return str.slice(0,str.indexOf('?'))
  }
  return value.slice(i+1).replace('/','');
}
