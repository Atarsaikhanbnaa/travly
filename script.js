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
