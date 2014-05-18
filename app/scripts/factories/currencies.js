angular.module("pizza_comparer.factories.currencies", [])
    .service("currencies", function () {
        return [
            { code: "PLN", symbol:"zł", name: "złoty", precision: 2, step: "0.01" },
            { code: "GBP", symbol:"£", name: "funt szterling", precision: 2, step: "0.01" },
            { code: "USD", symbol:"$", name: "dolar amerykański", precision: 2, step: "0.01" },
            { code: "EUR", symbol:"€", name: "euro", precision: 2, step: "0.01" },
            { code: "CHF", symbol:"CHF", name: "frank szwajcarski", precision: 2, step: "0.01" },
            { code: "CZK", symbol:"Kč", name: "korona czeska", precision: 2, step: "0.01" },
            { code: "HRK", symbol:"kn", name: "kuna chorwacka", precision: 2, step: "0.01" },
            { code: "RON", symbol:"RON", name: "lej rumuński", precision: 2, step: "0.01" },
            { code: "BGN", symbol:"лв.", name: "lew bułgarski", precision: 2, step: "0.01" },
            { code: "RUB", symbol:"руб.", name: "rubel rosyjski", precision: 2, step: "0.01" },
        ];
    });