namespace ReelConditions.Forms
{
    public partial class SettingsForm : Form
    {
        // Declare the selected units as private fields
        public string selectedTemperatureUnit;
        public string selectedDistanceUnit;

        // Create an instance of the SettingsService
        private SettingsService settingsService = new SettingsService();

        // Add a field to track whether any radio button has been changed
        private bool radioButtonChanged = false;

        public SettingsForm()
        {
            InitializeComponent();
        }

        private void exitButton_Click(object sender, EventArgs e)
        {
            // Only show the warning message if a radio button has been changed
            if (radioButtonChanged)
            {
                DialogResult dialogResult = MessageBox.Show("Are you sure you want to exit? Your settings will not be saved.", "Warning", MessageBoxButtons.YesNo);

                if (dialogResult == DialogResult.Yes)
                {
                    this.Close();
                }
            }
            else
            {
                // If no radio button has been changed, just close the form
                this.Close();
            }
        }

        private void exportDataButton_Click(object sender, EventArgs e)
        {
            // TODO: Export the app data to a CSV or json file. This will be the list of saved locations and notes.
        }

        private void saveAndCloseButton_Click(object sender, EventArgs e)
        {
            var settings = new Dictionary<string, string>
            {
                { "TemperatureUnit", selectedTemperatureUnit },
                { "DistanceUnit", selectedDistanceUnit }
            };
            settingsService.SaveSettings(settings);

            // Show a message box that the settings have been saved
            MessageBox.Show("Settings have been saved.", "Success");

            // Close the form
            this.DialogResult = DialogResult.OK;
            this.Close();
        }
        private void metricTemperatureRadioButton_CheckedChanged(object sender, EventArgs e)
        {
            if (metricTemperatureRadioButton.Checked)
            {
                selectedTemperatureUnit = "metric";
                radioButtonChanged = true;
            }
        }

        private void imperialTemperatureRadioButton_CheckedChanged(object sender, EventArgs e)
        {
            if (imperialTemperatureRadioButton.Checked)
            {
                selectedTemperatureUnit = "imperial";
                radioButtonChanged = true;
            }
        }

        private void metricDistanceRadioButton_CheckedChanged(object sender, EventArgs e)
        {
            if (metricDistanceRadioButton.Checked)
            {
                selectedDistanceUnit = "metric";
                radioButtonChanged = true;
            }
        }

        private void imperialDistanceRadioButton_CheckedChanged(object sender, EventArgs e)
        {
            if (imperialDistanceRadioButton.Checked)
            {
                selectedDistanceUnit = "imperial";
                radioButtonChanged = true;
            }
        }

        private void SettingsForm_Load(object sender, EventArgs e)
        {
            var settings = settingsService.LoadSettings();
            selectedTemperatureUnit = settings["TemperatureUnit"];
            selectedDistanceUnit = settings["DistanceUnit"];

            metricTemperatureRadioButton.Checked = (selectedTemperatureUnit == "metric");
            imperialTemperatureRadioButton.Checked = (selectedTemperatureUnit == "imperial");
            metricDistanceRadioButton.Checked = (selectedDistanceUnit == "metric");
            imperialDistanceRadioButton.Checked = (selectedDistanceUnit == "imperial");
        }
    }
}
