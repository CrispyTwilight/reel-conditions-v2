namespace ReelConditions.Forms
{
    public partial class DashboardForm : Form
    {
        public DashboardForm()
        {
            InitializeComponent();
        }

        private void settingsButton_Click(object sender, EventArgs e)
        {
            // Show the settings form. The settings will need to come back to this form to be saved.
            new SettingsForm().ShowDialog();
        }

        private void searchButton_Click(object sender, EventArgs e)
        {
            // TODO: Implement search functionality
            // Needs to be a typical map search with a search bar and a map that updates with the search results.
        }

        private void savedLocationsButton_Click(object sender, EventArgs e)
        {
            // TODO: Implement saved locations functionality. Maybe another form?
        }

        private void saveNotesButton_Click(object sender, EventArgs e)
        {
            //TODO: Implement save notes functionality. This will need to save notes for the current location. Consider a json file for saving.
            // The notes are specific to the location, so we will need to save them together. This will be the list used in the saved locations form.
        }
    }
}
