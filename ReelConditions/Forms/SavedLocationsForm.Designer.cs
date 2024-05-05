namespace ReelConditions.Forms
{
    partial class SavedLocationsForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SavedLocationsForm));
            savedLocationsComboBox = new ComboBox();
            titleLabel = new Label();
            exitButton = new Button();
            loadLocationButton = new Button();
            SuspendLayout();
            // 
            // savedLocationsComboBox
            // 
            savedLocationsComboBox.FormattingEnabled = true;
            savedLocationsComboBox.Location = new Point(15, 53);
            savedLocationsComboBox.Name = "savedLocationsComboBox";
            savedLocationsComboBox.Size = new Size(704, 29);
            savedLocationsComboBox.TabIndex = 0;
            // 
            // titleLabel
            // 
            titleLabel.AutoSize = true;
            titleLabel.Font = new Font("Segoe UI Light", 22F);
            titleLabel.Location = new Point(15, 9);
            titleLabel.Name = "titleLabel";
            titleLabel.Size = new Size(221, 41);
            titleLabel.TabIndex = 9;
            titleLabel.Text = "Saved Locations";
            // 
            // exitButton
            // 
            exitButton.BackColor = Color.FromArgb(149, 187, 206);
            exitButton.FlatStyle = FlatStyle.Flat;
            exitButton.Font = new Font("Segoe UI Light", 14F);
            exitButton.Location = new Point(370, 410);
            exitButton.Name = "exitButton";
            exitButton.Size = new Size(146, 36);
            exitButton.TabIndex = 10;
            exitButton.Text = "E&xit";
            exitButton.UseVisualStyleBackColor = false;
            exitButton.Click += exitButton_Click;
            // 
            // loadLocationButton
            // 
            loadLocationButton.BackColor = Color.FromArgb(149, 187, 206);
            loadLocationButton.FlatStyle = FlatStyle.Flat;
            loadLocationButton.Font = new Font("Segoe UI Light", 14F);
            loadLocationButton.Location = new Point(218, 410);
            loadLocationButton.Name = "loadLocationButton";
            loadLocationButton.Size = new Size(146, 36);
            loadLocationButton.TabIndex = 11;
            loadLocationButton.Text = "&Load Location";
            loadLocationButton.UseVisualStyleBackColor = false;
            loadLocationButton.Click += loadLocationButton_Click;
            // 
            // SavedLocationsForm
            // 
            AutoScaleDimensions = new SizeF(9F, 21F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.White;
            ClientSize = new Size(734, 458);
            Controls.Add(loadLocationButton);
            Controls.Add(exitButton);
            Controls.Add(titleLabel);
            Controls.Add(savedLocationsComboBox);
            Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            FormBorderStyle = FormBorderStyle.FixedToolWindow;
            Icon = (Icon)resources.GetObject("$this.Icon");
            Margin = new Padding(4);
            Name = "SavedLocationsForm";
            ShowInTaskbar = false;
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Saved Locations";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private ComboBox savedLocationsComboBox;
        private Label titleLabel;
        private Button exitButton;
        private Button loadLocationButton;
    }
}