(function(root){
  const masters = [11,22,33];
  function today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
  function validate(value,limit=today()){
    if(!value)return '請先輸入你的出生日期。';
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return '請輸入完整的西曆出生日期。';
    const [y,m,d]=value.split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));
    if(date.getUTCFullYear()!==y||date.getUTCMonth()!==m-1||date.getUTCDate()!==d)return '這個日期不存在，請再確認月份與日期。';
    if(value<'1900-01-01')return '目前支援 1900 年 1 月 1 日起的生日。';
    if(value>limit)return '生日不能是未來的日期。';
    return '';
  }
  function lifePath(value){
    const digits=value.replace(/-/g,'').split('').map(Number);
    let sum=digits.reduce((a,b)=>a+b,0);const steps=[sum];
    while(sum>9&&!masters.includes(sum)){sum=String(sum).split('').reduce((a,b)=>a+Number(b),0);steps.push(sum);}
    return {number:sum,digits,steps,base:sum>9?String(sum).split('').reduce((a,b)=>a+Number(b),0):sum};
  }
  function signIndex(value){
    const [,m,d]=value.split('-').map(Number),md=m*100+d;
    const starts=[321,420,521,622,723,823,923,1024,1123,1222,120,219];
    const ends=[419,520,621,722,822,922,1023,1122,1221,119,218,320];
    return starts.findIndex((s,i)=>s>ends[i]?(md>=s||md<=ends[i]):md>=s&&md<=ends[i]);
  }
  const api={today,validate,lifePath,signIndex};root.AstraCore=api;
  if(typeof module!=='undefined')module.exports=api;
})(globalThis);
