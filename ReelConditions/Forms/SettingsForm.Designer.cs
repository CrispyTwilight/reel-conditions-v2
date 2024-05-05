namespace ReelConditions.Forms
{
    partial class SettingsForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SettingsForm));
            exitButton = new Button();
            saveAndCloseButton = new Button();
            temperatureUnitsGroupBox = new GroupBox();
            metricTemperatureRadioButton = new RadioButton();
            imperialTemperatureRadioButton = new RadioButton();
            titleLabel = new Label();
            distanceSpeedUnitsGroupBox = new GroupBox();
            metricDistanceRadioButton = new RadioButton();
            imperialDistanceRadioButton = new RadioButton();
            exportDataLabel = new Label();
            exportDataButton = new Button();
            temperatureUnitsGroupBox.SuspendLayout();
            distanceSpeedUnitsGroupBox.SuspendLayout();
            SuspendLayout();
            // 
            // exitButton
            // 
            exitButton.BackColor = Color.FromArgb(149, 187, 206);
            exitButton.FlatStyle = FlatStyle.Flat;
            exitButton.Font = new Font("Segoe UI Light", 14F);
            exitButton.Location = new Point(278, 339);
            exitButton.Name = "exitButton";
            exitButton.Size = new Size(129, 36);
            exitButton.TabIndex = 3;
            exitButton.Text = "E&xit";
            exitButton.UseVisualStyleBackColor = false;
            exitButton.Click += exitButton_Click;
            // 
            // saveAndCloseButton
            // 
            saveAndCloseButton.BackColor = Color.FromArgb(149, 187, 206);
            saveAndCloseButton.FlatStyle = FlatStyle.Flat;
            saveAndCloseButton.Font = new Font("Segoe UI Light", 14F);
            saveAndCloseButton.Location = new Point(143, 339);
            saveAndCloseButton.Name = "saveAndCloseButton";
            saveAndCloseButton.Size = new Size(129, 36);
            saveAndCloseButton.TabIndex = 4;
            saveAndCloseButton.Text = "&Save && Close";
            saveAndCloseButton.UseVisualStyleBackColor = false;
            saveAndCloseButton.Click += saveAndCloseButton_Click;
            // 
            // temperatureUnitsGroupBox
            // 
            temperatureUnitsGroupBox.Controls.Add(metricTemperatureRadioButton);
            temperatureUnitsGroupBox.Controls.Add(imperialTemperatureRadioButton);
            temperatureUnitsGroupBox.Font = new Font("Segoe UI Light", 16F, FontStyle.Regular, GraphicsUnit.Point, 0);
            temperatureUnitsGroupBox.Location = new Point(12, 72);
            temperatureUnitsGroupBox.Name = "temperatureUnitsGroupBox";
            temperatureUnitsGroupBox.Size = new Size(200, 100);
            temperatureUnitsGroupBox.TabIndex = 7;
            temperatureUnitsGroupBox.TabStop = false;
            temperatureUnitsGroupBox.Text = "Temperature Units";
            // 
            // metricTemperatureRadioButton
            // 
            metricTemperatureRadioButton.AutoSize = true;
            metricTemperatureRadioButton.Checked = true;
            metricTemperatureRadioButton.Font = new Font("Segoe UI", 12F);
            metricTemperatureRadioButton.Location = new Point(27, 66);
            metricTemperatureRadioButton.Name = "metricTemperatureRadioButton";
            metricTemperatureRadioButton.Size = new Size(102, 25);
            metricTemperatureRadioButton.TabIndex = 9;
            metricTemperatureRadioButton.TabStop = true;
            metricTemperatureRadioButton.Text = "Metric (°C)";
            metricTemperatureRadioButton.UseVisualStyleBackColor = true;
            metricTemperatureRadioButton.CheckedChanged += metricTemperatureRadioButton_CheckedChanged;
            // 
            // imperialTemperatureRadioButton
            // 
            imperialTemperatureRadioButton.AutoSize = true;
            imperialTemperatureRadioButton.Font = new Font("Segoe UI", 12F);
            imperialTemperatureRadioButton.Location = new Point(27, 35);
            imperialTemperatureRadioButton.Name = "imperialTemperatureRadioButton";
            imperialTemperatureRadioButton.Size = new Size(113, 25);
            imperialTemperatureRadioButton.TabIndex = 8;
            imperialTemperatureRadioButton.Text = "Imperial (°F)";
            imperialTemperatureRadioButton.UseVisualStyleBackColor = true;
            imperialTemperatureRadioButton.CheckedChanged += imperialTemperatureRadioButton_CheckedChanged;
            // 
            // titleLabel
            // 
            titleLabel.AutoSize = true;
            titleLabel.Font = new Font("Segoe UI Light", 22F);
            titleLabel.Location = new Point(12, 9);
            titleLabel.Name = "titleLabel";
            titleLabel.Size = new Size(117, 41);
            titleLabel.TabIndex = 8;
            titleLabel.Text = "Settings";
            // 
            // distanceSpeedUnitsGroupBox
            // 
            distanceSpeedUnitsGroupBox.Controls.Add(metricDistanceRadioButton);
            distanceSpeedUnitsGroupBox.Controls.Add(imperialDistanceRadioButton);
            distanceSpeedUnitsGroupBox.Font = new Font("Segoe UI Light", 16F, FontStyle.Regular, GraphicsUnit.Point, 0);
            distanceSpeedUnitsGroupBox.Location = new Point(247, 72);
            distanceSpeedUnitsGroupBox.Name = "distanceSpeedUnitsGroupBox";
            distanceSpeedUnitsGroupBox.Size = new Size(226, 100);
            distanceSpeedUnitsGroupBox.TabIndex = 9;
            distanceSpeedUnitsGroupBox.TabStop = false;
            distanceSpeedUnitsGroupBox.Text = "Distance/Speed Units";
            // 
            // metricDistanceRadioButton
            // 
            metricDistanceRadioButton.AutoSize = true;
            metricDistanceRadioButton.Checked = true;
            metricDistanceRadioButton.Font = new Font("Segoe UI", 12F);
            metricDistanceRadioButton.Location = new Point(27, 66);
            metricDistanceRadioButton.Name = "metricDistanceRadioButton";
            metricDistanceRadioButton.Size = new Size(109, 25);
            metricDistanceRadioButton.TabIndex = 9;
            metricDistanceRadioButton.TabStop = true;
            metricDistanceRadioButton.Text = "Metric (Km)";
            metricDistanceRadioButton.UseVisualStyleBackColor = true;
            metricDistanceRadioButton.CheckedChanged += metricDistanceRadioButton_CheckedChanged;
            // 
            // imperialDistanceRadioButton
            // 
            imperialDistanceRadioButton.AutoSize = true;
            imperialDistanceRadioButton.Font = new Font("Segoe UI", 12F);
            imperialDistanceRadioButton.Location = new Point(27, 35);
            imperialDistanceRadioButton.Name = "imperialDistanceRadioButton";
            imperialDistanceRadioButton.Size = new Size(117, 25);
            imperialDistanceRadioButton.TabIndex = 8;
            imperialDistanceRadioButton.Text = "Imperial (Mi)";
            imperialDistanceRadioButton.UseVisualStyleBackColor = true;
            imperialDistanceRadioButton.CheckedChanged += imperialDistanceRadioButton_CheckedChanged;
            // 
            // exportDataLabel
            // 
            exportDataLabel.AutoSize = true;
            exportDataLabel.Font = new Font("Segoe UI Light", 16F);
            exportDataLabel.Location = new Point(12, 204);
            exportDataLabel.Name = "exportDataLabel";
            exportDataLabel.Size = new Size(122, 30);
            exportDataLabel.TabIndex = 10;
            exportDataLabel.Text = "Export Data";
            // 
            // exportDataButton
            // 
            exportDataButton.BackColor = Color.FromArgb(149, 187, 206);
            exportDataButton.FlatStyle = FlatStyle.Flat;
            exportDataButton.Font = new Font("Segoe UI Light", 14F);
            exportDataButton.Location = new Point(12, 249);
            exportDataButton.Name = "exportDataButton";
            exportDataButton.Size = new Size(129, 36);
            exportDataButton.TabIndex = 11;
            exportDataButton.Text = "&Export";
            exportDataButton.UseVisualStyleBackColor = false;
            exportDataButton.Click += exportDataButton_Click;
            // 
            // SettingsForm
            // 
            AcceptButton = saveAndCloseButton;
            AutoScaleDimensions = new SizeF(9F, 21F);
            AutoScaleMode = AutoScaleMode.Font;
            CancelButton = exitButton;
            ClientSize = new Size(550, 400);
            Controls.Add(exportDataLabel);
            Controls.Add(exportDataButton);
            Controls.Add(distanceSpeedUnitsGroupBox);
            Controls.Add(titleLabel);
            Controls.Add(temperatureUnitsGroupBox);
            Controls.Add(saveAndCloseButton);
            Controls.Add(exitButton);
            Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            FormBorderStyle = FormBorderStyle.FixedToolWindow;
            Icon = (Icon)resources.GetObject("$this.Icon");
            Margin = new Padding(4);
            Name = "SettingsForm";
            ShowInTaskbar = false;
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Settings";
            Load += SettingsForm_Load;
            temperatureUnitsGroupBox.ResumeLayout(false);
            temperatureUnitsGroupBox.PerformLayout();
            distanceSpeedUnitsGroupBox.ResumeLayout(false);
            distanceSpeedUnitsGroupBox.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button exitButton;
        private Button saveAndCloseButton;
        private GroupBox temperatureUnitsGroupBox;
        private RadioButton metricTemperatureRadioButton;
        private RadioButton imperialTemperatureRadioButton;
        private Label titleLabel;
        private GroupBox distanceSpeedUnitsGroupBox;
        private RadioButton metricDistanceRadioButton;
        private RadioButton imperialDistanceRadioButton;
        private Label exportDataLabel;
        private Button exportDataButton;
    }
}