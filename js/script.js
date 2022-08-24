'use strict';

let currency = document.querySelector('.currency'),
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

    
    function inputEvent(event) {
        
        function calcCurrency(item) {                                   //function that calculates the exchange rate
            data.forEach((obj) => {
                if(obj.cc === item) {
                    
                    if(event === inputCurrency) {
                        inputUah.value = (event.value * obj.rate).toFixed(2);
                    } else if(event === inputUah) {
                        inputCurrency.value = (event.value / obj.rate).toFixed(2);
                    }

                    if(inputCurrency.value === '') {
                        inputUah.value = '';
                    } else if(inputUah.value === '') {
                        inputCurrency.value = '';
                    }

                    
                    if(event.value.length === 14) {
                        let exp = /.$/;
                        event.value = event.value.replace(exp, '');
                    }
                }  
            });
        }
        
        function changeCurrency(item) {             //function to display the current currency rate
            data.forEach((obj) => {
                if(obj.cc === item) {
                    symbol.textContent = '';
                    symbol.append(obj.cc);
                    rate.textContent = '';
                    rate.append(obj.rate);
                }
            });           
        }
    
        changeCurrency('USD');
        
        currency.addEventListener('change', () => {   //recalculation when changing currencies
            if(currency.value === "1") {
                changeCurrency('USD'); 
                calcCurrency('USD');              
            } else if(currency.value === "2") {
                changeCurrency('EUR');
                calcCurrency('EUR');
            } else if(currency.value === "3") {
                changeCurrency('GBP');
                calcCurrency('GBP');
            }

            
        });

        
        event.addEventListener('input', () => {       //update result on input
            if(request.status === 200) {
                     
                if(currency.value === "1") {
                    calcCurrency('USD');                  
                } else if(currency.value === "2") {
                    calcCurrency('EUR');
                } else if(currency.value === "3") {
                    calcCurrency('GBP');
                }
 
            } else {
                event.value = 'Somthing wrong...';
            }
        });
    }

    inputEvent(inputCurrency);
    inputEvent(inputUah);
  
});


