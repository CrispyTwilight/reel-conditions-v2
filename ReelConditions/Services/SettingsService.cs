using Newtonsoft.Json;


public class SettingsService
{
    private const string SettingsFilePath = "Settings.json";

    public void SaveSettings(Dictionary<string, string> settings)
    {
        string json = JsonConvert.SerializeObject(settings);
        File.WriteAllText(SettingsFilePath, json);
    }

    public Dictionary<string, string> LoadSettings()
    {
        if (File.Exists(SettingsFilePath))
        {
            string json = File.ReadAllText(SettingsFilePath);
            return JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
        }
        else
        {
            // Default settings
            return new Dictionary<string, string>
            {
                { "TemperatureUnit", "imperial" },
                { "DistanceUnit", "imperial" }
            };
        }
    }
}
