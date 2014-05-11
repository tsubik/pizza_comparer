angular.module("pizza_comparer.factories.currencies", [])
    .service("currencies", function () {
        return [
            { code: "PLN", short:"zł", name: "złoty", precision: 2, step: "0.01" },
            { code: "GBP", short:"", name: "funt szterling", precision: 2, step: "0.01" },
            { code: "USD", short:"$", name: "dolar amerykański", precision: 2, step: "0.01" },
            { code: "EUR", short:"", name: "euro", precision: 2, step: "0.01" },
            { code: "CHF", short:"", name: "frank szwajcarski", precision: 2, step: "0.01" },
            { code: "CZK", short:"", name: "korona czeska", precision: 2, step: "0.01" },
            { code: "HRK", short:"", name: "kuna chorwacka", precision: 2, step: "0.01" },
            { code: "RON", short:"", name: "lej rumuński", precision: 2, step: "0.01" },
            { code: "BGN", short:"", name: "lew bułgarski", precision: 2, step: "0.01" },
            { code: "RUB", short:"", name: "rubel rosyjski", precision: 2, step: "0.01" },
        ];
    });