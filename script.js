document.addEventListener("DOMContentLoaded", () => {
    const carPartsData = {
        "Engine": {
            "Low": {
                "lvl 1": 0.10,
                "lvl 2": 0.20,
                "lvl 3": 0.30,
                "lvl 4": 0.40
            },
            "Medium": {
                "lvl 1": 0.15,
                "lvl 2": 0.30,
                "lvl 3": 0.45,
                "lvl 4": 0.60
            },
            "High": {
                "lvl 1": 0.20,
                "lvl 2": 0.40,
                "lvl 3": 0.60,
                "lvl 4": 0.80
            }
        },
        "Brakes": {
            "Low": {
                "lvl 1": 0.025,
                "lvl 2": 0.05,
                "lvl 3": 0.075,
                "lvl 4": 0.000   
            },
            "Medium": {
                "lvl 1": 0.375,
                "lvl 2": 0.75,
                "lvl 3": 1.125,
                "lvl 4": 0.000
            }
            "High": {
                "lvl 1": 0.05,
                "lvl 2": 0.10,
                "lvl 3": 0.15,
                "lvl 4": 0.000   
            }
        },
        "Suspension": {
            "Low": {
                "lvl 1": 0.15,
                "lvl 2": 0.05,
                "lvl 3": 0.45,
                "lvl 4": 0.06
            },
            "Medium": {
                "lvl 1": 0.225,
                "lvl 2": 0.45,
                "lvl 3": 0.675,
                "lvl 4": 0.09
            },
            "High": {
                "lvl 1": 0.03,
                "lvl 2": 0.06,
                "lvl 3": 0.09,
                "lvl 4": 1.2
            }
        },
        "Transmission": {
            "Low": {
                "lvl 1": 0.02,
                "lvl 2": 0.04,
                "lvl 3": 0.06,
                "lvl 4": 0.000
            },
            "Medium": {
                "lvl 1": 0.03,
                "lvl 2": 0.06,
                "lvl 3": 0.09,
                "lvl 4": 0.000
            },
            "High": {
                "lvl 1": 0.04,
                "lvl 2": 0.08,
                "lvl 3": 1.2,
                "lvl 4": 0.000
            }
        }
    };

    const carPartsDropdowns = [
        "carParts1",
        "carParts2",
        "carParts3",
        "carParts4"
    ];

    const levelsDropdowns = [
        "levels1",
        "levels2",
        "levels3",
        "levels4"
    ];

    const priceSpans = [
        "carPartPrice1",
        "carPartPrice2",
        "carPartPrice3",
        "carPartPrice4"
    ];

    const carPriceInput = document.getElementById("carPrice");
    const choosePriceDropdown = document.getElementById("choosePrice");
    const driftKitCheckbox = document.getElementById("driftKit");

    // Add event listeners to dropdowns
    carPartsDropdowns.forEach((carPartId, index) => {
        document.getElementById(carPartId).addEventListener("change", () => updatePrice(index + 1));
        document.getElementById(levelsDropdowns[index]).addEventListener("change", () => updatePrice(index + 1));
    });

    // Add event listener to checkbox
    driftKitCheckbox.addEventListener("change", updateAllPrices);

    function updatePrice(index) {
        const carPrice = parseFloat(carPriceInput.value);
        const choosePrice = choosePriceDropdown.value;
        const carPart = document.getElementById(`carParts${index}`).value;
        const level = document.getElementById(`levels${index}`).value;

        if (isNaN(carPrice) || !choosePrice || !carPart || !level) {
            document.getElementById(`carPartPrice${index}`).textContent = '';
            return;
        }

        const partData = carPartsData[carPart][choosePrice];
        if (!partData || !partData[level]) {
            document.getElementById(`carPartPrice${index}`).textContent = `No data available for ${carPart} at ${choosePrice} and ${level}.`;
            return;
        }

        const percentage = partData[level];
        const partPrice = carPrice * percentage;

        document.getElementById(`carPartPrice${index}`).textContent = `$${partPrice.toFixed(2)}`;

        // Update total price whenever a part price changes
        updateTotalPrice();
    }

    function updateAllPrices() {
        carPartsDropdowns.forEach((_, index) => {
            updatePrice(index + 1);
        });

        updateTotalPrice();
    }

    function updateTotalPrice() {
        let totalPrice = 0;

        // Calculate total price based on selected car parts
        priceSpans.forEach((priceSpanId, index) => {
            const priceSpan = document.getElementById(priceSpanId);
            if (priceSpan.textContent !== '' && !priceSpan.textContent.includes("No data")) {
                totalPrice += parseFloat(priceSpan.textContent.replace("$", ""));
            }
        });

        // Add drift kit cost if checkbox is checked
        if (driftKitCheckbox.checked) {]
            const carPrice = parseFloat(carPriceInput.value);
            if (!isNaN(carPrice)) {
                totalPrice += carPrice * 0.5; // Drift Kit cost is 50% of the car's price
            }
        }

        // Display the total price
        document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
    }

    carPriceInput.addEventListener("input", updateAllPrices);
    choosePriceDropdown.addEventListener("change", updateAllPrices);

    // Initial display
    updateAllPrices();
});
