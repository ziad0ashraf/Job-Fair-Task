let nameInput=document.getElementById('nameInput')
let transactionInput=document.getElementById('transactionInput')
let dateInput=document.getElementById('dateInput')
let graph = document.getElementById('transactionChart');
let transaction
let customers
let chart
/* <><><><><><><><><Get Data From Json File><><><><><><><><> */

async function AllData() {
      let data=await fetch(`./js/data.json`) 
      response=await data.json()
        // console.log(response);
        transaction = response.transactions;
        customers = response.customers; 
        displayData(transaction)
        updateChart(transaction)
    }
    AllData()
    
/* <><><><><><><><><Display Data ><><><><><><><><> */

    function displayData(data) {
        let cartona=""
        data.forEach((transaction)=>{
             customer = customers.find(customers => customers.id == transaction.customer_id);
        cartona+=`
           <tr class="element">
                <td>${customer.name}</td>
                <td>${transaction.date}</td>
                <td>${transaction.amount}</td>
           </tr>
           `
        });
           document.getElementById('demo').innerHTML=cartona
    }

  /* <><><><><><><><><Display Data By Searching By Name><><><><><><><><> */

    function searchByName() {
        let cartona = "";
        transaction.forEach((transaction)=> {
             customer = customers.find(customer => customer.id === transaction.customer_id);
            if (customer.name.toLowerCase().includes(this.value.toLowerCase())) {
                cartona += `
                    <tr>
                        <td>${customer.name}</td>
                        <td>${transaction.date}</td>
                        <td>${transaction.amount}</td>
                    </tr>
                `;
            }
        });
        document.getElementById('demo').innerHTML = cartona;
    }
    nameInput.addEventListener('keyup',searchByName)

 /* <><><><><><><><><Display Data By Searching By Transaction Amount><><><><><><><><> */

    function searchByTransaction() {
        let cartona = "";
        transaction.forEach((transaction)=> {
             customer = customers.find(customer => customer.id === transaction.customer_id);
            if (transaction.amount>=this.value) {
                cartona += `
                    <tr>
                        <td>${customer.name}</td>
                        <td>${transaction.date}</td>
                        <td>${transaction.amount}</td>
                    </tr>
                `;
            }
        });
        document.getElementById('demo').innerHTML = cartona;
    }
    transactionInput.addEventListener('keyup', searchByTransaction);

/* <><><><><><><><><Display Data By Searching By Date><><><><><><><><> */

    function searchByDate() {
        let cartona = "";
        transaction.forEach((transaction)=> {
            let customer = customers.find(customer => customer.id === transaction.customer_id);
            if (transaction.date==this.value) {
                cartona += `
                    <tr>
                        <td>${customer.name}</td>
                        <td>${transaction.date}</td>
                        <td>${transaction.amount}</td>
                    </tr>
                `;
            }
        });
        document.getElementById('demo').innerHTML = cartona;
    }
    dateInput.addEventListener('keyup', searchByDate);

/* <><><><><><><><><Display Data By Graph><><><><><><><><> */

    function updateChart() {    
        let x = transaction.map((transaction) => transaction.date);
        let y = transaction.map((transaction) => transaction.amount);
    
        chart = new Chart(graph, {
            type: 'bar',
            data: {
                labels: x,
                datasets: [{
                    label: 'Transaction Amount',
                    data: y,
                    borderColor: '',
                    backgroundColor:'rgb(179, 14, 14,0.7)',
                    hoverBorderColor:'black',
                    hoverBorderWidth:5,
                    borderRadius: 10,
                    borderWidth:0,
                }]
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                    }
                }
            }
        });
    }    