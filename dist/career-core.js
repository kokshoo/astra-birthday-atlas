(function(root){
  'use strict';
  const styles={
    D:{name:'推進型',en:'Dominance',color:'#dca591',focus:'方向與成果',strength:'願意主動定方向、處理阻礙，讓討論走向可執行的下一步。',blind:'節奏太快時，可能忽略他人的資訊、感受或執行限制。',work:'可探索需要決策、解決問題與推動專案的任務，例如短期專案帶領、流程改善或開發新方案。',communicate:'先交代目標與選項，再留時間確認不同意見；直接不必等於催促。',practice:'下一次做決定前，先詢問兩個不同意見，再說明採納或保留的理由。'},
    I:{name:'連結型',en:'Influence',color:'#ddc087',focus:'交流與參與',strength:'透過分享、鼓勵和建立連結，讓人願意參與共同的想法。',blind:'投入新點子或互動時，可能答應太多，留下收尾和追蹤的空缺。',work:'可探索需要溝通、說明與動員的任務，例如內容表達、客戶交流、活動協調或團隊分享。',communicate:'保留熱情，同時用清楚的時間、負責人與下一步讓承諾可追蹤。',practice:'每次會談結束，用三行記下「誰、做什麼、何時完成」，隔天回看一次。'},
    S:{name:'支持型',en:'Steadiness',color:'#9cbdac',focus:'合作與穩定',strength:'重視聆聽、可靠的節奏與合作，願意持續支持人和事情。',blind:'為維持和諧，可能延後表達需求，或在變動面前先默默承受。',work:'可探索需要陪伴、協調與持續維護的任務，例如團隊支援、服務流程、教學陪跑或營運協作。',communicate:'提供背景和調整時間，也明確說出自己的偏好與能承擔的範圍。',practice:'本週在一段合作中，主動說出一個真實偏好和一項需要協助的事。'},
    C:{name:'審慎型',en:'Conscientiousness',color:'#a9b6df',focus:'依據與品質',strength:'願意確認資訊、辨識細節與檢查假設，讓成果有依據並維持品質。',blind:'標準過高或資訊不完整時，可能反覆確認，讓決定與交付不斷延後。',work:'可探索需要分析、整理和品質管理的任務，例如資料研究、規格整理、測試或流程稽核。',communicate:'說明依據與完成標準，同時區分必須確認的風險和可以先試的小範圍。',practice:'任務開始前訂三個完成條件與一個交付時間，達標後先交付再集中修訂。'}
  };
  const questions=[
    ['D1','D','任務停滯時，我會主動提出下一步。'],['I1','I','我會透過分享想法，讓大家願意參與。'],['S1','S','我願意耐心聽完別人的顧慮。'],['C1','C','下決定前，我會核對資訊的依據。'],
    ['D2','D','面對不確定，我願意作暫時決定並承擔結果。'],['I2','I','認識新的人或交換想法，常讓我感到有活力。'],['S2','S','我偏好用穩定、可預期的節奏完成事情。'],['C2','C','我會注意到可能影響結果的細節或不一致。'],
    ['D3','D','我習慣用清楚的目標和期限推動事情。'],['I3','I','我容易用鼓勵或故事帶動現場氣氛。'],['S3','S','合作時，我願意持續追蹤並提供支持。'],['C3','C','開始工作前，我希望先了解規格與完成標準。'],
    ['D4','D','意見不同時，我會直接說明自己的立場。'],['I4','I','我樂於主動交流，建立新的合作連結。'],['S4','S','面對衝突，我會先尋找雙方能接受的做法。'],['C4','C','我習慣比較不同方案的風險與證據。']
  ].map(([id,style,text])=>({id,style,text}));

  function empty(){return {version:2,answers:{},submitted:false,plan:{context:'',action:'',review:''}};}
  function score(answers){
    if(!answers||typeof answers!=='object'||Array.isArray(answers))throw new Error('請先完成 16 題。');
    const totals={D:0,I:0,S:0,C:0};
    for(const q of questions){const v=answers[q.id];if(!Number.isInteger(v)||v<1||v>5)throw new Error('請完成全部 16 題，每題選擇 1–5。');totals[q.style]+=v;}
    const max=Math.max(...Object.values(totals));
    return {totals,averages:Object.fromEntries(Object.entries(totals).map(([k,v])=>[k,v/4])),leaders:Object.keys(totals).filter(k=>totals[k]===max),balanced:Math.max(...Object.values(totals))-Math.min(...Object.values(totals))<=2};
  }

  function normalize(value){
    const state=empty();if(!value||![1,2].includes(value.version))return state;
    if(value.answers&&typeof value.answers==='object'&&!Array.isArray(value.answers))for(const q of questions){const v=value.answers[q.id];if(Number.isInteger(v)&&v>=1&&v<=5)state.answers[q.id]=v;}
    if(value.submitted===true){try{score(state.answers);state.submitted=true;}catch{}}
    if(value.plan&&typeof value.plan==='object')for(const [key,max] of [['context',600],['action',800],['review',1200]])if(typeof value.plan[key]==='string')state.plan[key]=value.plan[key].trim().slice(0,max);
    return state;
  }
  const api={styles,questions,empty,score,normalize};root.AstraCareerCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);

