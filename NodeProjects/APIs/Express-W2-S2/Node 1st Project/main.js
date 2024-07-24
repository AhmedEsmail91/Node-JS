fetch('https://localhost:3000/products/1')
            .then(response => response.json())
            .then(json => console.log(json))