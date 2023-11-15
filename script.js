document.addEventListener('DOMContentLoaded', function () {
    var selectElement = document.querySelector('select');

    selectElement.addEventListener('change', function () {
        var selectedDays = parseInt(selectElement.value);

        if (!isNaN(selectedDays)) {
            var originalBudget = 191;
            var newBudget = originalBudget * selectedDays;

            var budgetElement = document.querySelector('.budget');
            budgetElement.textContent = 'Estimated budget: ($' + newBudget + ')';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Example city data
    var cities = [
        { name: 'London', budget: 191, foodCost: 60, accomodationCost: 71, transportationCost: 60 },
        { name: 'Beijing', budget: 134, foodCost: 37, accomodationCost: 55, transportationCost: 42 },
        { name: 'Berlin', budget: 207, foodCost: 55, accomodationCost: 86, transportationCost: 66 },
        { name: 'Tokyo', budget: 156, foodCost: 49, accomodationCost: 60, transportationCost: 47 },
        { name: 'Dubai', budget: 291, foodCost: 84, accomodationCost: 113, transportationCost: 94 }
    ];

    // Function to update the city information
    function updateCityInformation(city) {
        var cityNameElement = document.querySelector('section h4');
        var budgetElement = document.querySelector('.budget');
        var budList = document.querySelector('.Bud');
        var imgElement = document.querySelector('section img');

        cityNameElement.textContent = city.name;
        budgetElement.textContent = 'Estimated budget: ($' + city.budget + ')';
        budList.innerHTML = `<li>Food ($${city.foodCost})</li>
                            <li>Accommodation ($${city.accomodationCost})</li>
                            <li>Transportation ($${city.transportationCost})</li>`;
        imgElement.src = 'assets/' + city.name.toLowerCase() + '.jpg';
}

    // Event listener for the sort options
    var sortOptions = document.querySelectorAll('.Sort');
    sortOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            var sortBy = option.textContent.trim();
            var sortedCities;

            switch (sortBy) {
                case 'Accomodation cost':
                    sortedCities = cities.slice().sort((a, b) => a.accomodationCost - b.accomodationCost);
                    break;
                case 'Food cost':
                    sortedCities = cities.slice().sort((a, b) => a.foodCost - b.foodCost);
                    break;
                case 'Transportation cost':
                    sortedCities = cities.slice().sort((a, b) => a.transportationCost - b.transportationCost);
                    break;
                default:
                    // Default to sorting by estimated budget
                    sortedCities = cities.slice().sort((a, b) => a.budget - b.budget);
                    break;
            }

            // Update city information with the first city in the sorted list
            if (sortedCities.length > 0) {
                updateCityInformation(sortedCities[0]);
            }
        });
    });
});
