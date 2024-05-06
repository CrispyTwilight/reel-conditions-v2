using Newtonsoft.Json;


namespace ReelConditions.Forms
{
    public partial class DashboardForm : Form
    {
        private SettingsService settingsService = new SettingsService();
        // Default location
        string location = "Minneapolis";
        private string temperatureUnit;
        private string distanceUnit;
        private WeatherData currentWeatherData;

        private const string ApiKey = "ede1c07826fd5a930a9584f681af8618";
        private const string BaseUrl = "http://api.openweathermap.org/data/2.5/weather";

        public DashboardForm()
        {
            InitializeComponent();

            //Attach event handlers
            this.Load += new System.EventHandler(this.DashboardForm_Load);
            gmapControl.MouseClick += new MouseEventHandler(gmapControl_MouseClick);
        }

        // Load the settings (if any) from the Settings.json file. This will be the first thing that happens when the app is opened.
        private void DashboardForm_Load(object sender, EventArgs e)
        {
            var settings = settingsService.LoadSettings();
            temperatureUnit = settings["TemperatureUnit"];
            distanceUnit = settings["DistanceUnit"];

            // Now you can get the weather data
            getWeatherData(location);

            //Set the map to Google Satellite view
            gmapControl.MapProvider = GMap.NET.MapProviders.GoogleSatelliteMapProvider.Instance;
            GMap.NET.GMaps.Instance.Mode = GMap.NET.AccessMode.ServerOnly;

            //Set the initial position
            gmapControl.Position = new GMap.NET.PointLatLng(43.373266, -95.137348);

            //Configure the zoom settings
            gmapControl.MinZoom = 5;
            gmapControl.MaxZoom = 20;  //Higher zoom level for better satellite details
            gmapControl.Zoom = 10;
            gmapControl.CanDragMap = true;
            gmapControl.DragButton = MouseButtons.Left;
        }

        private void settingsButton_Click(object sender, EventArgs e)
        {
            SettingsForm settingsForm = new SettingsForm();
            // Only update the settings if the user clicks OK on the SettingsForm dialog
            if (settingsForm.ShowDialog() == DialogResult.OK)
            {
                // Get the new settings from the SettingsForm
                temperatureUnit = settingsForm.selectedTemperatureUnit;
                distanceUnit = settingsForm.selectedDistanceUnit;

                // Update the UI
                UpdateUI(currentWeatherData);
            }
        }

        private void searchButton_Click(object sender, EventArgs e)
        {
            // Get the location from the search box and trim whitespace
            string location = searchTextBox.Text.Trim().ToLower();

            // If the search box is not empty, get the weather data for the location
            if (!string.IsNullOrEmpty(location))
            {
                getWeatherData(location);
            }
        }

        private void savedLocationsButton_Click(object sender, EventArgs e)
        {
            // Get the saved locations
            // TODO: Replace this with actual code to get the saved locations
            List<string> savedLocations = new List<string> { "Minneapolis", "New York", "Los Angeles" };

            // Create a new SavedLocationsForm and show it as a modal dialog
            SavedLocationsForm savedLocationsForm = new SavedLocationsForm(savedLocations);
            if (savedLocationsForm.ShowDialog() == DialogResult.OK)
            {
                // If the user clicked the Load Location button, get the selected location and update the weather data
                string selectedLocation = savedLocationsForm.SelectedLocation;
                getWeatherData(selectedLocation);
            }
        }

        private void saveNotesButton_Click(object sender, EventArgs e)
        {
            //TODO: Implement save notes functionality. This will need to save notes for the current location. Consider a json file for saving.
            // The notes are specific to the location, so we will need to save them together. This will be the list used in the saved locations form.
        }

        private async void getWeatherData(string location)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    // By default, the units are imperial
                    string url = $"{BaseUrl}?q={location}&appid={ApiKey}&units=imperial";
                    HttpResponseMessage response = await client.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        WeatherData? weatherData = JsonConvert.DeserializeObject<WeatherData>(json);

                        // Check if weatherData is not null before accessing its properties
                        if (weatherData != null)
                        {
                            // Convert and store the wind direction
                            weatherData.Wind.Dir = ConvertWindDirection(weatherData.Wind.Deg);

                            // Update the current weather data and the UI
                            currentWeatherData = weatherData;
                            UpdateUI(currentWeatherData);
                        }
                    }
                    else
                    {
                        MessageBox.Show($"Request failed with status code: {response.StatusCode} \nPlease check the city spelling.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
            // Catch any exceptions that occur during the fetch - could be a network error or a parsing error
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        // Update the UI and get conversions all in one method
        private void UpdateUI(WeatherData weatherData)
        {
            locationLabel.Text = weatherData.Name;
            conditionsValueLabel.Text = weatherData.Weather[0].Main + " - " + weatherData.Weather[0].Description;
            temperatureValueLabel.Text = GetConvertedTemperature(weatherData.Main.Temp).ToString() + " " + GetTemperatureLabel();
            windSpeedValueLabel.Text = GetConvertedDistance(weatherData.Wind.Speed).ToString() + " " + GetSpeedLabel();
            windDirectionValueLabel.Text = weatherData.Wind.Dir;
            humidityValueLabel.Text = weatherData.Main.Humidity.ToString() + " %";
            pressureValueLabel.Text = GetConvertedPressure(weatherData.Main.Pressure).ToString() + " " + GetPressureLabel();
        }

        private float GetConvertedTemperature(float temperature)
        {
            if (temperatureUnit == "metric")
            {
                return MathF.Round((temperature - 32) * 5 / 9, 0);
            }
            else
            {
                return MathF.Round(temperature, 0);
            }
        }

        private float GetConvertedDistance(float distance)
        {
            if (distanceUnit == "metric")
            {
                return MathF.Round(distance * 0.621371F, 2);
            }
            else
            {
                return MathF.Round(distance, 2);
            }
        }

        // The pressure always comes in hPa, so convert to inHg if needed
        private float GetConvertedPressure(float pressure)
        {
            if (temperatureUnit == "imperial")
            {
                return MathF.Round(pressure * 0.02953F, 2);
            }
            else
            {
                return MathF.Round(pressure, 2);
            }
        }

        private static string ConvertWindDirection(double degrees)
        {
            string[] directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N" };
            return directions[(int)Math.Round(((degrees % 360) / 45))];
        }

        private string GetTemperatureLabel()
        {
            switch (temperatureUnit)
            {
                case "metric":
                    return "°C";
                case "imperial":
                    return "°F";
                default:
                    return "";
            }
        }

        private string GetSpeedLabel()
        {
            switch (distanceUnit)
            {
                case "metric":
                    return "m/sec";
                case "imperial":
                    return "mph";
                default:
                    return "";
            }
        }

        private string GetPressureLabel()
        {
            switch (temperatureUnit)
            {
                case "metric":
                    return "hPa";
                case "imperial":
                    return "inHg";
                default:
                    return "";
            }
        }

        private void AddMarker(double lat, double lng, string tooltipText)
        {
            var markersOverlay = new GMap.NET.WindowsForms.GMapOverlay("markers");
            var marker = new GMap.NET.WindowsForms.Markers.GMarkerGoogle(
                new GMap.NET.PointLatLng(lat, lng),
                GMap.NET.WindowsForms.Markers.GMarkerGoogleType.red_dot);

            marker.ToolTipText = tooltipText;
            markersOverlay.Markers.Add(marker);
            gmapControl.Overlays.Add(markersOverlay);
        }

        private void gmapControl_MouseClick(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Right) //Checks if the left mouse button was clicked
            {
                var point = gmapControl.FromLocalToLatLng(e.X, e.Y);
                double lat = point.Lat;
                double lng = point.Lng;

                //Add a marker at the clicked location
                AddMarker(lat, lng, "New Marker");

                Console.WriteLine($"Latitude: {lat}, Longitude: {lng}");
            }
        }
    }
}
