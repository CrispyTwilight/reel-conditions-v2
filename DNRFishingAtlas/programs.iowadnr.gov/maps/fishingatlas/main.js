var app = {};
app.maplayers = [];
var urlParams = dojo.queryToObject(window.location.search.slice(1));
var map = null;
var labels; //label layer
var mapTOC, toclayers, legendlayers;
var mapSpatialReferenceWKID = 102100;
var mapSpatialReference;
var splash = false;
var hasScalebar = false;
var plssServiceUrl = "https://programs.iowadnr.gov/geospatial/rest/services/tools/plssLocator/MapServer";
var locatorServiceUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
var geometryServiceUrl = "https://programs.iowadnr.gov/geospatial/rest/services/Geometry/GeometryServer";
var lakeSearchServiceURL = "https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Fishing/MapServer";


var zoompt;
var zoom;
var default_basemap = "bmGray"; //bmRoads bmAerial bmHybrid bmGray bmTopo bmOSM
var basemap_gallery, legend;
var locator, identifyDijit, measureDijit;
var selectionHandler, clickHandler, clickListener;
var initialExtent;
var showcoordinates = true;
var maplayers = [];

var findParams, plssFindTask, lakeFindTask, lakeFindParams;

var CONFIG = [
    //
    {
        serviceurl: "https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Fishing/MapServer/1",
        servicetype: "feature",
        options: {},
        id: "contours",
        fields: ["*"],
        filterexpression: null //"C2 = 1 OR (C2 = 1 AND C10 = 1)"

        , labelrenderer: {
            "type": "simple", "symbol": {
                "color": [255, 255, 255, 255], "type": "esriTS", "horizontalAlignment": "center", "angle": 0, "xoffset": 0, "yoffset": 0, "text": "", "rotated": false, "kerning": true, "haloColor": [
                    255, 255, 255, 255], "haloSize": 1, "font": { "size": 8, "style": "normal", "variant": "normal", "weight": "normal", "family": "verdana" }
            }
        }
        , labeltext: "{CONTOUR}"
    },
    {
        serviceurl: "https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Recreation/MapServer/8",
        servicetype: "feature",
        options: {},
        id: "fish-poi",
        fields: ["OBJECTID", "Name", "Type", "RecAssType", "lat", "long", "UTM_X", "UTM_Y"],
        filterexpression: "Type = 'Fish Attractor'",
        //hovertemplate: {title:"<strong>${Name}</strong>", content:"${Type}<br>${lat} ${long}<br>${UTM_X} ${UTM_Y}"},
        hovertemplate: { title: "<strong>${Name}</strong>", content: "${Type}<br> lat:${lat} long:${long}<br>UTM_X:${UTM_X} UTM_Y:${UTM_Y}" },
        renderer: {

            "type": "uniqueValue",
            "field1": "Name",
            "defaultSymbol": {
                "type": "esriPMS",
                "url": "./images/other-24.png",
                "width": 18,
                "height": 18,
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0
            },
            "uniqueValueInfos": [{
                "value": "Trees Cedar",
                "label": "Trees Cedar",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/trees-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },
            {
                "value": "Brush Piles",
                "label": "Brush Piles",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/brushpile-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },
            {
                "value": "Trees Hardwood",
                "label": "Trees Hardwood",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/brushpile-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },
            {
                "value": "Rocks",
                "label": "Rocks",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/rock-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },
            {
                "value": "Gravel",
                "label": "Gravel",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/gravel-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },
            {
                "value": "Rock Reefs",
                "label": "Rock Reefs",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/rockreef-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },
            {
                "value": "Pallets",
                "label": "Pallets",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/pallet-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },
            {
                "value": "Stake Beds",
                "label": "Stake Beds",
                "symbol":
                {
                    "type": "esriPMS",
                    "url": "./images/stakebed-24.png",
                    "width": 18,
                    "height": 18,
                    "angle": 0,
                    "xoffset": 0,
                    "yoffset": 0
                }
            },

            ]
        }
    },
    {
        serviceurl: "https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Recreation/MapServer/8",
        servicetype: "feature",
        options: { "definitionExpression": "Type <> 'Fish Attractor'" },
        id: "rec-poi",
        fields: ["OBJECTID", "Name", "Type", "RecAssType", "lat", "long", "UTM_X", "UTM_Y"],
        filterexpression: "Type <> 'Fish Attractor'",
        hovertemplate: { title: "<strong>${Name}</strong>", content: "${Type}<br>lat:${lat} long:${long}<br>UTM_X:${UTM_X} UTM_Y:${UTM_Y}" },
        renderer: {}
    }
    , {
        serviceurl: "https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Fishing/MapServer/0",
        servicetype: "feature",
        options: {},
        id: "lakes",
        fields: ["*"],
        filterexpression: null,
        //identifytemplate: {title:"<strong>${LakeName}</strong>",content:"Depth:${Max_CONTOUR} ft."},
        hovertemplate: { title: "<strong>${LakeName}</strong>", content: "Depth:${Max_CONTOUR} ft. <a href=http://www.iowadnr.gov/idnr/Fishing/Where-to-Fish/Lakes-Ponds-Reservoirs/LakeDetails/lakeCode/${LakeCode} target='_blank'>More Info" },
        //no any quotation mark for href  'http://...' will not work
        renderer: {
            "type": "uniqueValue", "field1": "C10",
            "defaultSymbol": { "angle": 0, "xoffset": 0, "yoffset": 10, "type": "esriPMS", "url": "https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png", "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREZCRkY1M0QzMkMxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREZCRkY1NEQzMkMxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJERkJGRjUxRDMyQzExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJERkJGRjUyRDMyQzExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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", "contentType": "image/png", "width": 24, "height": 24 },
            "uniqueValueInfos": []
        }
    },
    {
        serviceurl: "https://programs.iowadnr.gov/geospatial/rest/services/Recreation/Fishing/MapServer/4",
        servicetype: "feature",
        id: "troutStream",
        renderer: {}
    }
];

var bluePin, redPin, orangePin, greenPin, markerSymbol, lineSymbol, polygonSymbol;

function init() {
    dnrsymbols = new DNRSymbols();
    esri.config.defaults.geometryService = new esri.tasks.GeometryService(geometryServiceUrl);
    mapSpatialReference = new esri.SpatialReference({ "wkid": mapSpatialReferenceWKID });
    markerSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
    lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2);
    polygonSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, 0.50]));

    bluePin = dnrsymbols.bluePin;
    redPin = dnrsymbols.redPin;
    orangePin = dnrsymbols.orangePin;
    greenPin = dnrsymbols.greenPin;

    if (splash) {
        dijit.byId("splash").show();
    };

    toclayers = [];
    legendlayers = [];

    zoom = getDefaultZoom();
    if (urlParams['loc'] || urlParams['trs']) {
        zoompt, zoom, default_basemap, trs = getURLParamValues(urlParams);
    }
    initialExtent = new esri.geometry.Extent({ "xmin": -11046697, "ymin": 4659284, "xmax": -9788237, "ymax": 5602211, "spatialReference": { "wkid": 102100 } });

    initPlssSearchParams(plssServiceUrl, mapSpatialReference);
    initLakeSearchParams(lakeSearchServiceURL, mapSpatialReference, [2]);

    ///Create layers and then load....move above map declaration
    for (lyr in CONFIG) {
        props = CONFIG[lyr];
        switch (props.servicetype) {
            case "feature":
                var flayer = new esri.layers.FeatureLayer(props.serviceurl, {
                    id: props.id,
                    //infoTemplate: props.hovertemplate,
                    showAttribution: true,
                    autoGeneralize: true,
                    //maxAllowableOffset: 100,
                    showLabels: props.showlabels,
                    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                    outFields: props.fields
                });
                if (props.filterexpression) {
                    flayer.setDefinitionExpression(props.filterexpression);
                }
                if (props.renderer) { flayer.setRenderer(esri.renderer.fromJson(props.renderer)); }
                if (props.hovertemplate) {
                    flayer.setInfoTemplate(new esri.InfoTemplate(props.hovertemplate));
                    //flayer.setInfoTemplate(new esri.InfoTemplate(props.identifytemplate));
                    flayer.on("mouse-over", function (evt) { genericHoverTip(evt); });
                    flayer.on("mouse-out", closeTip);
                }
                app.maplayers.push(flayer);

                if (props.labeltext && props.labelrenderer) {

                    labels = new esri.layers.LabelLayer({ id: "labels" });
                    labels.addFeatureLayer(flayer, esri.renderer.fromJson(props.labelrenderer), props.labeltext, { howManyLabels: "OneLabel", lineLabelPosition: "OnLine" });
                    app.maplayers.push(labels);
                }
                break;

            default:
                break;
        }
    };
    //map.addLayer(labels);
    map = new esri.Map("map", {
        basemap: "satellite",
        center: [-93.49691438343264, 42.12318841616841],
        zoom: 8,
        //scale: 2300000,
        extent: initialExtent
        //slider: true
    });
    map.addLayers(app.maplayers);
    var infoTemplate = new esri.InfoTemplate("${NAME}", "${*}");
    map.infoWindow.resize(245, 125);
    map.on("load", function () {
        map.graphics.enableMouseEvents();
    });

    var countyLabel = "https://programs.iowadnr.gov/geospatial/rest/services/Boundaries/IowaCountyLabels/MapServer";
    map.addLayer(new esri.layers.ArcGISDynamicMapServiceLayer(countyLabel));

    createTOC(toclayers);

    addMeasurementWidget();

    dojo.connect(map, "onMouseMove", showCoordinates);
    dojo.connect(map, "onMouseDrag", showCoordinates);
    // });

    createBasemapGallery(default_basemap);

    if (hasScalebar) {
        var scalebar = new esri.dijit.Scalebar({
            map: map,
            attachTo: "bottom-right"
        });
    }
    locator = new esri.tasks.Locator(locatorServiceUrl);
    dojo.connect(locator, "onAddressToLocationsComplete", showGeocodeResults);

    //Address Search Button
    dojo.connect(dojo.byId('search-address'), 'onclick', function () {
        locateAddress();
    });
    //Address Search, Enter Key
    dojo.connect(dojo.byId('address'), 'onkeydown', function (e) {
        if (e.keyCode === 13) {
            locateAddress();
        }
    });

    //PLSS Search event/find task
    dojo.connect(dojo.byId('search-plss'), 'onclick', function () {
        locatePLSS();
    });

    dojo.connect(dojo.byId('plss'), 'onkeydown', function (e) {
        if (e.keyCode === 13) {
            locatePLSS();
        }
    });

    dojo.connect(dojo.byId('search-lake-button'), 'onclick', function () {
        findLake(dojo.byId('search-lake-text').value);
    });

    dojo.connect(dojo.byId('search-lake-text'), 'onkeydown', function (e) {
        if (e.keyCode === 13) {
            findLake(dojo.byId('search-lake-text').value);
        }
    });

    initHideShowTabListener();
    //clickListener = identifyFeatures;
    dojo.connect(dijit.byId('map'), 'resize', map, map.resize);
}

function genericHoverTip(evt) {
    var itemplate = evt.graphic.getInfoTemplate();

    var popupcontent = esri.substitute(evt.graphic.attributes, itemplate.title + "<br />" + itemplate.content);
    var dialog = new dijit.TooltipDialog({
        id: "tooltipDialog",
        content: popupcontent,
        style: "position: absolute; width: 250px; font: normal normal normal 10pt Verdana;z-index:100;background:white;"
    });
    dialog.startup();
    dialog.setContent(popupcontent);
    dojo.style(dialog.domNode, "opacity", 0.90);
    //domStyle.set(dialog.domNode, "opacity", 0.85);
    dijit.placeOnScreen(dialog.domNode, { x: evt.pageX, y: evt.pageY }, ["TL", "BL"], { x: 10, y: 10 });
}

function closeTip() {
    var widget = dijit.byId("tooltipDialog");
    if (widget) {
        widget.destroy();
    }
}

function initHideShowTabListener() {
    tabsVisible = true;
    dojo.connect(dijit.byId('leftPane'), 'toggle', function (e) {
        //alert('ok');
        if (tabsVisible) {
            dojo.query("#tabContainer").style('display', 'none');
            tabsVisible = false;
        } else {
            dojo.query("#tabContainer").style('display', 'block');
            tabsVisible = true;
        }
    });
};

function getDefaultZoom() {
    if (window.innerWidth < 780) {
        zoom = 4;
    } else if (window.innerWidth >= 780 && window.innerWidth < 1280) {
        zoom = 5;
    } else if (window.innerWidth >= 1280) {
        zoom = 6;
    }
    return zoom;
}

function getURLParamValues(urlParams) {
    xy = urlParams['loc'].split(",");
    trs = urlParams['trs'];
    if (urlParams['b']) {
        default_basemap = urlParams['b'];
    } else {
        default_basemap = "bmRoads";
    }
    if (urlParams['z']) {
        zoom = urlParams['z'];
    } else {
        zoom = 5;
    }
    if (xy[0] > -180 && xy[0] < 180 && xy[1] > 0 && xy[1] < 90) {
        tpt = transformCoordinate('EPSG:4326', 'EPSG:26915', xy[0], xy[1]);
        zoompt = new esri.geometry.Point(tpt.x, tpt.y, new esri.SpatialReference({ wkid: 26915 }));
    } else if (xy[0] > 150000 && xy[0] < 790000 && xy[1] > 4400000 && xy[1] < 4900000) {
        zoompt = new esri.geometry.Point(xy[0], xy[1], new esri.SpatialReference({ wkid: 26915 }));
    } else {
        console.error("coordinates not recognized");
    }
    return zoompt, zoom, default_basemap, trs;
};

function createLegend(legendlayers) {
    legend = new esri.dijit.Legend(
        {
            map: map,
            layerInfos: legendlayers.reverse()
        },
        "legendDiv"
    );
    legend.startup();
};

function createTOC(toclayers) {
    mapTOC = new agsjs.dijit.TOC(
        {
            map: map,
            layerInfos: toclayers
        },
        "tocDiv");
    mapTOC.startup();
}

function hideTOCLayers(toclayers) {
    for (i in toclayers) {
        for (j in toclayers[i].layer.layerInfos) {
            if (toclayers[i].includedLayers.indexOf(parseInt(j)) == -1) {
                mapTOC.findTOCNode(toclayers[i].layer, j).hide();
            }
        }
    }
}

function initPlssSearchParams(plssServiceUrl, mapSpatialReference) {
    plssFindTask = new esri.tasks.FindTask(plssServiceUrl);
    findParams = new esri.tasks.FindParameters();
    //findParams.outSpatialReference = new esri.SpatialReference({"wkid":mapSpatialReference});
    findParams.outSpatialReference = mapSpatialReference;
    findParams.returnGeometry = true;
    findParams.layerIds = [1];
    findParams.searchFields = ["TRSQQQ"];
};

function locatePLSS() {
    findParams.searchText = dojo.byId("plss").value;
    if (findParams.searchText) {
        plssFindTask.execute(findParams, showPlssResults, noPlssResults);
    } else {
        map.graphics.clear();
    }
}

function initLakeSearchParams(lakeSearchServiceUrl, mapSpatialReference, layerids) {
    lakeFindTask = new esri.tasks.FindTask(lakeSearchServiceUrl);
    lakeFindParams = new esri.tasks.FindParameters();
    lakeFindParams.outSpatialReference = mapSpatialReference;
    lakeFindParams.returnGeometry = true;
    lakeFindParams.layerIds = layerids;
    lakeFindParams.maxAllowableOffset = 200;
    lakeFindParams.searchFields = ["LakeName", "GNIS_NAME", "ALTNAME1"];
};

function findLake(searchtext) {
    lakeFindParams.searchText = searchtext;
    if (lakeFindParams.searchText) {
        lakeFindTask.execute(lakeFindParams, showAreaNameResults, noAreaResults);
    } else {
        map.graphics.clear();
    }
}

function noPlssResults(error) {
    map.graphics.clear();
    alert("Please enter a valid Township, Range and Section");
};

function showPlssResults(results) {
    if (results.length > 0) {
        map.graphics.clear();
        dojo.forEach(results, function (result) {
            var graphic = result.feature;
            switch (graphic.geometry.type) {
                case "point":
                    graphic.setSymbol(markerSymbol);
                    break;
                case "polyline":
                    graphic.setSymbol(lineSymbol);
                    break;
                case "polygon":
                    graphic.setSymbol(polygonSymbol);
                    break;
            }

            map.graphics.add(graphic);
        });
        map.setExtent(esri.graphicsExtent(map.graphics.graphics).expand(1.5));
    } else {
        alert("No location found");
    };
};
function showAreaNameResults(results) {
    //console.log(results)
    if (results.length > 0) {
        map.graphics.clear();

        var items = dojo.map(results, function (item) {
            var graphic = item.feature;
            map.graphics.add(graphic);
            return item.feature.attributes;
        });


        var griddata = {
            items: items
        };
        store = new dojo.data.ItemFileReadStore({ data: griddata });
        var layout = [[
            { 'name': 'Results', 'fields': ['LakeName', 'ALTNAME1', 'AcresCalculated', 'LakeCode'], formatter: formatResults, 'width': '225px' }
            //{'name': 'Results', 'fields':[ 'LakeName','ALTNAME1', 'AcresCalculated','LakeCode'],formatter:formatResults}
        ]];

        if (!dijit.byId("area-grid")) {
            grid = new dojox.grid.DataGrid({


                //autoHeight: 10,
                width: 230,
                autoHeight: true,
                id: 'area-grid',
                store: store,
                structure: layout
            });

            grid.placeAt("search-results-intab");

            grid.startup();
            grid.loadingMessage = "Fetching data..";

        } else {
            grid = dijit.byId("area-grid");
            grid.setStore(store);
        }

        if (map.graphics.graphics.length > 0) {
            map.setExtent(esri.graphicsExtent(map.graphics.graphics).expand(1.5));
        } else {
            map.centerAndZoom(map.graphics.graphics[0].geometry, 14);

        }

        dojo.connect(grid, "onRowClick", onRowClickHandler);

    } else {
        grid.setStore(null);
        grid.showMessage("No lakes found");

    }
};

function formatResults(value) {
    urlstring = "https://www.iowadnr.gov/idnr/Fishing/WheretoFish/LakesPondsReservoirs/LakeDetails.aspx?lakeCode=" + value[3];
    if (value[1] == "Null" || value[1].length < 1 || value[0] == value[1]) {
        item = value[0] + "<br />" + value[2] + " acres";

    } else {
        item = value[0] + "<br />Also known as " + value[1] + "<br />" + value[2] + " acres";
    }

    item += "<br /><a href='" + urlstring + "' target='_blank'>More info</a>";
    return item;
}

function locateFeatures(queryparams) {
    if (queryparams.where) {
        customQueryTask.execute(queryparams, showAreaNameResults, noAreaResults);
    } else {
        map.graphics.clear();
    }
}

function noAreaResults(error) {
    map.graphics.clear();
    alert("Please enter a valid search");
};

function onRowClickHandler(evt) {
    var clickedFeatureRow = grid.getItem(evt.rowIndex);
    var selectedFeature;
    dojo.forEach(map.graphics.graphics, function (graphic) {
        if ((graphic.attributes) && graphic.attributes === clickedFeatureRow) {
            selectedFeature = graphic;
            return;
        }
    });
    if (selectedFeature.geometry.type == 'point') {
        map.centerAndZoom(selectedFeature.geometry, 14);
    }
    else {
        map.setExtent(selectedFeature.geometry.getExtent().expand(1.5));
    }
}

function initIdentify(IDENTIFYCONFIG) {
    identifyconfiguration = IDENTIFYCONFIG[0];
    identifyTask = new esri.tasks.IdentifyTask(identifyconfiguration.serviceurl);
    identifyParams = new esri.tasks.IdentifyParameters();
    identifyParams.tolerance = 3;
    identifyParams.spatialReference = new esri.SpatialReference({ "wkid": mapSpatialReferenceWKID });
    identifyParams.returnGeometry = true;
    identifyParams.layerIds = identifyconfiguration.identifylayers;
    identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
    identifyParams.width = map.width;
    identifyParams.height = map.height;
    clickHandler = dojo.connect(map, "onClick", identifyFeatures);
}

function identifyFeatures(evt) {
    //console.log(IDENTIFYCONFIG);
    identifyconfiguration = IDENTIFYCONFIG[0];
    //console.log(IDENTIFYCONFIG[0]);
    identifyParams.geometry = evt.mapPoint;
    identifyParams.mapExtent = map.extent;

    var deferred = identifyTask.execute(identifyParams);
    deferred.addCallback(function (response) {
        return dojo.map(response, function (result) {
            var feature = result.feature;
            feature.attributes.layerName = result.layerName;
            template = new esri.InfoTemplate(identifyconfiguration["templatelayer" + result.layerId]);
            feature.setInfoTemplate(template);
            return feature;
        });
    });
    map.infoWindow.setFeatures([deferred]);
    map.infoWindow.show(evt.mapPoint);
}

function showCoordinates(evt) {
    var mp = evt.mapPoint;
    pt01 = transformCoordinate('EPSG:102100', 'EPSG:26915', mp.x, mp.y);
    pt02 = transformCoordinate('EPSG:102100', 'EPSG:4326', mp.x, mp.y);
    dojo.byId("divMapCoords").innerHTML = pt01.x.toFixed(2) + ", " + pt01.y.toFixed(2);
    dojo.byId("divTransformedCoords").innerHTML = pt02.x.toFixed(6) + ", " + pt02.y.toFixed(6);
}

function transformCoordinate(fromEPSG, toEPSG, x, y) {
    var source = new Proj4js.Proj(fromEPSG);    //source coordinates will be in Longitude/Latitude
    var dest = new Proj4js.Proj(toEPSG);     //destination coordinates in LCC, south of France
    var p = new Proj4js.Point(x, y);   //any object will do as long as it has 'x' and 'y' properties
    return Proj4js.transform(source, dest, p);      //do the transformation.  x and y are modified in place
}

function locateAddress() {
    map.graphics.clear();
    var address = { "SingleLine": dojo.byId("address").value };
    locator.outSpatialReference = map.spatialReference;
    locator.addressToLocations(address, ["Loc_name"]);
}

function showGeocodeResults(candidates) {
    var candidate;
    var infoTemplate = new esri.InfoTemplate("Location", "Address: ${address}<br />Score: ${score}<br />Source locator: ${locatorName}");
    var geom;

    dojo.every(candidates, function (candidate) {
        if (candidate.score > 80) {
            var attributes = { address: candidate.address, score: candidate.score, locatorName: candidate.attributes.Loc_name };
            geom = candidate.location;

            var graphic = new esri.Graphic(geom, redPin, attributes, infoTemplate);
            map.graphics.add(graphic);
            return false; //break out of loop after one candidate with score greater  than 80 is found.
        }
    });
    if (geom !== undefined) {
        map.centerAndZoom(geom, 14);
    }
}

function addMeasurementWidget() {
    var fp = new dojox.layout.FloatingPane({
        title: "Measure",
        resizable: false,
        dockable: false,
        closable: false,
        style: "position:absolute;top:5px;left:5px;width:245px;height:175px;z-index:100;visibility:hidden;",
        id: 'measurePane'
    }, dojo.byId('measurePane'));
    fp.startup();

    var titlePane = dojo.query('#measurePane .dojoxFloatingPaneTitle')[0];
    //add close button to title pane
    var closeDiv = dojo.create('div', {
        id: "closeBtn",
        innerHTML: esri.substitute({ close_title: "close", close_alt: "close" }, '<a alt=${close_alt} title=${close_title} href="JavaScript:toggleMeasure();"><img  src="https://programs.iowadnr.gov/maps/apis/idnr/js/gov/iowadnr/compactmap/images/close.png" alt="close"/></a>')
    }, titlePane);

    measure = new esri.dijit.Measurement({
        map: map,
        id: 'measureTool',
        defaultAreaUnit: esri.Units.ACRES,
        defaultLengthUnit: esri.Units.FEET
    }, 'measurementDiv');

    measure.startup();
    var measureButton = new dijit.form.ToggleButton({
        label: "Measure",
        title: "Measure",
        id: "measureButton",
        iconClass: "esriMeasureIcon",
        baseClass: "dnrToolButton"
    });

    dojo.connect(measureButton, "onClick", function () {
        toggleMeasure();
    });

    dojo.byId('header-toolbar').appendChild(measureButton.domNode);
}

function addMailMapButton() {
    var mailButton = new dijit.form.ToggleButton({
        label: "Mail",
        title: "Mail",
        id: "mailButton",
        iconClass: "dnrMailIcon",
        baseClass: "dnrToolButton"
    });

    dojo.connect(mailButton, "onClick", function () {
        toggleMail();
    });

    dojo.byId('header-toolbar').appendChild(mailButton.domNode);
}

function addSplashButton() {
    var splashButton = new dijit.form.ToggleButton({
        label: "Map Info",
        title: "Map Info",
        id: "showsplash",
        iconClass: "dnrSplashIcon",
        baseClass: "dnrToolButton"
    });
    dojo.connect(splashButton, "onClick", function () {
        showSplash();
    });
    dojo.byId('header-toolbar').appendChild(splashButton.domNode);
}

function initCustomSearchButton() {
    var searchPanel = new dojox.layout.FloatingPane({
        title: "Lake Search",
        resizable: true,
        dockable: false,
        closable: false,
        style: "position:relative;width: 290px;top:5px;	left:5px;bottom:5px;height:350px;z-index:100;visibility:hidden;"
    }, dojo.byId('search-pane'));

    var titlePane = dojo.query('#search-pane .dojoxFloatingPaneTitle')[0];
    var closeDiv = dojo.create('div', {
        id: "closeBtn",
        innerHTML: esri.substitute({ close_title: "close", close_alt: "close" }, '<a alt=${close_alt} title=${close_title} href="JavaScript:toggleSearch();"><img  src="../apis/idnr/js/gov/iowadnr/compactmap/images/close.png"/></a>')
    }, titlePane);

    searchPanel.startup();

    //Button in map toolbar
    var HuntingSearchButton = new dijit.form.ToggleButton({
        label: "Lake Search",
        id: "lakesearch_toolbutton",
        iconClass: "dnrMapIconSearch",
        baseClass: "dnrToolButton"
    });

    dojo.connect(searchPanel, "closeWindow", function () {
        toggleSearch();
        map.graphics.clear();
    });

    dojo.connect(HuntingSearchButton, "onClick", function () {
        toggleSearch();
        map.graphics.clear();
    });

    //TODO: Put in Search Init function.
    //countydropdown();
    //speciesdropdown();
    dojo.byId('header-toolbar').appendChild(HuntingSearchButton.domNode);
}

function toggleSearch() {
    if (dojo.byId('search-pane').style.visibility === 'hidden') {
        dijit.byId('search-pane').show();
        map.graphics.clear();
    } else {
        dijit.byId('search-pane').hide();
        map.graphics.clear();
        griddata = { items: [] };
        store = new dojo.data.ItemFileReadStore({ data: griddata });
        grid = dijit.byId("area-grid");
        grid.setStore(store);
        dijit.byId('search-pane').set('checked', false);
    }
}

function toggleMail() {
    baseurl = "https://" + window.location.hostname + ":" + window.location.port + window.location.pathname;
    tpt = transformCoordinate('EPSG:26915', 'EPSG:4326', map.extent.getCenter().x, map.extent.getCenter().y);
    loc = tpt.x.toFixed(6) + "," + tpt.y.toFixed(6);
    zoom = map.getLevel();
    selected_basemap = basemap_gallery.getSelected().id;
    baseurl += "%3Floc=" + loc;
    baseurl += "%26z=" + zoom;
    baseurl += "%26b=" + selected_basemap;
    window.location = "mailto:?subject=An Iowa DNR Map you might like&body=" + baseurl;
}

function createBasemapGallery(default_basemap) {
    basemap_gallery = createWebMercatorGallery();
    //basemap_gallery.startup();
    selectionHandler = dojo.connect(basemap_gallery, "onSelectionChange", function () {
        dojo.disconnect(selectionHandler);
        map.addLayers(maplayers.reverse());
    });

    //FORCE selectionChange to add layers, API throws an error since we are using all Bing Maps otherwise.
    //dijit.byId(basemap_gallery.id).onSelectionChange();

}
function showSplash() {
    dijit.byId("splash").show();
}
function hideSplash() {
    dijit.byId("splash").hide();
}
function enablePopups() {
    if (clickListener) {
        clickHandler = dojo.connect(map, "onClick", clickListener);
    }
}
function disablePopups() {
    if (clickHandler) {
        dojo.disconnect(clickHandler);
        //clickHandler = null;
    }
}

function toggleMeasure() {
    if (dojo.byId('measurePane').style.visibility === 'hidden') {
        dijit.byId('measurePane').show();
        disablePopups();
        map.hideZoomSlider();
    } else {
        dijit.byId('measurePane').hide();
        enablePopups();
        map.showZoomSlider();
        dijit.byId('measureButton').set('checked', false);
        var measure = dijit.byId('measureTool');
        measure.clearResult();
        if (measure.activeTool) {
            measure.setTool(measure.activeTool, false);
        }
    }
}
function sortAscending(property) {
    return function (a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
}
function sortDescending(property) {
    return function (a, b) {
        return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
    }
}
dojo.addOnLoad(init);