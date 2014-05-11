angular.module("pizza_comparer.factories.units", [])
    .service("units", function () {
        return [
            { code: "inch", name: "cal" },
            { code: "m", name: "metr" },
            { code: "cm", name: "centymetr" }
        ];
    });