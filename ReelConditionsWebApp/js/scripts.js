// Auth: John O'Neal
// Date: 05/06/2024
// Desc: This is the main script file for the Reel Conditions Web App.

document.addEventListener('DOMContentLoaded', (event) => {
    // This key is for the OpenWeatherMap API. Please replace it with your own key if you plan to use this code.
    const ApiKey = "ede1c07826fd5a930a9584f681af8618";
    const BaseWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
    // Define the default location and units
    var location = "okoboji"
    var units = "imperial";

    // Initialize the UI elements with the default location and units
    function load(location) {
        getWeatherDataAndUpdateUI(location);
    }

    // Call the load function with defaults
    load(location);

    // Define Sidebar object - This controls how the left sidebar behaves
    const sidebarController = {
        sidebarOpen: false,
        sidebar: document.getElementById('leftSidebar'),
        openButton: document.getElementById('openButton'),
        closeButton: document.getElementById('leftCloseButton'),

        init: function () {
            this.openButton.addEventListener('click', this.openSidebar.bind(this));
            this.closeButton.addEventListener('click', this.closeSidebar.bind(this));
        },

        openSidebar: function () {
            if (!this.sidebarOpen) {
                this.sidebar.classList.add('left-sidebar-responsive');
                this.closeButton.style.display = 'block';
                this.sidebarOpen = true;
            }
        },

        closeSidebar: function () {
            if (this.sidebarOpen) {
                this.sidebar.classList.remove('left-sidebar-responsive');
                this.closeButton.style.display = 'none';
                this.sidebarOpen = false;
            }
        }
    };

    // Define Modal object - This controls how the settings modal behaves
    const modalController = {
        modal: document.getElementById('settingsModal'),
        closeButton: document.getElementById('modalClose'),
        settingsButton: document.getElementById('settingsButton'),

        init: function () {
            this.settingsButton.addEventListener('click', this.openModal.bind(this));
            this.closeButton.addEventListener('click', this.closeModal.bind(this));
            document.addEventListener('click', this.clickOutsideModal.bind(this));
        },

        openModal: function () {
            this.modal.style.display = 'block';
        },

        closeModal: function () {
            // Set the units to the selected value
            units = document.querySelector('input[name="units"]:checked').value;
            getWeatherDataAndUpdateUI(location) // Update the UI with the new units
            this.modal.style.display = 'none';
        },

        clickOutsideModal: function (event) {
            if (event.target === this.modal) {
                this.closeModal();
            }
        }
    };

    // Define search handler object - This controls the search functionality
    const searchHandler = {
        init: function () {
            this.searchButton = document.getElementById('searchButton');
            this.searchInput = document.getElementById('searchInput');
            this.searchButton.addEventListener('click', this.handleSearch.bind(this));
            this.searchInput.addEventListener('keyup', this.handleKeyPress.bind(this));
        },

        handleSearch: function () {
            location = searchInput.value.trim().toLowerCase();
            if (location === "") {
                alert("Please enter a correct city name to search for weather data.");
                return;
            }
            getWeatherDataAndUpdateUI(location);
            // Clear the notes text area when a new location is searched
            document.getElementById('notesTextArea').value = "";
        },

        // Handle the Enter key press event
        handleKeyPress: function (event) {
            if (event.key === 'Enter') {
                this.handleSearch();
            }
        }
    };

    const locationManager = {
        // Define the locations array to temp store the location and notes
        locations: [],

        // Initialize the location manager
        init: function () {
            const saveButton = document.getElementById('saveButton');
            const listLocations = document.getElementById('listLocations');
            saveButton.addEventListener('click', this.saveLocationAndNotes.bind(this));
            listLocations.addEventListener('change', this.updateNotes.bind(this));
            this.checkForUnsavedData();

            // Load locations from local storage. This will be auto called when the page loads
            const savedLocations = localStorage.getItem('locations');
            if (savedLocations) {
                this.locations = JSON.parse(savedLocations);
                this.locations.forEach(location => {
                    const newOption = document.createElement('option');
                    newOption.textContent = location.location;
                    newOption.value = location.location;
                    listLocations.appendChild(newOption);
                });
            }
        },

        // Save the location and notes to local storage in the browser
        saveLocationAndNotes: function () {
            // Get the select element and input field
            const listLocations = document.getElementById('listLocations');
            const notesTextArea = document.getElementById('notesTextArea');

            if (location === "" || notesTextArea.value === "") {
                alert("Please enter a location and note to save.");
                return;
            }

            // Check if the location already exists in the locations array
            const existingLocation = this.locations.find(loc => loc.location === location);

            if (existingLocation) {
                // If the location already exists, update the notes
                existingLocation.notes = notesTextArea.value;
            } else {
                // If the location doesn't exist, add a new location and notes
                this.locations.push({
                    location: location,
                    notes: notesTextArea.value
                });

                // Create a new option element, set its text content and value, then append it to the select element
                const newOption = document.createElement('option');
                newOption.textContent = location;
                newOption.value = location;
                listLocations.appendChild(newOption);
            }

            // Save the locations array to local storage
            localStorage.setItem('locations', JSON.stringify(this.locations));

            alert("Location and notes successfully saved to localstorage!");
            this.checkForUnsavedData();
        },

        // Check if there are any unsaved locations in the locations array and display a message
        checkForUnsavedData: function () {
            const unsavedDataBanner = document.getElementById('unsavedDataBanner');
            if (this.locations.length > 0) {
                unsavedDataBanner.style.display = 'block';
            } else {
                unsavedDataBanner.style.display = 'none';
            }
        },

        // Update the notes text area when a location is selected from the list
        updateNotes: function () {
            // Get the select element and input field
            const listLocations = document.getElementById('listLocations');
            const notesTextArea = document.getElementById('notesTextArea');
    
            // Get the selected location
            const selectedLocation = listLocations.value;
    
            // Find the corresponding location in the locations array
            const location = this.locations.find(loc => loc.location === selectedLocation);
    
            // Update the notes text area
            if (location) {
                notesTextArea.value = location.notes;
            } else {
                notesTextArea.value = '';
            }
        }
    };

    // Define export controller object - This controls the export functionality
    const exportController = {
        init: function () {
            const exportButton = document.getElementById('exportButton');
            exportButton.addEventListener('click', this.exportData.bind(this));
        },

        exportData: function () {
            // Create a JSON string from the locations array
            const jsonString = JSON.stringify(locationManager.locations);

            // Create a new Blob object from the JSON string
            const blob = new Blob([jsonString], { type: "application/json" });

            // Create a link element
            const link = document.createElement('a');

            // Set the href and download attributes of the link
            link.href = URL.createObjectURL(blob);
            link.download = 'saved-locations.json';

            // Append the link to the body, click it, and then remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clear the locations array to prevent the unsaved data prompt
            locationManager.locations = [];
        }
    };

    // Define import controller object - This controls the import functionality
    const importController = {
        init: function () {
            const importButton = document.getElementById('importButton');
            importButton.addEventListener('click', this.importData.bind(this));
        },

        importData: function () {
            // Create an input element of type file
            const inputElement = document.createElement('input');
            inputElement.type = 'file';

            // Set the onchange event handler for the input element
            inputElement.onchange = function (event) {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = function (event) {
                    const importedData = JSON.parse(event.target.result);
                    importedData.forEach(location => {
                        locationManager.locations.push(location);
                        const newOption = document.createElement('option');
                        newOption.textContent = location.location;
                        newOption.value = location.location;
                        listLocations.appendChild(newOption);
                    });

                    localStorage.setItem('locations', JSON.stringify(locationManager.locations));
                    alert("Data successfully imported and saved to local storage!");
                };

                reader.readAsText(file);
            };

            // Click the input element to open the file dialog
            inputElement.click();
        }
    };

    // Function to get the weather data from the API and update the UI
    async function getWeatherDataAndUpdateUI(location) {
        try {
            const url = `${BaseWeatherUrl}?q=${location}&appid=${ApiKey}&units=${units}`;
            const response = await fetch(url);

            if (response.ok) {
                const weatherData = await response.json();

                // Check if weatherData is not null before accessing its properties
                if (weatherData) {
                    // Update the UI directly with parsed values from the JSON response
                    locationLabel.textContent = weatherData.name;
                    timeLabel.textContent = getCurrentDateTime();
                    conditionsValueLabel.textContent = `${weatherData.weather[0].main}`;
                    temperatureValueLabel.textContent = `${weatherData.main.temp} ${getTemperatureLabel()}`;
                    windValueLabel.textContent = `${convertWindDirection(weatherData.wind.deg)} ${weatherData.wind.speed} ${getSpeedLabel()}`;
                    humidityValueLabel.textContent = `${weatherData.main.humidity} %`;
                    pressureValueLabel.textContent = `${getConvertedPressure(weatherData.main.pressure)} ${getPressureLabel()}`;
                }
            } else {
                // Handle non-200 status codes
                alert(`Request failed with status code: ${response.status}\nPlease check your city spelling.`);
            }
        } catch (error) {
            // Handle any exceptions that occur during the fetch - could be a network error or a parsing error
            alert(`An error occurred: ${error.message}`);
        }
    }

    // Function to get the current date and time in a human-readable format
    function getCurrentDateTime() {
        const currentDateTime = new Date();
        return currentDateTime.toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    // The pressure always comes in hPa, so convert to inHg if the units are imperial
    function getConvertedPressure(pressure) {
        if (units === "imperial") {
            return Math.round(pressure * 0.02953 * 100) / 100; // Round to 2 decimal places
        } else {
            return Math.round(pressure * 100) / 100; // Round to 2 decimal places
        }
    }

    function convertWindDirection(degrees) {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
        return directions[Math.round(((degrees % 360) / 45))];
    }

    function getTemperatureLabel() {
        switch (units) {
            case "metric":
                return "°C";
            case "imperial":
                return "°F";
            default:
                return "";
        }
    }

    function getSpeedLabel() {
        switch (units) {
            case "metric":
                return "m/sec";
            case "imperial":
                return "mph";
            default:
                return "";
        }
    }

    function getPressureLabel() {
        switch (units) {
            case "metric":
                return "hPa";
            case "imperial":
                return "inHg";
            default:
                return "";
        }
    }
    
    // Initialize all the controller objects
    sidebarController.init();
    modalController.init();
    searchHandler.init();
    locationManager.init();
    exportController.init();
    importController.init();
});