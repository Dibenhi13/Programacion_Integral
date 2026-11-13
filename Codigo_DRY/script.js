
var _ = document,
    Z = _.getElementById("q"),
    U = _.getElementById("u"),
    n = 0,
    D = "Cataratas del Iguazú|Misiones · Noreste|1f7a4d,4fb286|Pasarelas sobre la Garganta del Diablo;Paseo en lancha bajo los saltos;Selva paranaense|marzo a noviembre~Perito Moreno|Santa Cruz · Patagonia|2a6fa8,8fd0ee|Pasarelas frente al glaciar;Minitrekking sobre el hielo;Navegación en el Lago Argentino|octubre a abril~Buenos Aires|Capital · Región Pampeana|7a3b6e,c47aa8|Tango en San Telmo;Teatro Colón;Cementerio de la Recoleta y La Boca|marzo a mayo y septiembre a noviembre~Mendoza|Cuyo · Cordillera|8a2a3a,d1667a|Ruta del vino y bodegas;Aconcagua y alta montaña;Rafting en el río Mendoza|febrero a abril (vendimia)~Bariloche|Río Negro · Patagonia|365d8c,7fb1d6|Circuito Chico y lagos;Esquí en el Cerro Catedral;Chocolate artesanal|diciembre a marzo y julio a agosto~Ushuaia|Tierra del Fuego · Fin del mundo|2d3e55,6f8aa8|Canal Beagle y lobos marinos;Parque Nacional Tierra del Fuego;Tren del Fin del Mundo|noviembre a marzo~Quebrada de Humahuaca|Jujuy · Noroeste|b5532a,e8a15c|Cerro de los Siete Colores;Salinas Grandes;Pueblos como Purmamarca y Tilcara|marzo a octubre";

D.split("~")
    .map(function(s) {
        return s.split("|");
    })
    .forEach(function(a) {
        var N = a[0],
            R = a[1],
            C = a[2].split(","),
            L = a[3],
            M = a[4],
            t = _.createElement("article");

        t.className = "w";

        t.innerHTML =
            '<div class="x" style="background:linear-gradient(135deg,#' +
            C[0] + ',#' + C[1] + ')">' +
            N +
            '</div>' +
            '<div class="y">' +
            '<span class="z">' + R + '</span>' +
            '<ul>' +
            L.split(";").map(function(k) {
                return "<li>" + k + "</li>";
            }).join("") +
            '</ul>' +
            '<p class="v o">Mejor época para viajar: <strong>' +
            M +
            '</strong>.</p>' +
            '<button type="button">Ver mejor época</button>' +
            '</div>';

        var B = t.querySelector("button"),
            E = t.querySelector(".v");

        B.onclick = function() {
            B.textContent = E.classList.toggle("o")
                ? "Ver mejor época"
                : "Ocultar";
        };

        Z.appendChild(t);
        n++;

        U.textContent = "Todo en un solo archivo: " +
            n + " tarjetas generadas.";
    });
