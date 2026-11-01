const test=require('node:test');
const assert=require('node:assert/strict');
const c=require('../dist/core.js');
require('../dist/data.js');
test('real dates, leap days and future birthdays are validated',()=>{
 assert.equal(c.validate('2000-02-29','2026-10-31'),'');
 for(const d of ['1900-02-29','2023-02-29','2026-04-31','2026-00-01','2026-13-01','not-a-date','1899-12-31','2026-11-01',''])assert.ok(c.validate(d,'2026-10-31'),d);
 assert.equal(c.validate('2026-10-31','2026-10-31'),'');
});
test('every zodiac start and end maps correctly, including year wrap',()=>{
 const pairs=[['03-21','04-19'],['04-20','05-20'],['05-21','06-21'],['06-22','07-22'],['07-23','08-22'],['08-23','09-22'],['09-23','10-23'],['10-24','11-22'],['11-23','12-21'],['12-22','01-19'],['01-20','02-18'],['02-19','03-20']];
 pairs.forEach((dates,i)=>dates.forEach(d=>assert.equal(c.signIndex('2000-'+d),i,d)));
 assert.equal(c.signIndex('2000-01-01'),9);assert.equal(c.signIndex('2000-12-31'),9);
});
test('all birthday digits summed before reduction; masters preserved',()=>{
 assert.deepEqual(c.lifePath('1996-08-16').steps,[40,4]);
 assert.equal(c.lifePath('2000-09-09').number,2);
 assert.equal(c.lifePath('2000-01-08').number,11);
 assert.equal(c.lifePath('2000-09-29').number,22);
 assert.equal(c.lifePath('1990-09-05').number,33);
});
test('all dates in a leap year have defined sign and complete number content',()=>{
 for(let d=new Date('2000-01-01T00:00:00Z');d.getUTCFullYear()===2000;d.setUTCDate(d.getUTCDate()+1)){
  const date=d.toISOString().slice(0,10),sign=AstraData.signs[c.signIndex(date)],n=AstraData.numbers[c.lifePath(date).number];
  assert.ok(sign?.character?.lesson,date);assert.ok(n?.practice,date);assert.ok(n?.character?.lesson,date);
 }
});
