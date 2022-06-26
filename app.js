const form = document.querySelector('#searchForm');
const res = document.querySelector(`#tableResult`)
const cont = document.getElementById("allContaint");
var upd;

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(upd){
        clearTimeout(upd);
    }

    const ctype = form.elements.coinType.value;
    const currencytyp = form.elements.currType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main'); 

    fetchPrice(ctype,currencytyp);
} );

const fetchPrice = async(ctype,currencytyp) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=${currencytyp}`)
    
    const price = r.data.coin.price;
    const name = r.data.coin.name;
    const priceChange1h = r.data.coin.priceChange1h;
    const priceChange1d = r.data.coin.priceChange1d;
    const rank = r.data.coin.rank;
    const marketCap = r.data.coin.marketCap;
    const volume = r.data.coin.volume;
    
    res.innerHTML = `
    <tr style = "background-color:#f6b60d"> 
    <td> <b>Property</b>  </td>
    <td> <b>Value</b>  (${currencytyp}) </td>
</tr>
<tr style = "background-color:#143d59; color:White">
    <td> ${name}  </td>
    <td style="color:#00FF00" ><b>${price} </b> </td>
</tr>
<tr style = "background-color:#143d59; color:White">
    <td> Volume  </td>
    <td>${volume}  </td>
</tr>
<tr style = "background-color:#143d59; color:White">
    <td> 1h Change  </td>
    <td>${priceChange1h}  </td>
</tr>
<tr style = "background-color:#143d59; color:White">
    <td> Market_Rank  </td>
    <td>${rank}  </td>
</tr>
`

upd = setTimeout(()=>fetchPrice(ctype,currencytyp),10000);

}