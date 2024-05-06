function DNRSymbols() {
    this.markerSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
    this.lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2);
    this.polygonSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, 0.50]));
    this.bluePin = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 10, "type": "esriPMS", "url": "https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png", "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREZCRkY1M0QzMkMxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREZCRkY1NEQzMkMxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJERkJGRjUxRDMyQzExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJERkJGRjUyRDMyQzExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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", "contentType": "image/png", "width": 24, "height": 24 });
    this.redPin = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 10, "type": "esriPMS", "url": "https://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png", "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MzA4NzI3NkQyN0MxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MzA4NzI3N0QyN0MxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzMDg3Mjc0RDI3QzExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUzMDg3Mjc1RDI3QzExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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", "contentType": "image/png", "width": 24, "height": 24 });
    this.orangePin = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 10, "type": "esriPMS", "url": "https://static.arcgis.com/images/Symbols/Shapes/OrangePin1LargeB.png", "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRTA4NDg4NEQyODExMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRTA4NDg4NUQyODExMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBOTg5MTVCRDI4MDExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBOTg5MTVDRDI4MDExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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", "contentType": "image/png", "width": 24, "height": 24 });
    this.greenPin = new esri.symbol.PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 10, "type": "esriPMS", "url": "https://static.arcgis.com/images/Symbols/Shapes/GreenPin1LargeB.png", "imageData": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQTQxMkU2NEQzMUUxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQTQxMkU2NUQzMUUxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFBNDEyRTYyRDMxRTExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFBNDEyRTYzRDMxRTExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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", "contentType": "image/png", "width": 24, "height": 24 });
}