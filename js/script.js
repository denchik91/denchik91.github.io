'use strict';

const currency = document.querySelector('.currency'),
      inputUah = document.querySelector('#uah'),
      rate = document.querySelector('.rate'),
      symbol = document.querySelector('.symbol'),
      inputCurrency = document.querySelector('#currency');

const request = new XMLHttpRequest();

request.open('GET', 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
request.send();

request.addEventListener('load', () => {
    
    const data = JSON.parse(request.response);
    // console.log(data);

    function changeCurrency(item) {
        symbol.textContent = '';
        symbol.append(data[item].cc);
        rate.textContent = '';
        rate.append(data[item].rate);
        clearValue();
    }

    changeCurrency(25);

    function clearValue() {
        inputCurrency.value = '';
        inputUah.value = '';
    }
       
    function inputEvent(event) {

        function calcCurrency(item) {
            if(event === inputCurrency) {
                inputUah.value = (+inputCurrency.value * data[item].rate).toFixed(2);
            } else if(event === inputUah) {
                inputCurrency.value = (+inputUah.value / data[item].rate).toFixed(2);
            }

            if(event.value === '') {
                clearValue();
            }
        }

        currency.addEventListener('change', () => {
            if(currency.value === "1") {
                changeCurrency(25);                  
            } else if(currency.value === "2") {
                changeCurrency(32);
            } else if(currency.value === "3") {
                changeCurrency(24);
            }
        });

        
        event.addEventListener('input', () => {
            if(request.status === 200) {
                
                if(currency.value === "1") {
                    calcCurrency(25);
                } else if(currency.value === "2") {
                    calcCurrency(32);
                } else if(currency.value === "3") {
                    calcCurrency(24);
                }
 
            } else {
                event.value = 'Somthing wrong...';
            }
        });
    }

    inputEvent(inputCurrency);
    inputEvent(inputUah);
  
});


