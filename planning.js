document.addEventListener('DOMContentLoaded', function () {
    // Example city data
    var cities;

    // Function to update the city information
    function updateCityInformation(city, selectedDays) {
        var cityNameElement = document.querySelector('section h4');
        var budgetElement = document.querySelector('.budget');
        var budList = document.querySelector('.Bud');
        var imgElement = document.querySelector('section img');

        cityNameElement.textContent = city.name;

        // Calculate the new budget based on selected days
        var newBudget = city.budget * selectedDays;
        budgetElement.textContent = 'Estimated budget: ($' + newBudget + ')';

        budList.innerHTML = `<li>Food ($${city.foodCost * selectedDays})</li>
                            <li>Accommodation ($${city.accomodationCost * selectedDays})</li>
                            <li>Transportation ($${city.transportationCost * selectedDays})</li>`;
        imgElement.src = 'assets/' + city.name.toLowerCase() + '.png';
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
                var selectedDays = parseInt(document.querySelector('input[name="filter"]:checked').value);
                updateCityInformation(sortedCities[0], selectedDays);
            }
        });
    });

    // Fetch city data from JSON file
    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            cities = data;

            // Event listener for radio buttons
            var radioButtons = document.getElementsByName('filter');
            radioButtons.forEach(function (radioButton) {
                radioButton.addEventListener('change', function () {
                    var selectedDays = parseInt(this.value);

                    // Check if cities data is available
                    if (cities) {
                        // Update city information with the first city in the sorted list
                        var sortedCities = cities.slice().sort((a, b) => a.budget - b.budget);
                        if (sortedCities.length > 0) {
                            updateCityInformation(sortedCities[0], selectedDays);
                        }
                    }
                });
            });

            // Default to 1 day
            radioButtons[0].checked = true;
        })
        .catch(error => console.error('Error fetching city data:', error));
});