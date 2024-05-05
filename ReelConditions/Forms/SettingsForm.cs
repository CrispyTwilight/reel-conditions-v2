namespace ReelConditions.Forms
{
    public partial class SettingsForm : Form
    {
        public SettingsForm()
        {
            InitializeComponent();
        }

        private void exitButton_Click(object sender, EventArgs e)
        {
            //Show a warning message box that the settings will not be saved
            DialogResult dialogResult = MessageBox.Show("Are you sure you want to exit? Your settings will not be saved.", "Warning", MessageBoxButtons.YesNo);
            this.Close();
        }

        private void exportDataButton_Click(object sender, EventArgs e)
        {
            // TODO: Export the app data to a CSV or json file. This will be the list of saved locations and notes.

        }

        private void saveButton_Click(object sender, EventArgs e)
        {
            // Save the settings to a file and send the settings back to the dashboard form

            // Logic to switch between metric and imperial units

            // Show a message box that the settings have been saved
            MessageBox.Show("Settings have been saved.", "Success");

            // Close the form
            this.Close();
        }
    }
}
