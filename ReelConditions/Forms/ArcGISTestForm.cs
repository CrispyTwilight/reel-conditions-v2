using Esri.ArcGISRuntime.Geometry;
using Esri.ArcGISRuntime.Mapping;
using Esri.ArcGISRuntime.Symbology;
using Esri.ArcGISRuntime.UI;


namespace ReelConditions.Forms
{
    public partial class ArcGISTestForm : Form
    {
        private MapView MyMapView; // Declare MyMapView

        public ArcGISTestForm()
        {
            InitializeComponent();
            MyMapView = new MapView(); // Initialize MyMapView
        }

        private void ArcGISTestForm_Load(object sender, EventArgs e)
        {
            // Create a new map
            Map myMap = new Map(Basemap.CreateTopographic()); // Use a valid method to create a Basemap

            // Assign the map to the MapView
            MyMapView.Map = myMap;

            // Create a new point with the same coordinates as the ReelConditions office
            MapPoint point = new MapPoint(-122.3321, 47.6062, SpatialReferences.Wgs84);

            // Create a new graphic with the point and a red circle symbol
            SimpleMarkerSymbol symbol = new SimpleMarkerSymbol(SimpleMarkerSymbolStyle.Circle, Color.Red, 10);
            Graphic graphic = new Graphic(point, symbol);

            // Add the graphic to the graphics overlay
            GraphicsOverlay graphicsOverlay = new GraphicsOverlay();
            graphicsOverlay.Graphics.Add(graphic);

            // Add the graphics overlay to the map view
            MyMapView.GraphicsOverlays.Add(graphicsOverlay);
        }
    }
}
