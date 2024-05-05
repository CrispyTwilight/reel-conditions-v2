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
            saveButton = new Button();
            temperatureUnitsGroupBox = new GroupBox();
            metricTemperatureRadioButton = new RadioButton();
            imperialTemperatureRadioButton = new RadioButton();
            titleLabel = new Label();
            distanceUnitsGroupBox = new GroupBox();
            metricDistanceRadioButton = new RadioButton();
            imperialDistanceUnits = new RadioButton();
            exportDataLabel = new Label();
            exportDataButton = new Button();
            temperatureUnitsGroupBox.SuspendLayout();
            distanceUnitsGroupBox.SuspendLayout();
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
            // saveButton
            // 
            saveButton.BackColor = Color.FromArgb(149, 187, 206);
            saveButton.FlatStyle = FlatStyle.Flat;
            saveButton.Font = new Font("Segoe UI Light", 14F);
            saveButton.Location = new Point(143, 339);
            saveButton.Name = "saveButton";
            saveButton.Size = new Size(129, 36);
            saveButton.TabIndex = 4;
            saveButton.Text = "&Save";
            saveButton.UseVisualStyleBackColor = false;
            saveButton.Click += saveButton_Click;
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
            metricTemperatureRadioButton.Font = new Font("Segoe UI", 12F);
            metricTemperatureRadioButton.Location = new Point(27, 66);
            metricTemperatureRadioButton.Name = "metricTemperatureRadioButton";
            metricTemperatureRadioButton.Size = new Size(102, 25);
            metricTemperatureRadioButton.TabIndex = 9;
            metricTemperatureRadioButton.TabStop = true;
            metricTemperatureRadioButton.Text = "Metric (°C)";
            metricTemperatureRadioButton.UseVisualStyleBackColor = true;
            // 
            // imperialTemperatureRadioButton
            // 
            imperialTemperatureRadioButton.AutoSize = true;
            imperialTemperatureRadioButton.Font = new Font("Segoe UI", 12F);
            imperialTemperatureRadioButton.Location = new Point(27, 35);
            imperialTemperatureRadioButton.Name = "imperialTemperatureRadioButton";
            imperialTemperatureRadioButton.Size = new Size(113, 25);
            imperialTemperatureRadioButton.TabIndex = 8;
            imperialTemperatureRadioButton.TabStop = true;
            imperialTemperatureRadioButton.Text = "Imperial (°F)";
            imperialTemperatureRadioButton.UseVisualStyleBackColor = true;
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
            // distanceUnitsGroupBox
            // 
            distanceUnitsGroupBox.Controls.Add(metricDistanceRadioButton);
            distanceUnitsGroupBox.Controls.Add(imperialDistanceUnits);
            distanceUnitsGroupBox.Font = new Font("Segoe UI Light", 16F, FontStyle.Regular, GraphicsUnit.Point, 0);
            distanceUnitsGroupBox.Location = new Point(247, 72);
            distanceUnitsGroupBox.Name = "distanceUnitsGroupBox";
            distanceUnitsGroupBox.Size = new Size(200, 100);
            distanceUnitsGroupBox.TabIndex = 9;
            distanceUnitsGroupBox.TabStop = false;
            distanceUnitsGroupBox.Text = "Distance Units";
            // 
            // metricDistanceRadioButton
            // 
            metricDistanceRadioButton.AutoSize = true;
            metricDistanceRadioButton.Font = new Font("Segoe UI", 12F);
            metricDistanceRadioButton.Location = new Point(27, 66);
            metricDistanceRadioButton.Name = "metricDistanceRadioButton";
            metricDistanceRadioButton.Size = new Size(109, 25);
            metricDistanceRadioButton.TabIndex = 9;
            metricDistanceRadioButton.TabStop = true;
            metricDistanceRadioButton.Text = "Metric (Km)";
            metricDistanceRadioButton.UseVisualStyleBackColor = true;
            // 
            // imperialDistanceUnits
            // 
            imperialDistanceUnits.AutoSize = true;
            imperialDistanceUnits.Font = new Font("Segoe UI", 12F);
            imperialDistanceUnits.Location = new Point(27, 35);
            imperialDistanceUnits.Name = "imperialDistanceUnits";
            imperialDistanceUnits.Size = new Size(117, 25);
            imperialDistanceUnits.TabIndex = 8;
            imperialDistanceUnits.TabStop = true;
            imperialDistanceUnits.Text = "Imperial (Mi)";
            imperialDistanceUnits.UseVisualStyleBackColor = true;
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
            AutoScaleDimensions = new SizeF(9F, 21F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(550, 400);
            Controls.Add(exportDataLabel);
            Controls.Add(exportDataButton);
            Controls.Add(distanceUnitsGroupBox);
            Controls.Add(titleLabel);
            Controls.Add(temperatureUnitsGroupBox);
            Controls.Add(saveButton);
            Controls.Add(exitButton);
            Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            FormBorderStyle = FormBorderStyle.FixedToolWindow;
            Icon = (Icon)resources.GetObject("$this.Icon");
            Margin = new Padding(4);
            Name = "SettingsForm";
            ShowInTaskbar = false;
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Settings";
            temperatureUnitsGroupBox.ResumeLayout(false);
            temperatureUnitsGroupBox.PerformLayout();
            distanceUnitsGroupBox.ResumeLayout(false);
            distanceUnitsGroupBox.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button exitButton;
        private Button saveButton;
        private GroupBox temperatureUnitsGroupBox;
        private RadioButton metricTemperatureRadioButton;
        private RadioButton imperialTemperatureRadioButton;
        private Label titleLabel;
        private GroupBox distanceUnitsGroupBox;
        private RadioButton metricDistanceRadioButton;
        private RadioButton imperialDistanceUnits;
        private Label exportDataLabel;
        private Button exportDataButton;
    }
}