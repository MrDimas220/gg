// Початкові ціни (2025-11-23)
const PRICES = {
  BTC: {price: 84683, change24h: '-4.2%', marketCap: '1.69T'},
  ETH: {price: 2768.62, change24h: '-6.1%', marketCap: '334.4B'},
  USDT:{price:0.9996, change24h: '0.0%', marketCap: '173B'},
  BNB:{price:843.73, change24h: '-2.2%', marketCap: '137.2B'},
  LTC:{price:82.83, change24h: '+0.4%', marketCap: '5.6B'},
  SOL:{price:131.00, change24h: '+4.2%', marketCap: '54.3B'},
};

// render coins grid
const coinsGrid = document.getElementById('coinsGrid');
for(const k in PRICES){
  const c=PRICES[k];
  const div=document.createElement('div');div.className='coin';
  div.innerHTML=`<div style="font-weight:700">${k}</div>
                 <div class="muted">$${Number(c.price).toLocaleString()}</div>
                 <div style="margin-top:6px;color:var(--muted);font-size:0.9rem">
                 24h: ${c.change24h}</div>`;
  coinsGrid.appendChild(div);
}

// render market table
const marketTable = document.getElementById('marketTable');
for(const k in PRICES){
  const c=PRICES[k];
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${k}</td><td>${k}</td>
                <td>$${Number(c.price).toLocaleString()}</td>
                <td>${c.change24h}</td><td>${c.marketCap}</td>`;
  marketTable.appendChild(tr);
}

// EXCHANGE LOGIC
function estimate(){
  const from=document.getElementById('fromCoin').value;
  const to=document.getElementById('toCoin').value;
  const a=parseFloat(document.getElementById('amt').value||0);
  if(!a){
    document.getElementById('estimate').innerText='Орієнтовно: —';
    return;
  }
  const usd = a * PRICES[from].price;
  const out = usd / PRICES[to].price;
  document.getElementById('estimate').innerText =
    'Орієнтовно: '+out.toFixed(8)+' '+to+
    ' (за курсом $'+PRICES[from].price+' → $'+PRICES[to].price+')';
}

document.getElementById('amt').addEventListener('input', estimate);
document.getElementById('fromCoin').addEventListener('change', estimate);
document.getElementById('toCoin').addEventListener('change', estimate);

document.getElementById('sim').addEventListener('click', ()=>{
  estimate();
  alert(document.getElementById('estimate').innerText);
});

document.getElementById('exec').addEventListener('click', ()=>{
  estimate();
  alert('Демо: транзакція виконана (симуляція)');
});
