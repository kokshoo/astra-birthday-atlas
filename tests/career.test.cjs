const test=require('node:test'),assert=require('node:assert/strict');
const k=require('../dist/career-core.js');
const answers=(fn=()=>3)=>Object.fromEntries(k.questions.map(q=>[q.id,fn(q)]));
test('incomplete, invalid and coerced answers cannot produce a style',()=>{
 for(const invalid of [{},answers(q=>q.id==='D1'?undefined:3),answers(q=>q.id==='D1'?'5':3),answers(q=>q.id==='D1'?6:3),answers(q=>q.id==='D1'?1.5:3)])assert.throws(()=>k.score(invalid));
});
test('four independent averages come only from the 16 answers',()=>{
 const r=k.score(answers(q=>({D:5,I:4,S:2,C:1})[q.style]));
 assert.deepEqual(r.averages,{D:5,I:4,S:2,C:1});assert.deepEqual(r.leaders,['D']);assert.equal(r.balanced,false);
});
test('ties are retained and close scores are flagged as balanced',()=>{
 assert.deepEqual(k.score(answers(q=>q.style==='D'||q.style==='I'?5:2)).leaders,['D','I']);
 assert.equal(k.score(answers()).balanced,true);assert.equal(k.score(answers(q=>q.id==='D1'?5:3)).balanced,true);
});
test('legacy saved reports and malformed states stay empty',()=>{
 assert.deepEqual(k.normalize(undefined),k.empty());assert.deepEqual(k.normalize({version:2}),k.empty());assert.equal(k.normalize({version:1,submitted:true,answers:{}}).submitted,false);
});
test('4U text is explicitly supplied rather than inferred',()=>{
 assert.equal(k.cleanFourU({source:'only a source'}),null);
 const report=k.cleanFourU({role:'測試角色',rawText:'<script>user text</script>'},true);
 assert.equal(report.role,'測試角色');assert.equal(report.rawText,'<script>user text</script>');assert.ok(report.source);
 assert.throws(()=>k.cleanFourU({rawText:'a'.repeat(12001)},true));
});
test('same-birthday career export roundtrip preserves answers and 4U content',()=>{
 const state={version:1,answers:answers(),submitted:true,fourU:{role:'測試角色',rawText:'報告摘錄'}};
 const value=JSON.stringify({format:'astra-career-v1',birthday:'1996-08-16',career:state});
 assert.deepEqual(k.parseImport(value,'1996-08-16'),k.normalize(state));
 assert.throws(()=>k.parseImport(value,'2000-01-01'),/生日/);
});
test('foreign JSON, oversized fields and invalid completed questionnaires are rejected',()=>{
 assert.throws(()=>k.parseImport('{}','1996-08-16'));
 assert.throws(()=>k.parseImport('not json','1996-08-16'));
 assert.throws(()=>k.parseImport('a'.repeat(80001),'1996-08-16'));
 const wrap=career=>JSON.stringify({format:'astra-career-v1',birthday:'1996-08-16',career});
 assert.throws(()=>k.parseImport(wrap({version:1,submitted:true,answers:{}}),'1996-08-16'));
 assert.throws(()=>k.parseImport(wrap({version:1,fourU:{role:4}}),'1996-08-16'));
});
