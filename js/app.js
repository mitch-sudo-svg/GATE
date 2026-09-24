const propertiesGrid =
    document.getElementById("propertiesGrid");

const resultsCount =
    document.getElementById("resultsCount");



function formatPrice(price, operation) {

    const formatted =
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0
        }).format(price);


    if (operation === "renta") {

        return `${formatted} / mes`;

    }


    return formatted;

}



function renderProperties(list) {

    propertiesGrid.innerHTML = "";


    resultsCount.textContent =
        `${list.length} propiedades`;


    if (list.length === 0) {

        propertiesGrid.innerHTML = `

            <div class="no-results">

                <h3>
                    No encontramos propiedades.
                </h3>

                <p>
                    Intenta cambiar alguno de tus filtros.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(property => {

        const card =
            document.createElement("article");

        card.className =
            "property-card";


        card.innerHTML = `

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.title}"
                    loading="lazy"
                >

                <span class="property-tag">
                    ${property.operation === "venta"
                        ? "VENTA"
                        : "RENTA"}
                </span>

            </div>


            <div class="property-info">

                <p class="property-type">
                    ${property.type}
                </p>

                <h3>
                    ${property.title}
                </h3>

                <p class="property-zone">
                    📍 ${property.zone}
                </p>


                <strong class="property-price">

                    ${formatPrice(
                        property.price,
                        property.operation
                    )}

                </strong>


                <div class="property-details">

                    ${
                        property.bedrooms !== null
                        ? `<span>
                            🛏 ${property.bedrooms}
                          </span>`
                        : ""
                    }

                    ${
                        property.bathrooms !== null
                        ? `<span>
                            ◉ ${property.bathrooms}
                          </span>`
                        : ""
                    }

                    ${
                        property.construction
                        ? `<span>
                            📐 ${property.construction} m²
                          </span>`
                        : ""
                    }

                </div>


                <button
                    class="property-button"
                    onclick="viewProperty(${property.id})">

                    VER PROPIEDAD

                </button>

            </div>

        `;


        propertiesGrid.appendChild(card);

    });

}



function filterProperties() {

    const operation =
        document.getElementById(
            "operationFilter"
        ).value;


    const type =
        document.getElementById(
            "typeFilter"
        ).value;


    const zone =
        document.getElementById(
            "zoneFilter"
        ).value;


    const filtered =
        properties.filter(property => {


            const operationMatch =
                operation === "all" ||
                property.operation === operation;


            const typeMatch =
                type === "all" ||
                property.type === type;


            const zoneMatch =
                zone === "all" ||
                property.zone === zone;


            return (
                operationMatch &&
                typeMatch &&
                zoneMatch
            );

        });


    renderProperties(filtered);

}



function viewProperty(id) {

    const property =
        properties.find(
            item => item.id === id
        );


    if (!property) return;


    localStorage.setItem(
        "selectedProperty",
        JSON.stringify(property)
    );


    window.location.href =
        "propiedad.html";

}



renderProperties(properties);
