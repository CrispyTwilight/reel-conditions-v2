namespace ReelConditions.Forms
{
    partial class DashboardForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(DashboardForm));
            rightSideBar = new Panel();
            buttonPanel = new Panel();
            savedLocationsButton = new Button();
            searchPanel = new Panel();
            searchTextBox = new TextBox();
            searchButton = new Button();
            settingsButton = new Button();
            logoPictureBox = new PictureBox();
            leftSidebarPanel = new Panel();
            notesPanel = new Panel();
            notesTextBox = new TextBox();
            notesLabel = new Label();
            saveNotesButton = new Button();
            fishingReportTextBox = new TextBox();
            fishingReportLabel = new Label();
            waterConditionsLabel = new Label();
            waterConditionsTableLayoutPanel = new TableLayoutPanel();
            waterTemperatureLabel = new Label();
            waterTemperatureValueLabel = new Label();
            clarityLabel = new Label();
            clarityValueLabel = new Label();
            weatherLabel = new Label();
            locationLabel = new Label();
            weathertableLayoutPanel = new TableLayoutPanel();
            airTemperatureLabel = new Label();
            temperatureValueLabel = new Label();
            conditionsLabel = new Label();
            conditionsValueLabel = new Label();
            windLabel = new Label();
            windValueLabel = new Label();
            mapPanel = new Panel();
            rightSideBar.SuspendLayout();
            buttonPanel.SuspendLayout();
            searchPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)logoPictureBox).BeginInit();
            leftSidebarPanel.SuspendLayout();
            notesPanel.SuspendLayout();
            waterConditionsTableLayoutPanel.SuspendLayout();
            weathertableLayoutPanel.SuspendLayout();
            SuspendLayout();
            // 
            // rightSideBar
            // 
            rightSideBar.BackColor = Color.FromArgb(130, 144, 119);
            rightSideBar.Controls.Add(buttonPanel);
            rightSideBar.Controls.Add(logoPictureBox);
            rightSideBar.Dock = DockStyle.Left;
            rightSideBar.Location = new Point(0, 0);
            rightSideBar.Margin = new Padding(4);
            rightSideBar.Name = "rightSideBar";
            rightSideBar.Size = new Size(257, 985);
            rightSideBar.TabIndex = 0;
            // 
            // buttonPanel
            // 
            buttonPanel.Controls.Add(savedLocationsButton);
            buttonPanel.Controls.Add(searchPanel);
            buttonPanel.Controls.Add(settingsButton);
            buttonPanel.Dock = DockStyle.Left;
            buttonPanel.Location = new Point(0, 125);
            buttonPanel.Name = "buttonPanel";
            buttonPanel.Size = new Size(257, 860);
            buttonPanel.TabIndex = 1;
            // 
            // savedLocationsButton
            // 
            savedLocationsButton.Dock = DockStyle.Top;
            savedLocationsButton.FlatAppearance.BorderSize = 0;
            savedLocationsButton.FlatStyle = FlatStyle.Flat;
            savedLocationsButton.Font = new Font("Segoe UI Light", 14F, FontStyle.Regular, GraphicsUnit.Point, 0);
            savedLocationsButton.Image = Properties.Resources.saved_locations_icon;
            savedLocationsButton.ImageAlign = ContentAlignment.MiddleLeft;
            savedLocationsButton.Location = new Point(0, 105);
            savedLocationsButton.Name = "savedLocationsButton";
            savedLocationsButton.Size = new Size(257, 41);
            savedLocationsButton.TabIndex = 4;
            savedLocationsButton.Text = "Saved &Locations";
            savedLocationsButton.UseVisualStyleBackColor = false;
            savedLocationsButton.Click += savedLocationsButton_Click;
            // 
            // searchPanel
            // 
            searchPanel.Controls.Add(searchTextBox);
            searchPanel.Controls.Add(searchButton);
            searchPanel.Dock = DockStyle.Top;
            searchPanel.Location = new Point(0, 0);
            searchPanel.Name = "searchPanel";
            searchPanel.Size = new Size(257, 105);
            searchPanel.TabIndex = 0;
            // 
            // searchTextBox
            // 
            searchTextBox.BackColor = Color.White;
            searchTextBox.BorderStyle = BorderStyle.FixedSingle;
            searchTextBox.Location = new Point(10, 17);
            searchTextBox.Name = "searchTextBox";
            searchTextBox.Size = new Size(237, 29);
            searchTextBox.TabIndex = 1;
            // 
            // searchButton
            // 
            searchButton.BackColor = Color.FromArgb(149, 187, 206);
            searchButton.FlatStyle = FlatStyle.Flat;
            searchButton.Font = new Font("Segoe UI Light", 14F);
            searchButton.Location = new Point(118, 52);
            searchButton.Name = "searchButton";
            searchButton.Size = new Size(129, 36);
            searchButton.TabIndex = 2;
            searchButton.Text = "S&earch";
            searchButton.UseVisualStyleBackColor = false;
            searchButton.Click += searchButton_Click;
            // 
            // settingsButton
            // 
            settingsButton.Dock = DockStyle.Bottom;
            settingsButton.FlatAppearance.BorderSize = 0;
            settingsButton.FlatStyle = FlatStyle.Flat;
            settingsButton.Font = new Font("Segoe UI Light", 14F);
            settingsButton.Image = Properties.Resources.settings_icon1;
            settingsButton.ImageAlign = ContentAlignment.MiddleLeft;
            settingsButton.Location = new Point(0, 819);
            settingsButton.Name = "settingsButton";
            settingsButton.Size = new Size(257, 41);
            settingsButton.TabIndex = 3;
            settingsButton.Text = "Se&ttings";
            settingsButton.UseVisualStyleBackColor = false;
            settingsButton.Click += settingsButton_Click;
            // 
            // logoPictureBox
            // 
            logoPictureBox.BackColor = Color.FromArgb(229, 229, 229);
            logoPictureBox.Dock = DockStyle.Top;
            logoPictureBox.Image = Properties.Resources.reel_conditions_logo_transparent;
            logoPictureBox.Location = new Point(0, 0);
            logoPictureBox.Name = "logoPictureBox";
            logoPictureBox.Size = new Size(257, 125);
            logoPictureBox.SizeMode = PictureBoxSizeMode.Zoom;
            logoPictureBox.TabIndex = 0;
            logoPictureBox.TabStop = false;
            // 
            // leftSidebarPanel
            // 
            leftSidebarPanel.BackColor = Color.FromArgb(229, 229, 229);
            leftSidebarPanel.Controls.Add(notesPanel);
            leftSidebarPanel.Controls.Add(fishingReportTextBox);
            leftSidebarPanel.Controls.Add(fishingReportLabel);
            leftSidebarPanel.Controls.Add(waterConditionsLabel);
            leftSidebarPanel.Controls.Add(waterConditionsTableLayoutPanel);
            leftSidebarPanel.Controls.Add(weatherLabel);
            leftSidebarPanel.Controls.Add(locationLabel);
            leftSidebarPanel.Controls.Add(weathertableLayoutPanel);
            leftSidebarPanel.Dock = DockStyle.Right;
            leftSidebarPanel.Location = new Point(1508, 0);
            leftSidebarPanel.Name = "leftSidebarPanel";
            leftSidebarPanel.Size = new Size(296, 985);
            leftSidebarPanel.TabIndex = 1;
            // 
            // notesPanel
            // 
            notesPanel.Controls.Add(notesTextBox);
            notesPanel.Controls.Add(notesLabel);
            notesPanel.Controls.Add(saveNotesButton);
            notesPanel.Dock = DockStyle.Bottom;
            notesPanel.Location = new Point(0, 681);
            notesPanel.Name = "notesPanel";
            notesPanel.Size = new Size(296, 304);
            notesPanel.TabIndex = 0;
            // 
            // notesTextBox
            // 
            notesTextBox.BackColor = Color.White;
            notesTextBox.BorderStyle = BorderStyle.FixedSingle;
            notesTextBox.Location = new Point(16, 38);
            notesTextBox.Multiline = true;
            notesTextBox.Name = "notesTextBox";
            notesTextBox.Size = new Size(265, 129);
            notesTextBox.TabIndex = 8;
            // 
            // notesLabel
            // 
            notesLabel.AutoSize = true;
            notesLabel.Font = new Font("Segoe UI Light", 18F);
            notesLabel.Location = new Point(19, 3);
            notesLabel.Name = "notesLabel";
            notesLabel.Size = new Size(72, 32);
            notesLabel.TabIndex = 10;
            notesLabel.Text = "Notes";
            // 
            // saveNotesButton
            // 
            saveNotesButton.BackColor = Color.FromArgb(149, 187, 206);
            saveNotesButton.FlatStyle = FlatStyle.Flat;
            saveNotesButton.Font = new Font("Segoe UI Light", 14F);
            saveNotesButton.Location = new Point(138, 253);
            saveNotesButton.Name = "saveNotesButton";
            saveNotesButton.Size = new Size(129, 36);
            saveNotesButton.TabIndex = 7;
            saveNotesButton.Text = "&Save Notes";
            saveNotesButton.UseVisualStyleBackColor = false;
            saveNotesButton.Click += saveNotesButton_Click;
            // 
            // fishingReportTextBox
            // 
            fishingReportTextBox.BackColor = Color.White;
            fishingReportTextBox.BorderStyle = BorderStyle.FixedSingle;
            fishingReportTextBox.Location = new Point(20, 385);
            fishingReportTextBox.Multiline = true;
            fishingReportTextBox.Name = "fishingReportTextBox";
            fishingReportTextBox.ReadOnly = true;
            fishingReportTextBox.Size = new Size(265, 194);
            fishingReportTextBox.TabIndex = 11;
            // 
            // fishingReportLabel
            // 
            fishingReportLabel.AutoSize = true;
            fishingReportLabel.Font = new Font("Segoe UI Light", 18F);
            fishingReportLabel.Location = new Point(20, 350);
            fishingReportLabel.Name = "fishingReportLabel";
            fishingReportLabel.Size = new Size(157, 32);
            fishingReportLabel.TabIndex = 9;
            fishingReportLabel.Text = "Fishing Report";
            // 
            // waterConditionsLabel
            // 
            waterConditionsLabel.AutoSize = true;
            waterConditionsLabel.Font = new Font("Segoe UI Light", 18F);
            waterConditionsLabel.Location = new Point(14, 216);
            waterConditionsLabel.Name = "waterConditionsLabel";
            waterConditionsLabel.Size = new Size(186, 32);
            waterConditionsLabel.TabIndex = 4;
            waterConditionsLabel.Text = "Water Conditions";
            // 
            // waterConditionsTableLayoutPanel
            // 
            waterConditionsTableLayoutPanel.ColumnCount = 2;
            waterConditionsTableLayoutPanel.ColumnStyles.Add(new ColumnStyle());
            waterConditionsTableLayoutPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
            waterConditionsTableLayoutPanel.Controls.Add(waterTemperatureLabel, 0, 0);
            waterConditionsTableLayoutPanel.Controls.Add(waterTemperatureValueLabel, 1, 0);
            waterConditionsTableLayoutPanel.Controls.Add(clarityLabel, 0, 1);
            waterConditionsTableLayoutPanel.Controls.Add(clarityValueLabel, 1, 1);
            waterConditionsTableLayoutPanel.Location = new Point(14, 251);
            waterConditionsTableLayoutPanel.Name = "waterConditionsTableLayoutPanel";
            waterConditionsTableLayoutPanel.RowCount = 3;
            waterConditionsTableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 22F));
            waterConditionsTableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 22F));
            waterConditionsTableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 20F));
            waterConditionsTableLayoutPanel.Size = new Size(265, 44);
            waterConditionsTableLayoutPanel.TabIndex = 6;
            // 
            // waterTemperatureLabel
            // 
            waterTemperatureLabel.AutoSize = true;
            waterTemperatureLabel.Location = new Point(3, 0);
            waterTemperatureLabel.Name = "waterTemperatureLabel";
            waterTemperatureLabel.Size = new Size(100, 21);
            waterTemperatureLabel.TabIndex = 0;
            waterTemperatureLabel.Text = "Temperature:";
            // 
            // waterTemperatureValueLabel
            // 
            waterTemperatureValueLabel.AutoSize = true;
            waterTemperatureValueLabel.Location = new Point(109, 0);
            waterTemperatureValueLabel.Name = "waterTemperatureValueLabel";
            waterTemperatureValueLabel.Size = new Size(109, 21);
            waterTemperatureValueLabel.TabIndex = 1;
            waterTemperatureValueLabel.Text = "<temp value>";
            // 
            // clarityLabel
            // 
            clarityLabel.AutoSize = true;
            clarityLabel.Location = new Point(3, 22);
            clarityLabel.Name = "clarityLabel";
            clarityLabel.Size = new Size(58, 21);
            clarityLabel.TabIndex = 2;
            clarityLabel.Text = "Clarity:";
            // 
            // clarityValueLabel
            // 
            clarityValueLabel.AutoSize = true;
            clarityValueLabel.Location = new Point(109, 22);
            clarityValueLabel.Name = "clarityValueLabel";
            clarityValueLabel.Size = new Size(74, 21);
            clarityValueLabel.TabIndex = 3;
            clarityValueLabel.Text = "<clarity>";
            // 
            // weatherLabel
            // 
            weatherLabel.AutoSize = true;
            weatherLabel.Font = new Font("Segoe UI Light", 18F);
            weatherLabel.Location = new Point(14, 67);
            weatherLabel.Name = "weatherLabel";
            weatherLabel.Size = new Size(98, 32);
            weatherLabel.TabIndex = 3;
            weatherLabel.Text = "Weather";
            // 
            // locationLabel
            // 
            locationLabel.AutoSize = true;
            locationLabel.Font = new Font("Segoe UI Light", 22F);
            locationLabel.Location = new Point(61, 11);
            locationLabel.Name = "locationLabel";
            locationLabel.Size = new Size(155, 41);
            locationLabel.TabIndex = 2;
            locationLabel.Text = "<location>";
            // 
            // weathertableLayoutPanel
            // 
            weathertableLayoutPanel.ColumnCount = 2;
            weathertableLayoutPanel.ColumnStyles.Add(new ColumnStyle());
            weathertableLayoutPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
            weathertableLayoutPanel.Controls.Add(airTemperatureLabel, 0, 0);
            weathertableLayoutPanel.Controls.Add(temperatureValueLabel, 1, 0);
            weathertableLayoutPanel.Controls.Add(conditionsLabel, 0, 1);
            weathertableLayoutPanel.Controls.Add(conditionsValueLabel, 1, 1);
            weathertableLayoutPanel.Controls.Add(windLabel, 0, 2);
            weathertableLayoutPanel.Controls.Add(windValueLabel, 1, 2);
            weathertableLayoutPanel.Location = new Point(14, 102);
            weathertableLayoutPanel.Name = "weathertableLayoutPanel";
            weathertableLayoutPanel.RowCount = 3;
            weathertableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 22F));
            weathertableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 22F));
            weathertableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 22F));
            weathertableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 20F));
            weathertableLayoutPanel.Size = new Size(265, 66);
            weathertableLayoutPanel.TabIndex = 1;
            // 
            // airTemperatureLabel
            // 
            airTemperatureLabel.AutoSize = true;
            airTemperatureLabel.Location = new Point(3, 0);
            airTemperatureLabel.Name = "airTemperatureLabel";
            airTemperatureLabel.Size = new Size(100, 21);
            airTemperatureLabel.TabIndex = 0;
            airTemperatureLabel.Text = "Temperature:";
            // 
            // temperatureValueLabel
            // 
            temperatureValueLabel.AutoSize = true;
            temperatureValueLabel.Location = new Point(109, 0);
            temperatureValueLabel.Name = "temperatureValueLabel";
            temperatureValueLabel.Size = new Size(109, 21);
            temperatureValueLabel.TabIndex = 1;
            temperatureValueLabel.Text = "<temp value>";
            // 
            // conditionsLabel
            // 
            conditionsLabel.AutoSize = true;
            conditionsLabel.Location = new Point(3, 22);
            conditionsLabel.Name = "conditionsLabel";
            conditionsLabel.Size = new Size(88, 21);
            conditionsLabel.TabIndex = 2;
            conditionsLabel.Text = "Conditions:";
            // 
            // conditionsValueLabel
            // 
            conditionsValueLabel.AutoSize = true;
            conditionsValueLabel.Location = new Point(109, 22);
            conditionsValueLabel.Name = "conditionsValueLabel";
            conditionsValueLabel.Size = new Size(104, 21);
            conditionsValueLabel.TabIndex = 3;
            conditionsValueLabel.Text = "<conditions>";
            // 
            // windLabel
            // 
            windLabel.AutoSize = true;
            windLabel.Location = new Point(3, 44);
            windLabel.Name = "windLabel";
            windLabel.Size = new Size(50, 21);
            windLabel.TabIndex = 4;
            windLabel.Text = "Wind:";
            // 
            // windValueLabel
            // 
            windValueLabel.AutoSize = true;
            windValueLabel.Location = new Point(109, 44);
            windValueLabel.Name = "windValueLabel";
            windValueLabel.Size = new Size(66, 21);
            windValueLabel.TabIndex = 5;
            windValueLabel.Text = "<wind>";
            // 
            // mapPanel
            // 
            mapPanel.Dock = DockStyle.Fill;
            mapPanel.Location = new Point(257, 0);
            mapPanel.Name = "mapPanel";
            mapPanel.Size = new Size(1251, 985);
            mapPanel.TabIndex = 2;
            // 
            // DashboardForm
            // 
            AcceptButton = saveNotesButton;
            AutoScaleDimensions = new SizeF(9F, 21F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.White;
            ClientSize = new Size(1804, 985);
            Controls.Add(mapPanel);
            Controls.Add(leftSidebarPanel);
            Controls.Add(rightSideBar);
            Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            ForeColor = Color.Black;
            FormBorderStyle = FormBorderStyle.FixedSingle;
            Icon = (Icon)resources.GetObject("$this.Icon");
            Margin = new Padding(4);
            Name = "DashboardForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Reel Conditions";
            rightSideBar.ResumeLayout(false);
            buttonPanel.ResumeLayout(false);
            searchPanel.ResumeLayout(false);
            searchPanel.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)logoPictureBox).EndInit();
            leftSidebarPanel.ResumeLayout(false);
            leftSidebarPanel.PerformLayout();
            notesPanel.ResumeLayout(false);
            notesPanel.PerformLayout();
            waterConditionsTableLayoutPanel.ResumeLayout(false);
            waterConditionsTableLayoutPanel.PerformLayout();
            weathertableLayoutPanel.ResumeLayout(false);
            weathertableLayoutPanel.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private Panel rightSideBar;
        private PictureBox logoPictureBox;
        private Button settingsButton;
        private Button searchButton;
        private TextBox searchTextBox;
        private Panel buttonPanel;
        private Button savedLocationsButton;
        private Panel leftSidebarPanel;
        private TableLayoutPanel weathertableLayoutPanel;
        private Label airTemperatureLabel;
        private Label waterConditionsLabel;
        private Label weatherLabel;
        private Label locationLabel;
        private Label windLabel;
        private Label conditionsLabel;
        private TableLayoutPanel waterConditionsTableLayoutPanel;
        private Label clarityValueLabel;
        private Label waterTemperatureValueLabel;
        private Label waterTemperatureLabel;
        private Label clarityLabel;
        private Label windValueLabel;
        private Label conditionsValueLabel;
        private Label temperatureValueLabel;
        private TextBox notesTextBox;
        private Button saveNotesButton;
        private Label notesLabel;
        private Label fishingReportLabel;
        private Panel mapPanel;
        private TextBox fishingReportTextBox;
        private Panel notesPanel;
        private Panel searchPanel;
    }
}