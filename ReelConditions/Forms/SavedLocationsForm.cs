using Newtonsoft.Json;
namespace ReelConditions.Forms
{
    public partial class SavedLocationsForm : Form
    {
        public string SelectedLocation { get; private set; }

        public SavedLocationsForm(List<string> locations)
        {
            InitializeComponent();

            // Populate the ComboBox with the saved locations
            savedLocationsComboBox.Items.AddRange(locations.ToArray());
        }

        private void loadLocationButton_Click(object sender, EventArgs e)
        {

            // If the entry does not exist, add it to the list
            if (!savedLocationsComboBox.Items.Contains(savedLocationsComboBox.Text))
            {
                savedLocationsComboBox.Items.Add(savedLocationsComboBox.Text);

                // Save the new list of locations
                var settings = new Dictionary<string, string>
                {
                    { "SavedLocations", JsonConvert.SerializeObject(savedLocationsComboBox.Items) }
                };

                //settingsService.SaveSettings(settings);

                // TODO: make an interface for the settings service

                // Set the selected location when the Load Location button is clicked
                SelectedLocation = savedLocationsComboBox.Text;

                //close the form
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
            else
            {
                // Set the selected location when the Load Location button is clicked

                SelectedLocation = savedLocationsComboBox.SelectedItem.ToString();

                //close the form
                this.DialogResult = DialogResult.OK;
                this.Close();
            }

        }

        private void exitButton_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
