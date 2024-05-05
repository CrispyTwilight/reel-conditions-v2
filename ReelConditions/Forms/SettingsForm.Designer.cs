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
            metricRadioButton = new RadioButton();
            imperialRadioButton = new RadioButton();
            titleLabel = new Label();
            distanceUnitsGroupBox = new GroupBox();
            radioButton1 = new RadioButton();
            radioButton2 = new RadioButton();
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
            // 
            // temperatureUnitsGroupBox
            // 
            temperatureUnitsGroupBox.Controls.Add(metricRadioButton);
            temperatureUnitsGroupBox.Controls.Add(imperialRadioButton);
            temperatureUnitsGroupBox.Font = new Font("Segoe UI Light", 16F, FontStyle.Regular, GraphicsUnit.Point, 0);
            temperatureUnitsGroupBox.Location = new Point(12, 72);
            temperatureUnitsGroupBox.Name = "temperatureUnitsGroupBox";
            temperatureUnitsGroupBox.Size = new Size(200, 100);
            temperatureUnitsGroupBox.TabIndex = 7;
            temperatureUnitsGroupBox.TabStop = false;
            temperatureUnitsGroupBox.Text = "Temperature Units";
            // 
            // metricRadioButton
            // 
            metricRadioButton.AutoSize = true;
            metricRadioButton.Font = new Font("Segoe UI", 12F);
            metricRadioButton.Location = new Point(27, 66);
            metricRadioButton.Name = "metricRadioButton";
            metricRadioButton.Size = new Size(102, 25);
            metricRadioButton.TabIndex = 9;
            metricRadioButton.TabStop = true;
            metricRadioButton.Text = "Metric (°C)";
            metricRadioButton.UseVisualStyleBackColor = true;
            // 
            // imperialRadioButton
            // 
            imperialRadioButton.AutoSize = true;
            imperialRadioButton.Font = new Font("Segoe UI", 12F);
            imperialRadioButton.Location = new Point(27, 35);
            imperialRadioButton.Name = "imperialRadioButton";
            imperialRadioButton.Size = new Size(113, 25);
            imperialRadioButton.TabIndex = 8;
            imperialRadioButton.TabStop = true;
            imperialRadioButton.Text = "Imperial (°F)";
            imperialRadioButton.UseVisualStyleBackColor = true;
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
            distanceUnitsGroupBox.Controls.Add(radioButton1);
            distanceUnitsGroupBox.Controls.Add(radioButton2);
            distanceUnitsGroupBox.Font = new Font("Segoe UI Light", 16F, FontStyle.Regular, GraphicsUnit.Point, 0);
            distanceUnitsGroupBox.Location = new Point(247, 72);
            distanceUnitsGroupBox.Name = "distanceUnitsGroupBox";
            distanceUnitsGroupBox.Size = new Size(200, 100);
            distanceUnitsGroupBox.TabIndex = 9;
            distanceUnitsGroupBox.TabStop = false;
            distanceUnitsGroupBox.Text = "Distance Units";
            // 
            // radioButton1
            // 
            radioButton1.AutoSize = true;
            radioButton1.Font = new Font("Segoe UI", 12F);
            radioButton1.Location = new Point(27, 66);
            radioButton1.Name = "radioButton1";
            radioButton1.Size = new Size(109, 25);
            radioButton1.TabIndex = 9;
            radioButton1.TabStop = true;
            radioButton1.Text = "Metric (Km)";
            radioButton1.UseVisualStyleBackColor = true;
            // 
            // radioButton2
            // 
            radioButton2.AutoSize = true;
            radioButton2.Font = new Font("Segoe UI", 12F);
            radioButton2.Location = new Point(27, 35);
            radioButton2.Name = "radioButton2";
            radioButton2.Size = new Size(117, 25);
            radioButton2.TabIndex = 8;
            radioButton2.TabStop = true;
            radioButton2.Text = "Imperial (Mi)";
            radioButton2.UseVisualStyleBackColor = true;
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
            // 
            // SettingsForm
            // 
            AutoScaleDimensions = new SizeF(9F, 21F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(550, 400);
            Controls.Add(exportDataButton);
            Controls.Add(exportDataLabel);
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
        private RadioButton metricRadioButton;
        private RadioButton imperialRadioButton;
        private Label titleLabel;
        private GroupBox distanceUnitsGroupBox;
        private RadioButton radioButton1;
        private RadioButton radioButton2;
        private Label exportDataLabel;
        private Button exportDataButton;
    }
}