(async ()=>{
  try{
    const body = { userPrompt: "Create a 3-tier pricing table UI with one header and three cards: Basic ($10/mo), Pro ($29/mo), Enterprise (Contact Sales). Use className for Tailwind where appropriate and return only the A2UI JSON array." };
    const res = await fetch('http://localhost:3002/api/agent', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(body) });
    const json = await res.json();
    console.log('Status:', res.status);
    console.log(JSON.stringify(json, null, 2));
  }catch(e){
    console.error('Error:', e);
    process.exit(1);
  }
})();
