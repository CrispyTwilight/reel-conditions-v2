/*
  proj4js.js -- Javascript reprojection library. 
  
  Authors:      Mike Adair madairATdmsolutions.ca
                Richard Greenwood richATgreenwoodmap.com
                Didier Richard didier.richardATign.fr
                Stephen Irons
  License:      LGPL as per: http://www.gnu.org/copyleft/lesser.html 
                Note: This program is an almost direct port of the C library
                Proj4.
*/
Proj4js = {
  defaultDatum: 'WGS84', transform: function (source, dest, point) {
    if (!source.readyToUse) { this.reportError("Proj4js initialization for:" + source.srsCode + " not yet complete"); return point; }
    if (!dest.readyToUse) { this.reportError("Proj4js initialization for:" + dest.srsCode + " not yet complete"); return point; }
    if ((source.srsProjNumber == "900913" && dest.datumCode != "WGS84" && !dest.datum_params) || (dest.srsProjNumber == "900913" && source.datumCode != "WGS84" && !source.datum_params)) { var wgs84 = Proj4js.WGS84; this.transform(source, wgs84, point); source = wgs84; }
    if (source.axis != "enu") { this.adjust_axis(source, false, point); }
    if (source.projName == "longlat") { point.x *= Proj4js.common.D2R; point.y *= Proj4js.common.D2R; } else {
      if (source.to_meter) { point.x *= source.to_meter; point.y *= source.to_meter; }
      source.inverse(point);
    }
    if (source.from_greenwich) { point.x += source.from_greenwich; }
    point = this.datum_transform(source.datum, dest.datum, point); if (dest.from_greenwich) { point.x -= dest.from_greenwich; }
    if (dest.projName == "longlat") { point.x *= Proj4js.common.R2D; point.y *= Proj4js.common.R2D; } else { dest.forward(point); if (dest.to_meter) { point.x /= dest.to_meter; point.y /= dest.to_meter; } }
    if (dest.axis != "enu") { this.adjust_axis(dest, true, point); }
    return point;
  }, datum_transform: function (source, dest, point) {
    if (source.compare_datums(dest)) { return point; }
    if (source.datum_type == Proj4js.common.PJD_NODATUM || dest.datum_type == Proj4js.common.PJD_NODATUM) { return point; }
    if (source.datum_type == Proj4js.common.PJD_GRIDSHIFT) { alert("ERROR: Grid shift transformations are not implemented yet."); }
    if (dest.datum_type == Proj4js.common.PJD_GRIDSHIFT) { alert("ERROR: Grid shift transformations are not implemented yet."); }
    if (source.es != dest.es || source.a != dest.a || source.datum_type == Proj4js.common.PJD_3PARAM || source.datum_type == Proj4js.common.PJD_7PARAM || dest.datum_type == Proj4js.common.PJD_3PARAM || dest.datum_type == Proj4js.common.PJD_7PARAM) {
      source.geodetic_to_geocentric(point); if (source.datum_type == Proj4js.common.PJD_3PARAM || source.datum_type == Proj4js.common.PJD_7PARAM) { source.geocentric_to_wgs84(point); }
      if (dest.datum_type == Proj4js.common.PJD_3PARAM || dest.datum_type == Proj4js.common.PJD_7PARAM) { dest.geocentric_from_wgs84(point); }
      dest.geocentric_to_geodetic(point);
    }
    if (dest.datum_type == Proj4js.common.PJD_GRIDSHIFT) { alert("ERROR: Grid shift transformations are not implemented yet."); }
    return point;
  }, adjust_axis: function (crs, denorm, point) {
    var xin = point.x, yin = point.y, zin = point.z || 0.0; var v, t; for (var i = 0; i < 3; i++) {
      if (denorm && i == 2 && point.z === undefined) { continue; }
      if (i == 0) { v = xin; t = 'x'; }
      else if (i == 1) { v = yin; t = 'y'; }
      else { v = zin; t = 'z'; }
      switch (crs.axis[i]) {
        case 'e': point[t] = v; break; case 'w': point[t] = -v; break; case 'n': point[t] = v; break; case 's': point[t] = -v; break; case 'u': if (point[t] !== undefined) { point.z = v; }
          break; case 'd': if (point[t] !== undefined) { point.z = -v; }
          break; default: alert("ERROR: unknow axis (" + crs.axis[i] + ") - check definition of " + src.projName); return null;
      }
    }
    return point;
  }, reportError: function (msg) { }, extend: function (destination, source) {
    destination = destination || {}; if (source) { for (var property in source) { var value = source[property]; if (value !== undefined) { destination[property] = value; } } }
    return destination;
  }, Class: function () {
    var Class = function () { this.initialize.apply(this, arguments); }; var extended = {}; var parent; for (var i = 0; i < arguments.length; ++i) {
      if (typeof arguments[i] == "function") { parent = arguments[i].prototype; } else { parent = arguments[i]; }
      Proj4js.extend(extended, parent);
    }
    Class.prototype = extended; return Class;
  }, bind: function (func, object) { var args = Array.prototype.slice.apply(arguments, [2]); return function () { var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0])); return func.apply(object, newArgs); }; }, scriptName: "proj4js-compressed.js", defsLookupService: 'http://spatialreference.org/ref', libPath: null, getScriptLocation: function () {
    if (this.libPath) return this.libPath; var scriptName = this.scriptName; var scriptNameLen = scriptName.length; var scripts = document.getElementsByTagName('script'); for (var i = 0; i < scripts.length; i++) { var src = scripts[i].getAttribute('src'); if (src) { var index = src.lastIndexOf(scriptName); if ((index > -1) && (index + scriptNameLen == src.length)) { this.libPath = src.slice(0, -scriptNameLen); break; } } }
    return this.libPath || "";
  }, loadScript: function (url, onload, onfail, loadCheck) {
    var script = document.createElement('script'); script.defer = false; script.type = "text/javascript"; script.id = url; script.src = url; script.onload = onload; script.onerror = onfail; script.loadCheck = loadCheck; if (/MSIE/.test(navigator.userAgent)) { script.onreadystatechange = this.checkReadyState; }
    document.getElementsByTagName('head')[0].appendChild(script);
  }, checkReadyState: function () { if (this.readyState == 'loaded') { if (!this.loadCheck()) { this.onerror(); } else { this.onload(); } } }
}; Proj4js.Proj = Proj4js.Class({
  readyToUse: false, title: null, projName: null, units: null, datum: null, x0: 0, y0: 0, localCS: false, queue: null, initialize: function (srsCode, callback) {
    this.srsCodeInput = srsCode; this.queue = []; if (callback) { this.queue.push(callback); }
    if ((srsCode.indexOf('GEOGCS') >= 0) || (srsCode.indexOf('GEOCCS') >= 0) || (srsCode.indexOf('PROJCS') >= 0) || (srsCode.indexOf('LOCAL_CS') >= 0)) { this.parseWKT(srsCode); this.deriveConstants(); this.loadProjCode(this.projName); return; }
    if (srsCode.indexOf('urn:') == 0) { var urn = srsCode.split(':'); if ((urn[1] == 'ogc' || urn[1] == 'x-ogc') && (urn[2] == 'def') && (urn[3] == 'crs')) { srsCode = urn[4] + ':' + urn[urn.length - 1]; } } else if (srsCode.indexOf('http://') == 0) { var url = srsCode.split('#'); if (url[0].match(/epsg.org/)) { srsCode = 'EPSG:' + url[1]; } else if (url[0].match(/RIG.xml/)) { srsCode = 'IGNF:' + url[1]; } }
    this.srsCode = srsCode.toUpperCase(); if (this.srsCode.indexOf("EPSG") == 0) { this.srsCode = this.srsCode; this.srsAuth = 'epsg'; this.srsProjNumber = this.srsCode.substring(5); } else if (this.srsCode.indexOf("IGNF") == 0) { this.srsCode = this.srsCode; this.srsAuth = 'IGNF'; this.srsProjNumber = this.srsCode.substring(5); } else if (this.srsCode.indexOf("CRS") == 0) { this.srsCode = this.srsCode; this.srsAuth = 'CRS'; this.srsProjNumber = this.srsCode.substring(4); } else { this.srsAuth = ''; this.srsProjNumber = this.srsCode; }
    this.loadProjDefinition();
  }, loadProjDefinition: function () {
    if (Proj4js.defs[this.srsCode]) { this.defsLoaded(); return; }
    var url = Proj4js.getScriptLocation() + 'defs/' + this.srsAuth.toUpperCase() + this.srsProjNumber + '.js'; Proj4js.loadScript(url, Proj4js.bind(this.defsLoaded, this), Proj4js.bind(this.loadFromService, this), Proj4js.bind(this.checkDefsLoaded, this));
  }, loadFromService: function () { var url = Proj4js.defsLookupService + '/' + this.srsAuth + '/' + this.srsProjNumber + '/proj4js/'; Proj4js.loadScript(url, Proj4js.bind(this.defsLoaded, this), Proj4js.bind(this.defsFailed, this), Proj4js.bind(this.checkDefsLoaded, this)); }, defsLoaded: function () { this.parseDefs(); this.loadProjCode(this.projName); }, checkDefsLoaded: function () { if (Proj4js.defs[this.srsCode]) { return true; } else { return false; } }, defsFailed: function () { Proj4js.reportError('failed to load projection definition for: ' + this.srsCode); Proj4js.defs[this.srsCode] = Proj4js.defs['WGS84']; this.defsLoaded(); }, loadProjCode: function (projName) {
    if (Proj4js.Proj[projName]) { this.initTransforms(); return; }
    var url = Proj4js.getScriptLocation() + 'projCode/' + projName + '.js'; Proj4js.loadScript(url, Proj4js.bind(this.loadProjCodeSuccess, this, projName), Proj4js.bind(this.loadProjCodeFailure, this, projName), Proj4js.bind(this.checkCodeLoaded, this, projName));
  }, loadProjCodeSuccess: function (projName) { if (Proj4js.Proj[projName].dependsOn) { this.loadProjCode(Proj4js.Proj[projName].dependsOn); } else { this.initTransforms(); } }, loadProjCodeFailure: function (projName) { Proj4js.reportError("failed to find projection file for: " + projName); }, checkCodeLoaded: function (projName) { if (Proj4js.Proj[projName]) { return true; } else { return false; } }, initTransforms: function () { Proj4js.extend(this, Proj4js.Proj[this.projName]); this.init(); this.readyToUse = true; if (this.queue) { var item; while ((item = this.queue.shift())) { item.call(this, this); } } }, wktRE: /^(\w+)\[(.*)\]$/, parseWKT: function (wkt) {
    var wktMatch = wkt.match(this.wktRE); if (!wktMatch) return; var wktObject = wktMatch[1]; var wktContent = wktMatch[2]; var wktTemp = wktContent.split(","); var wktName; if (wktObject.toUpperCase() == "TOWGS84") { wktName = wktObject; } else { wktName = wktTemp.shift(); }
    wktName = wktName.replace(/^\"/, ""); wktName = wktName.replace(/\"$/, ""); var wktArray = new Array(); var bkCount = 0; var obj = ""; for (var i = 0; i < wktTemp.length; ++i) {
      var token = wktTemp[i]; for (var j = 0; j < token.length; ++j) { if (token.charAt(j) == "[") ++bkCount; if (token.charAt(j) == "]") --bkCount; }
      obj += token; if (bkCount === 0) { wktArray.push(obj); obj = ""; } else { obj += ","; }
    }
    switch (wktObject) {
      case 'LOCAL_CS': this.projName = 'identity'
        this.localCS = true; this.srsCode = wktName; break; case 'GEOGCS': this.projName = 'longlat'
        this.geocsCode = wktName; if (!this.srsCode) this.srsCode = wktName; break; case 'PROJCS': this.srsCode = wktName; break; case 'GEOCCS': break; case 'PROJECTION': this.projName = Proj4js.wktProjections[wktName]
        break; case 'DATUM': this.datumName = wktName; break; case 'LOCAL_DATUM': this.datumCode = 'none'; break; case 'SPHEROID': this.ellps = wktName; this.a = parseFloat(wktArray.shift()); this.rf = parseFloat(wktArray.shift()); break; case 'PRIMEM': this.from_greenwich = parseFloat(wktArray.shift()); break; case 'UNIT': this.units = wktName; this.unitsPerMeter = parseFloat(wktArray.shift()); break; case 'PARAMETER': var name = wktName.toLowerCase(); var value = parseFloat(wktArray.shift()); switch (name) { case 'false_easting': this.x0 = value; break; case 'false_northing': this.y0 = value; break; case 'scale_factor': this.k0 = value; break; case 'central_meridian': this.long0 = value * Proj4js.common.D2R; break; case 'latitude_of_origin': this.lat0 = value * Proj4js.common.D2R; break; case 'more_here': break; default: break; }
        break; case 'TOWGS84': this.datum_params = wktArray; break; case 'AXIS': var name = wktName.toLowerCase(); var value = wktArray.shift(); switch (value) { case 'EAST': value = 'e'; break; case 'WEST': value = 'w'; break; case 'NORTH': value = 'n'; break; case 'SOUTH': value = 's'; break; case 'UP': value = 'u'; break; case 'DOWN': value = 'd'; break; case 'OTHER': default: value = ' '; break; }
        if (!this.axis) { this.axis = "enu"; }
        switch (name) { case 'X': this.axis = value + this.axis.substr(1, 2); break; case 'Y': this.axis = this.axis.substr(0, 1) + value + this.axis.substr(2, 1); break; case 'Z': this.axis = this.axis.substr(0, 2) + value; break; default: break; }
      case 'MORE_HERE': break; default: break;
    }
    for (var i = 0; i < wktArray.length; ++i) { this.parseWKT(wktArray[i]); }
  }, parseDefs: function () {
    this.defData = Proj4js.defs[this.srsCode]; var paramName, paramVal; if (!this.defData) { return; }
    var paramArray = this.defData.split("+"); for (var prop = 0; prop < paramArray.length; prop++) {
      var property = paramArray[prop].split("="); paramName = property[0].toLowerCase(); paramVal = property[1]; switch (paramName.replace(/\s/gi, "")) {
        case "": break; case "title": this.title = paramVal; break; case "proj": this.projName = paramVal.replace(/\s/gi, ""); break; case "units": this.units = paramVal.replace(/\s/gi, ""); break; case "datum": this.datumCode = paramVal.replace(/\s/gi, ""); break; case "nadgrids": this.nagrids = paramVal.replace(/\s/gi, ""); break; case "ellps": this.ellps = paramVal.replace(/\s/gi, ""); break; case "a": this.a = parseFloat(paramVal); break; case "b": this.b = parseFloat(paramVal); break; case "rf": this.rf = parseFloat(paramVal); break; case "lat_0": this.lat0 = paramVal * Proj4js.common.D2R; break; case "lat_1": this.lat1 = paramVal * Proj4js.common.D2R; break; case "lat_2": this.lat2 = paramVal * Proj4js.common.D2R; break; case "lat_ts": this.lat_ts = paramVal * Proj4js.common.D2R; break; case "lon_0": this.long0 = paramVal * Proj4js.common.D2R; break; case "alpha": this.alpha = parseFloat(paramVal) * Proj4js.common.D2R; break; case "lonc": this.longc = paramVal * Proj4js.common.D2R; break; case "x_0": this.x0 = parseFloat(paramVal); break; case "y_0": this.y0 = parseFloat(paramVal); break; case "k_0": this.k0 = parseFloat(paramVal); break; case "k": this.k0 = parseFloat(paramVal); break; case "r_a": this.R_A = true; break; case "zone": this.zone = parseInt(paramVal); break; case "south": this.utmSouth = true; break; case "towgs84": this.datum_params = paramVal.split(","); break; case "to_meter": this.to_meter = parseFloat(paramVal); break; case "from_greenwich": this.from_greenwich = paramVal * Proj4js.common.D2R; break; case "pm": paramVal = paramVal.replace(/\s/gi, ""); this.from_greenwich = Proj4js.PrimeMeridian[paramVal] ? Proj4js.PrimeMeridian[paramVal] : parseFloat(paramVal); this.from_greenwich *= Proj4js.common.D2R; break; case "axis": paramVal = paramVal.replace(/\s/gi, ""); var legalAxis = "ewnsud"; if (paramVal.length == 3 && legalAxis.indexOf(paramVal.substr(0, 1)) != -1 && legalAxis.indexOf(paramVal.substr(1, 1)) != -1 && legalAxis.indexOf(paramVal.substr(2, 1)) != -1) { this.axis = paramVal; }
          break
        case "no_defs": break; default:
      }
    }
    this.deriveConstants();
  }, deriveConstants: function () {
    if (this.nagrids == '@null') this.datumCode = 'none'; if (this.datumCode && this.datumCode != 'none') { var datumDef = Proj4js.Datum[this.datumCode]; if (datumDef) { this.datum_params = datumDef.towgs84 ? datumDef.towgs84.split(',') : null; this.ellps = datumDef.ellipse; this.datumName = datumDef.datumName ? datumDef.datumName : this.datumCode; } }
    if (!this.a) { var ellipse = Proj4js.Ellipsoid[this.ellps] ? Proj4js.Ellipsoid[this.ellps] : Proj4js.Ellipsoid['WGS84']; Proj4js.extend(this, ellipse); }
    if (this.rf && !this.b) this.b = (1.0 - 1.0 / this.rf) * this.a; if (Math.abs(this.a - this.b) < Proj4js.common.EPSLN) { this.sphere = true; this.b = this.a; }
    this.a2 = this.a * this.a; this.b2 = this.b * this.b; this.es = (this.a2 - this.b2) / this.a2; this.e = Math.sqrt(this.es); if (this.R_A) { this.a *= 1. - this.es * (Proj4js.common.SIXTH + this.es * (Proj4js.common.RA4 + this.es * Proj4js.common.RA6)); this.a2 = this.a * this.a; this.b2 = this.b * this.b; this.es = 0.; }
    this.ep2 = (this.a2 - this.b2) / this.b2; if (!this.k0) this.k0 = 1.0; if (!this.axis) { this.axis = "enu"; }
    this.datum = new Proj4js.datum(this);
  }
}); Proj4js.Proj.longlat = { init: function () { }, forward: function (pt) { return pt; }, inverse: function (pt) { return pt; } }; Proj4js.Proj.identity = Proj4js.Proj.longlat; Proj4js.defs = { 'WGS84': "+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees", 'EPSG:4326': "+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees", 'EPSG:4269': "+title=long/lat:NAD83 +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees", 'EPSG:3785': "+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs" }; Proj4js.defs['GOOGLE'] = Proj4js.defs['EPSG:3785']; Proj4js.defs['EPSG:900913'] = Proj4js.defs['EPSG:3785']; Proj4js.defs['EPSG:102113'] = Proj4js.defs['EPSG:3785']; Proj4js.common = {
  PI: 3.141592653589793238, HALF_PI: 1.570796326794896619, TWO_PI: 6.283185307179586477, FORTPI: 0.78539816339744833, R2D: 57.29577951308232088, D2R: 0.01745329251994329577, SEC_TO_RAD: 4.84813681109535993589914102357e-6, EPSLN: 1.0e-10, MAX_ITER: 20, COS_67P5: 0.38268343236508977, AD_C: 1.0026000, PJD_UNKNOWN: 0, PJD_3PARAM: 1, PJD_7PARAM: 2, PJD_GRIDSHIFT: 3, PJD_WGS84: 4, PJD_NODATUM: 5, SRS_WGS84_SEMIMAJOR: 6378137.0, SIXTH: .1666666666666666667, RA4: .04722222222222222222, RA6: .02215608465608465608, RV4: .06944444444444444444, RV6: .04243827160493827160, msfnz: function (eccent, sinphi, cosphi) { var con = eccent * sinphi; return cosphi / (Math.sqrt(1.0 - con * con)); }, tsfnz: function (eccent, phi, sinphi) { var con = eccent * sinphi; var com = .5 * eccent; con = Math.pow(((1.0 - con) / (1.0 + con)), com); return (Math.tan(.5 * (this.HALF_PI - phi)) / con); }, phi2z: function (eccent, ts) {
    var eccnth = .5 * eccent; var con, dphi; var phi = this.HALF_PI - 2 * Math.atan(ts); for (var i = 0; i <= 15; i++) { con = eccent * Math.sin(phi); dphi = this.HALF_PI - 2 * Math.atan(ts * (Math.pow(((1.0 - con) / (1.0 + con)), eccnth))) - phi; phi += dphi; if (Math.abs(dphi) <= .0000000001) return phi; }
    alert("phi2z has NoConvergence"); return (-9999);
  }, qsfnz: function (eccent, sinphi) { var con; if (eccent > 1.0e-7) { con = eccent * sinphi; return ((1.0 - eccent * eccent) * (sinphi / (1.0 - con * con) - (.5 / eccent) * Math.log((1.0 - con) / (1.0 + con)))); } else { return (2.0 * sinphi); } }, asinz: function (x) {
    if (Math.abs(x) > 1.0) { x = (x > 1.0) ? 1.0 : -1.0; }
    return Math.asin(x);
  }, e0fn: function (x) { return (1.0 - 0.25 * x * (1.0 + x / 16.0 * (3.0 + 1.25 * x))); }, e1fn: function (x) { return (0.375 * x * (1.0 + 0.25 * x * (1.0 + 0.46875 * x))); }, e2fn: function (x) { return (0.05859375 * x * x * (1.0 + 0.75 * x)); }, e3fn: function (x) { return (x * x * x * (35.0 / 3072.0)); }, mlfn: function (e0, e1, e2, e3, phi) { return (e0 * phi - e1 * Math.sin(2.0 * phi) + e2 * Math.sin(4.0 * phi) - e3 * Math.sin(6.0 * phi)); }, srat: function (esinp, exp) { return (Math.pow((1.0 - esinp) / (1.0 + esinp), exp)); }, sign: function (x) { if (x < 0.0) return (-1); else return (1); }, adjust_lon: function (x) { x = (Math.abs(x) < this.PI) ? x : (x - (this.sign(x) * this.TWO_PI)); return x; }, adjust_lat: function (x) { x = (Math.abs(x) < this.HALF_PI) ? x : (x - (this.sign(x) * this.PI)); return x; }, latiso: function (eccent, phi, sinphi) { if (Math.abs(phi) > this.HALF_PI) return +Number.NaN; if (phi == this.HALF_PI) return Number.POSITIVE_INFINITY; if (phi == -1.0 * this.HALF_PI) return -1.0 * Number.POSITIVE_INFINITY; var con = eccent * sinphi; return Math.log(Math.tan((this.HALF_PI + phi) / 2.0)) + eccent * Math.log((1.0 - con) / (1.0 + con)) / 2.0; }, fL: function (x, L) { return 2.0 * Math.atan(x * Math.exp(L)) - this.HALF_PI; }, invlatiso: function (eccent, ts) { var phi = this.fL(1.0, ts); var Iphi = 0.0; var con = 0.0; do { Iphi = phi; con = eccent * Math.sin(Iphi); phi = this.fL(Math.exp(eccent * Math.log((1.0 + con) / (1.0 - con)) / 2.0), ts) } while (Math.abs(phi - Iphi) > 1.0e-12); return phi; }, sinh: function (x) { var r = Math.exp(x); r = (r - 1.0 / r) / 2.0; return r; }, cosh: function (x) { var r = Math.exp(x); r = (r + 1.0 / r) / 2.0; return r; }, tanh: function (x) { var r = Math.exp(x); r = (r - 1.0 / r) / (r + 1.0 / r); return r; }, asinh: function (x) { var s = (x >= 0 ? 1.0 : -1.0); return s * (Math.log(Math.abs(x) + Math.sqrt(x * x + 1.0))); }, acosh: function (x) { return 2.0 * Math.log(Math.sqrt((x + 1.0) / 2.0) + Math.sqrt((x - 1.0) / 2.0)); }, atanh: function (x) { return Math.log((x - 1.0) / (x + 1.0)) / 2.0; }, gN: function (a, e, sinphi) { var temp = e * sinphi; return a / Math.sqrt(1.0 - temp * temp); }
}; Proj4js.datum = Proj4js.Class({
  initialize: function (proj) {
    this.datum_type = Proj4js.common.PJD_WGS84; if (proj.datumCode && proj.datumCode == 'none') { this.datum_type = Proj4js.common.PJD_NODATUM; }
    if (proj && proj.datum_params) {
      for (var i = 0; i < proj.datum_params.length; i++) { proj.datum_params[i] = parseFloat(proj.datum_params[i]); }
      if (proj.datum_params[0] != 0 || proj.datum_params[1] != 0 || proj.datum_params[2] != 0) { this.datum_type = Proj4js.common.PJD_3PARAM; }
      if (proj.datum_params.length > 3) { if (proj.datum_params[3] != 0 || proj.datum_params[4] != 0 || proj.datum_params[5] != 0 || proj.datum_params[6] != 0) { this.datum_type = Proj4js.common.PJD_7PARAM; proj.datum_params[3] *= Proj4js.common.SEC_TO_RAD; proj.datum_params[4] *= Proj4js.common.SEC_TO_RAD; proj.datum_params[5] *= Proj4js.common.SEC_TO_RAD; proj.datum_params[6] = (proj.datum_params[6] / 1000000.0) + 1.0; } }
    }
    if (proj) { this.a = proj.a; this.b = proj.b; this.es = proj.es; this.ep2 = proj.ep2; this.datum_params = proj.datum_params; }
  }, compare_datums: function (dest) { if (this.datum_type != dest.datum_type) { return false; } else if (this.a != dest.a || Math.abs(this.es - dest.es) > 0.000000000050) { return false; } else if (this.datum_type == Proj4js.common.PJD_3PARAM) { return (this.datum_params[0] == dest.datum_params[0] && this.datum_params[1] == dest.datum_params[1] && this.datum_params[2] == dest.datum_params[2]); } else if (this.datum_type == Proj4js.common.PJD_7PARAM) { return (this.datum_params[0] == dest.datum_params[0] && this.datum_params[1] == dest.datum_params[1] && this.datum_params[2] == dest.datum_params[2] && this.datum_params[3] == dest.datum_params[3] && this.datum_params[4] == dest.datum_params[4] && this.datum_params[5] == dest.datum_params[5] && this.datum_params[6] == dest.datum_params[6]); } else if (this.datum_type == Proj4js.common.PJD_GRIDSHIFT) { return strcmp(pj_param(this.params, "snadgrids").s, pj_param(dest.params, "snadgrids").s) == 0; } else { return true; } }, geodetic_to_geocentric: function (p) {
    var Longitude = p.x; var Latitude = p.y; var Height = p.z ? p.z : 0; var X; var Y; var Z; var Error_Code = 0; var Rn; var Sin_Lat; var Sin2_Lat; var Cos_Lat; if (Latitude < -Proj4js.common.HALF_PI && Latitude > -1.001 * Proj4js.common.HALF_PI) { Latitude = -Proj4js.common.HALF_PI; } else if (Latitude > Proj4js.common.HALF_PI && Latitude < 1.001 * Proj4js.common.HALF_PI) { Latitude = Proj4js.common.HALF_PI; } else if ((Latitude < -Proj4js.common.HALF_PI) || (Latitude > Proj4js.common.HALF_PI)) { Proj4js.reportError('geocent:lat out of range:' + Latitude); return null; }
    if (Longitude > Proj4js.common.PI) Longitude -= (2 * Proj4js.common.PI); Sin_Lat = Math.sin(Latitude); Cos_Lat = Math.cos(Latitude); Sin2_Lat = Sin_Lat * Sin_Lat; Rn = this.a / (Math.sqrt(1.0e0 - this.es * Sin2_Lat)); X = (Rn + Height) * Cos_Lat * Math.cos(Longitude); Y = (Rn + Height) * Cos_Lat * Math.sin(Longitude); Z = ((Rn * (1 - this.es)) + Height) * Sin_Lat; p.x = X; p.y = Y; p.z = Z; return Error_Code;
  }, geocentric_to_geodetic: function (p) {
    var genau = 1.E-12; var genau2 = (genau * genau); var maxiter = 30; var P; var RR; var CT; var ST; var RX; var RK; var RN; var CPHI0; var SPHI0; var CPHI; var SPHI; var SDPHI; var At_Pole; var iter; var X = p.x; var Y = p.y; var Z = p.z ? p.z : 0.0; var Longitude; var Latitude; var Height; At_Pole = false; P = Math.sqrt(X * X + Y * Y); RR = Math.sqrt(X * X + Y * Y + Z * Z); if (P / this.a < genau) { At_Pole = true; Longitude = 0.0; if (RR / this.a < genau) { Latitude = Proj4js.common.HALF_PI; Height = -this.b; return; } } else { Longitude = Math.atan2(Y, X); }
    CT = Z / RR; ST = P / RR; RX = 1.0 / Math.sqrt(1.0 - this.es * (2.0 - this.es) * ST * ST); CPHI0 = ST * (1.0 - this.es) * RX; SPHI0 = CT * RX; iter = 0; do { iter++; RN = this.a / Math.sqrt(1.0 - this.es * SPHI0 * SPHI0); Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - this.es * SPHI0 * SPHI0); RK = this.es * RN / (RN + Height); RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST); CPHI = ST * (1.0 - RK) * RX; SPHI = CT * RX; SDPHI = SPHI * CPHI0 - CPHI * SPHI0; CPHI0 = CPHI; SPHI0 = SPHI; }
    while (SDPHI * SDPHI > genau2 && iter < maxiter); Latitude = Math.atan(SPHI / Math.abs(CPHI)); p.x = Longitude; p.y = Latitude; p.z = Height; return p;
  }, geocentric_to_geodetic_noniter: function (p) {
    var X = p.x; var Y = p.y; var Z = p.z ? p.z : 0; var Longitude; var Latitude; var Height; var W; var W2; var T0; var T1; var S0; var S1; var Sin_B0; var Sin3_B0; var Cos_B0; var Sin_p1; var Cos_p1; var Rn; var Sum; var At_Pole; X = parseFloat(X); Y = parseFloat(Y); Z = parseFloat(Z); At_Pole = false; if (X != 0.0) { Longitude = Math.atan2(Y, X); }
    else {
      if (Y > 0) { Longitude = Proj4js.common.HALF_PI; }
      else if (Y < 0) { Longitude = -Proj4js.common.HALF_PI; }
      else {
        At_Pole = true; Longitude = 0.0; if (Z > 0.0) { Latitude = Proj4js.common.HALF_PI; }
        else if (Z < 0.0) { Latitude = -Proj4js.common.HALF_PI; }
        else { Latitude = Proj4js.common.HALF_PI; Height = -this.b; return; }
      }
    }
    W2 = X * X + Y * Y; W = Math.sqrt(W2); T0 = Z * Proj4js.common.AD_C; S0 = Math.sqrt(T0 * T0 + W2); Sin_B0 = T0 / S0; Cos_B0 = W / S0; Sin3_B0 = Sin_B0 * Sin_B0 * Sin_B0; T1 = Z + this.b * this.ep2 * Sin3_B0; Sum = W - this.a * this.es * Cos_B0 * Cos_B0 * Cos_B0; S1 = Math.sqrt(T1 * T1 + Sum * Sum); Sin_p1 = T1 / S1; Cos_p1 = Sum / S1; Rn = this.a / Math.sqrt(1.0 - this.es * Sin_p1 * Sin_p1); if (Cos_p1 >= Proj4js.common.COS_67P5) { Height = W / Cos_p1 - Rn; }
    else if (Cos_p1 <= -Proj4js.common.COS_67P5) { Height = W / -Cos_p1 - Rn; }
    else { Height = Z / Sin_p1 + Rn * (this.es - 1.0); }
    if (At_Pole == false) { Latitude = Math.atan(Sin_p1 / Cos_p1); }
    p.x = Longitude; p.y = Latitude; p.z = Height; return p;
  }, geocentric_to_wgs84: function (p) {
    if (this.datum_type == Proj4js.common.PJD_3PARAM) { p.x += this.datum_params[0]; p.y += this.datum_params[1]; p.z += this.datum_params[2]; }
    else if (this.datum_type == Proj4js.common.PJD_7PARAM) { var Dx_BF = this.datum_params[0]; var Dy_BF = this.datum_params[1]; var Dz_BF = this.datum_params[2]; var Rx_BF = this.datum_params[3]; var Ry_BF = this.datum_params[4]; var Rz_BF = this.datum_params[5]; var M_BF = this.datum_params[6]; var x_out = M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF; var y_out = M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF; var z_out = M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF; p.x = x_out; p.y = y_out; p.z = z_out; }
  }, geocentric_from_wgs84: function (p) {
    if (this.datum_type == Proj4js.common.PJD_3PARAM) { p.x -= this.datum_params[0]; p.y -= this.datum_params[1]; p.z -= this.datum_params[2]; }
    else if (this.datum_type == Proj4js.common.PJD_7PARAM) { var Dx_BF = this.datum_params[0]; var Dy_BF = this.datum_params[1]; var Dz_BF = this.datum_params[2]; var Rx_BF = this.datum_params[3]; var Ry_BF = this.datum_params[4]; var Rz_BF = this.datum_params[5]; var M_BF = this.datum_params[6]; var x_tmp = (p.x - Dx_BF) / M_BF; var y_tmp = (p.y - Dy_BF) / M_BF; var z_tmp = (p.z - Dz_BF) / M_BF; p.x = x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp; p.y = -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp; p.z = Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp; }
  }
}); Proj4js.Point = Proj4js.Class({ initialize: function (x, y, z) { if (typeof x == 'object') { this.x = x[0]; this.y = x[1]; this.z = x[2] || 0.0; } else if (typeof x == 'string' && typeof y == 'undefined') { var coords = x.split(','); this.x = parseFloat(coords[0]); this.y = parseFloat(coords[1]); this.z = parseFloat(coords[2]) || 0.0; } else { this.x = x; this.y = y; this.z = z || 0.0; } }, clone: function () { return new Proj4js.Point(this.x, this.y, this.z); }, toString: function () { return ("x=" + this.x + ",y=" + this.y); }, toShortString: function () { return (this.x + ", " + this.y); } }); Proj4js.PrimeMeridian = { "greenwich": 0.0, "lisbon": -9.131906111111, "paris": 2.337229166667, "bogota": -74.080916666667, "madrid": -3.687938888889, "rome": 12.452333333333, "bern": 7.439583333333, "jakarta": 106.807719444444, "ferro": -17.666666666667, "brussels": 4.367975, "stockholm": 18.058277777778, "athens": 23.7163375, "oslo": 10.722916666667 }; Proj4js.Ellipsoid = { "MERIT": { a: 6378137.0, rf: 298.257, ellipseName: "MERIT 1983" }, "SGS85": { a: 6378136.0, rf: 298.257, ellipseName: "Soviet Geodetic System 85" }, "GRS80": { a: 6378137.0, rf: 298.257222101, ellipseName: "GRS 1980(IUGG, 1980)" }, "IAU76": { a: 6378140.0, rf: 298.257, ellipseName: "IAU 1976" }, "airy": { a: 6377563.396, b: 6356256.910, ellipseName: "Airy 1830" }, "APL4.": { a: 6378137, rf: 298.25, ellipseName: "Appl. Physics. 1965" }, "NWL9D": { a: 6378145.0, rf: 298.25, ellipseName: "Naval Weapons Lab., 1965" }, "mod_airy": { a: 6377340.189, b: 6356034.446, ellipseName: "Modified Airy" }, "andrae": { a: 6377104.43, rf: 300.0, ellipseName: "Andrae 1876 (Den., Iclnd.)" }, "aust_SA": { a: 6378160.0, rf: 298.25, ellipseName: "Australian Natl & S. Amer. 1969" }, "GRS67": { a: 6378160.0, rf: 298.2471674270, ellipseName: "GRS 67(IUGG 1967)" }, "bessel": { a: 6377397.155, rf: 299.1528128, ellipseName: "Bessel 1841" }, "bess_nam": { a: 6377483.865, rf: 299.1528128, ellipseName: "Bessel 1841 (Namibia)" }, "clrk66": { a: 6378206.4, b: 6356583.8, ellipseName: "Clarke 1866" }, "clrk80": { a: 6378249.145, rf: 293.4663, ellipseName: "Clarke 1880 mod." }, "CPM": { a: 6375738.7, rf: 334.29, ellipseName: "Comm. des Poids et Mesures 1799" }, "delmbr": { a: 6376428.0, rf: 311.5, ellipseName: "Delambre 1810 (Belgium)" }, "engelis": { a: 6378136.05, rf: 298.2566, ellipseName: "Engelis 1985" }, "evrst30": { a: 6377276.345, rf: 300.8017, ellipseName: "Everest 1830" }, "evrst48": { a: 6377304.063, rf: 300.8017, ellipseName: "Everest 1948" }, "evrst56": { a: 6377301.243, rf: 300.8017, ellipseName: "Everest 1956" }, "evrst69": { a: 6377295.664, rf: 300.8017, ellipseName: "Everest 1969" }, "evrstSS": { a: 6377298.556, rf: 300.8017, ellipseName: "Everest (Sabah & Sarawak)" }, "fschr60": { a: 6378166.0, rf: 298.3, ellipseName: "Fischer (Mercury Datum) 1960" }, "fschr60m": { a: 6378155.0, rf: 298.3, ellipseName: "Fischer 1960" }, "fschr68": { a: 6378150.0, rf: 298.3, ellipseName: "Fischer 1968" }, "helmert": { a: 6378200.0, rf: 298.3, ellipseName: "Helmert 1906" }, "hough": { a: 6378270.0, rf: 297.0, ellipseName: "Hough" }, "intl": { a: 6378388.0, rf: 297.0, ellipseName: "International 1909 (Hayford)" }, "kaula": { a: 6378163.0, rf: 298.24, ellipseName: "Kaula 1961" }, "lerch": { a: 6378139.0, rf: 298.257, ellipseName: "Lerch 1979" }, "mprts": { a: 6397300.0, rf: 191.0, ellipseName: "Maupertius 1738" }, "new_intl": { a: 6378157.5, b: 6356772.2, ellipseName: "New International 1967" }, "plessis": { a: 6376523.0, rf: 6355863.0, ellipseName: "Plessis 1817 (France)" }, "krass": { a: 6378245.0, rf: 298.3, ellipseName: "Krassovsky, 1942" }, "SEasia": { a: 6378155.0, b: 6356773.3205, ellipseName: "Southeast Asia" }, "walbeck": { a: 6376896.0, b: 6355834.8467, ellipseName: "Walbeck" }, "WGS60": { a: 6378165.0, rf: 298.3, ellipseName: "WGS 60" }, "WGS66": { a: 6378145.0, rf: 298.25, ellipseName: "WGS 66" }, "WGS72": { a: 6378135.0, rf: 298.26, ellipseName: "WGS 72" }, "WGS84": { a: 6378137.0, rf: 298.257223563, ellipseName: "WGS 84" }, "sphere": { a: 6370997.0, b: 6370997.0, ellipseName: "Normal Sphere (r=6370997)" } }; Proj4js.Datum = { "WGS84": { towgs84: "0,0,0", ellipse: "WGS84", datumName: "WGS84" }, "GGRS87": { towgs84: "-199.87,74.79,246.62", ellipse: "GRS80", datumName: "Greek_Geodetic_Reference_System_1987" }, "NAD83": { towgs84: "0,0,0", ellipse: "GRS80", datumName: "North_American_Datum_1983" }, "NAD27": { nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat", ellipse: "clrk66", datumName: "North_American_Datum_1927" }, "potsdam": { towgs84: "606.0,23.0,413.0", ellipse: "bessel", datumName: "Potsdam Rauenberg 1950 DHDN" }, "carthage": { towgs84: "-263.0,6.0,431.0", ellipse: "clark80", datumName: "Carthage 1934 Tunisia" }, "hermannskogel": { towgs84: "653.0,-212.0,449.0", ellipse: "bessel", datumName: "Hermannskogel" }, "ire65": { towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15", ellipse: "mod_airy", datumName: "Ireland 1965" }, "nzgd49": { towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993", ellipse: "intl", datumName: "New Zealand Geodetic Datum 1949" }, "OSGB36": { towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894", ellipse: "airy", datumName: "Airy 1830" } }; Proj4js.WGS84 = new Proj4js.Proj('WGS84'); Proj4js.Datum['OSB36'] = Proj4js.Datum['OSGB36']; Proj4js.wktProjections = { "Lambert Tangential Conformal Conic Projection": "lcc", "Mercator": "merc", "Popular Visualisation Pseudo Mercator": "merc", "Transverse_Mercator": "tmerc", "Transverse Mercator": "tmerc", "Lambert Azimuthal Equal Area": "laea", "Universal Transverse Mercator System": "utm" }; Proj4js.Proj.aea = {
  init: function () {
    if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) { Proj4js.reportError("aeaInitEqualLatitudes"); return; }
    this.temp = this.b / this.a; this.es = 1.0 - Math.pow(this.temp, 2); this.e3 = Math.sqrt(this.es); this.sin_po = Math.sin(this.lat1); this.cos_po = Math.cos(this.lat1); this.t1 = this.sin_po; this.con = this.sin_po; this.ms1 = Proj4js.common.msfnz(this.e3, this.sin_po, this.cos_po); this.qs1 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po); this.sin_po = Math.sin(this.lat2); this.cos_po = Math.cos(this.lat2); this.t2 = this.sin_po; this.ms2 = Proj4js.common.msfnz(this.e3, this.sin_po, this.cos_po); this.qs2 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po); this.sin_po = Math.sin(this.lat0); this.cos_po = Math.cos(this.lat0); this.t3 = this.sin_po; this.qs0 = Proj4js.common.qsfnz(this.e3, this.sin_po, this.cos_po); if (Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN) { this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1); } else { this.ns0 = this.con; }
    this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1; this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
  }, forward: function (p) { var lon = p.x; var lat = p.y; this.sin_phi = Math.sin(lat); this.cos_phi = Math.cos(lat); var qs = Proj4js.common.qsfnz(this.e3, this.sin_phi, this.cos_phi); var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0; var theta = this.ns0 * Proj4js.common.adjust_lon(lon - this.long0); var x = rh1 * Math.sin(theta) + this.x0; var y = this.rh - rh1 * Math.cos(theta) + this.y0; p.x = x; p.y = y; return p; }, inverse: function (p) {
    var rh1, qs, con, theta, lon, lat; p.x -= this.x0; p.y = this.rh - p.y + this.y0; if (this.ns0 >= 0) { rh1 = Math.sqrt(p.x * p.x + p.y * p.y); con = 1.0; } else { rh1 = -Math.sqrt(p.x * p.x + p.y * p.y); con = -1.0; }
    theta = 0.0; if (rh1 != 0.0) { theta = Math.atan2(con * p.x, con * p.y); }
    con = rh1 * this.ns0 / this.a; qs = (this.c - con * con) / this.ns0; if (this.e3 >= 1e-10) { con = 1 - .5 * (1.0 - this.es) * Math.log((1.0 - this.e3) / (1.0 + this.e3)) / this.e3; if (Math.abs(Math.abs(con) - Math.abs(qs)) > .0000000001) { lat = this.phi1z(this.e3, qs); } else { if (qs >= 0) { lat = .5 * PI; } else { lat = -.5 * PI; } } } else { lat = this.phi1z(e3, qs); }
    lon = Proj4js.common.adjust_lon(theta / this.ns0 + this.long0); p.x = lon; p.y = lat; return p;
  }, phi1z: function (eccent, qs) {
    var con, com, dphi; var phi = Proj4js.common.asinz(.5 * qs); if (eccent < Proj4js.common.EPSLN) return phi; var eccnts = eccent * eccent; for (var i = 1; i <= 25; i++) { sinphi = Math.sin(phi); cosphi = Math.cos(phi); con = eccent * sinphi; com = 1.0 - con * con; dphi = .5 * com * com / cosphi * (qs / (1.0 - eccnts) - sinphi / com + .5 / eccent * Math.log((1.0 - con) / (1.0 + con))); phi = phi + dphi; if (Math.abs(dphi) <= 1e-7) return phi; }
    Proj4js.reportError("aea:phi1z:Convergence error"); return null;
  }
}; Proj4js.Proj.sterea = {
  dependsOn: 'gauss', init: function () {
    Proj4js.Proj['gauss'].init.apply(this); if (!this.rc) { Proj4js.reportError("sterea:init:E_ERROR_0"); return; }
    this.sinc0 = Math.sin(this.phic0); this.cosc0 = Math.cos(this.phic0); this.R2 = 2.0 * this.rc; if (!this.title) this.title = "Oblique Stereographic Alternative";
  }, forward: function (p) { p.x = Proj4js.common.adjust_lon(p.x - this.long0); Proj4js.Proj['gauss'].forward.apply(this, [p]); sinc = Math.sin(p.y); cosc = Math.cos(p.y); cosl = Math.cos(p.x); k = this.k0 * this.R2 / (1.0 + this.sinc0 * sinc + this.cosc0 * cosc * cosl); p.x = k * cosc * Math.sin(p.x); p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl); p.x = this.a * p.x + this.x0; p.y = this.a * p.y + this.y0; return p; }, inverse: function (p) {
    var lon, lat; p.x = (p.x - this.x0) / this.a; p.y = (p.y - this.y0) / this.a; p.x /= this.k0; p.y /= this.k0; if ((rho = Math.sqrt(p.x * p.x + p.y * p.y))) { c = 2.0 * Math.atan2(rho, this.R2); sinc = Math.sin(c); cosc = Math.cos(c); lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho); lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc); } else { lat = this.phic0; lon = 0.; }
    p.x = lon; p.y = lat; Proj4js.Proj['gauss'].inverse.apply(this, [p]); p.x = Proj4js.common.adjust_lon(p.x + this.long0); return p;
  }
}; function phi4z(eccent, e0, e1, e2, e3, a, b, c, phi) {
  var sinphi, sin2ph, tanph, ml, mlp, con1, con2, con3, dphi, i; phi = a; for (i = 1; i <= 15; i++) { sinphi = Math.sin(phi); tanphi = Math.tan(phi); c = tanphi * Math.sqrt(1.0 - eccent * sinphi * sinphi); sin2ph = Math.sin(2.0 * phi); ml = e0 * phi - e1 * sin2ph + e2 * Math.sin(4.0 * phi) - e3 * Math.sin(6.0 * phi); mlp = e0 - 2.0 * e1 * Math.cos(2.0 * phi) + 4.0 * e2 * Math.cos(4.0 * phi) - 6.0 * e3 * Math.cos(6.0 * phi); con1 = 2.0 * ml + c * (ml * ml + b) - 2.0 * a * (c * ml + 1.0); con2 = eccent * sin2ph * (ml * ml + b - 2.0 * a * ml) / (2.0 * c); con3 = 2.0 * (a - ml) * (c * mlp - 2.0 / sin2ph) - 2.0 * mlp; dphi = con1 / (con2 + con3); phi += dphi; if (Math.abs(dphi) <= .0000000001) return (phi); }
  Proj4js.reportError("phi4z: No convergence"); return null;
}
function e4fn(x) { var con, com; con = 1.0 + x; com = 1.0 - x; return (Math.sqrt((Math.pow(con, con)) * (Math.pow(com, com)))); }
Proj4js.Proj.poly = {
  init: function () { var temp; if (this.lat0 = 0) this.lat0 = 90; this.temp = this.b / this.a; this.es = 1.0 - Math.pow(this.temp, 2); this.e = Math.sqrt(this.es); this.e0 = Proj4js.common.e0fn(this.es); this.e1 = Proj4js.common.e1fn(this.es); this.e2 = Proj4js.common.e2fn(this.es); this.e3 = Proj4js.common.e3fn(this.es); this.ml0 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); }, forward: function (p) {
    var sinphi, cosphi; var al; var c; var con, ml; var ms; var x, y; var lon = p.x; var lat = p.y; con = Proj4js.common.adjust_lon(lon - this.long0); if (Math.abs(lat) <= .0000001) { x = this.x0 + this.a * con; y = this.y0 - this.a * this.ml0; } else { sinphi = Math.sin(lat); cosphi = Math.cos(lat); ml = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat); ms = Proj4js.common.msfnz(this.e, sinphi, cosphi); con = sinphi; x = this.x0 + this.a * ms * Math.sin(con) / sinphi; y = this.y0 + this.a * (ml - this.ml0 + ms * (1.0 - Math.cos(con)) / sinphi); }
    p.x = x; p.y = y; return p;
  }, inverse: function (p) {
    var sin_phi, cos_phi; var al; var b; var c; var con, ml; var iflg; var lon, lat; p.x -= this.x0; p.y -= this.y0; al = this.ml0 + p.y / this.a; iflg = 0; if (Math.abs(al) <= .0000001) { lon = p.x / this.a + this.long0; lat = 0.0; } else { b = al * al + (p.x / this.a) * (p.x / this.a); iflg = phi4z(this.es, this.e0, this.e1, this.e2, this.e3, this.al, b, c, lat); if (iflg != 1) return (iflg); lon = Proj4js.common.adjust_lon((Proj4js.common.asinz(p.x * c / this.a) / Math.sin(lat)) + this.long0); }
    p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.equi = {
  init: function () { if (!this.x0) this.x0 = 0; if (!this.y0) this.y0 = 0; if (!this.lat0) this.lat0 = 0; if (!this.long0) this.long0 = 0; }, forward: function (p) { var lon = p.x; var lat = p.y; var dlon = Proj4js.common.adjust_lon(lon - this.long0); var x = this.x0 + this.a * dlon * Math.cos(this.lat0); var y = this.y0 + this.a * lat; this.t1 = x; this.t2 = Math.cos(this.lat0); p.x = x; p.y = y; return p; }, inverse: function (p) {
    p.x -= this.x0; p.y -= this.y0; var lat = p.y / this.a; if (Math.abs(lat) > Proj4js.common.HALF_PI) { Proj4js.reportError("equi:Inv:DataError"); }
    var lon = Proj4js.common.adjust_lon(this.long0 + p.x / (this.a * Math.cos(this.lat0))); p.x = lon; p.y = lat;
  }
}; Proj4js.Proj.merc = {
  init: function () { if (this.lat_ts) { if (this.sphere) { this.k0 = Math.cos(this.lat_ts); } else { this.k0 = Proj4js.common.msfnz(this.es, Math.sin(this.lat_ts), Math.cos(this.lat_ts)); } } }, forward: function (p) {
    var lon = p.x; var lat = p.y; if (lat * Proj4js.common.R2D > 90.0 && lat * Proj4js.common.R2D < -90.0 && lon * Proj4js.common.R2D > 180.0 && lon * Proj4js.common.R2D < -180.0) { Proj4js.reportError("merc:forward: llInputOutOfRange: " + lon + " : " + lat); return null; }
    var x, y; if (Math.abs(Math.abs(lat) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN) { Proj4js.reportError("merc:forward: ll2mAtPoles"); return null; } else {
      if (this.sphere) { x = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(lon - this.long0); y = this.y0 + this.a * this.k0 * Math.log(Math.tan(Proj4js.common.FORTPI + 0.5 * lat)); } else { var sinphi = Math.sin(lat); var ts = Proj4js.common.tsfnz(this.e, lat, sinphi); x = this.x0 + this.a * this.k0 * Proj4js.common.adjust_lon(lon - this.long0); y = this.y0 - this.a * this.k0 * Math.log(ts); }
      p.x = x; p.y = y; return p;
    }
  }, inverse: function (p) {
    var x = p.x - this.x0; var y = p.y - this.y0; var lon, lat; if (this.sphere) { lat = Proj4js.common.HALF_PI - 2.0 * Math.atan(Math.exp(-y / this.a * this.k0)); } else { var ts = Math.exp(-y / (this.a * this.k0)); lat = Proj4js.common.phi2z(this.e, ts); if (lat == -9999) { Proj4js.reportError("merc:inverse: lat = -9999"); return null; } }
    lon = Proj4js.common.adjust_lon(this.long0 + x / (this.a * this.k0)); p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.utm = {
  dependsOn: 'tmerc', init: function () {
    if (!this.zone) { Proj4js.reportError("utm:init: zone must be specified for UTM"); return; }
    this.lat0 = 0.0; this.long0 = ((6 * Math.abs(this.zone)) - 183) * Proj4js.common.D2R; this.x0 = 500000.0; this.y0 = this.utmSouth ? 10000000.0 : 0.0; this.k0 = 0.9996; Proj4js.Proj['tmerc'].init.apply(this); this.forward = Proj4js.Proj['tmerc'].forward; this.inverse = Proj4js.Proj['tmerc'].inverse;
  }
}; Proj4js.Proj.eqdc = {
  init: function () {
    if (!this.mode) this.mode = 0; this.temp = this.b / this.a; this.es = 1.0 - Math.pow(this.temp, 2); this.e = Math.sqrt(this.es); this.e0 = Proj4js.common.e0fn(this.es); this.e1 = Proj4js.common.e1fn(this.es); this.e2 = Proj4js.common.e2fn(this.es); this.e3 = Proj4js.common.e3fn(this.es); this.sinphi = Math.sin(this.lat1); this.cosphi = Math.cos(this.lat1); this.ms1 = Proj4js.common.msfnz(this.e, this.sinphi, this.cosphi); this.ml1 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1); if (this.mode != 0) {
      if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) { Proj4js.reportError("eqdc:Init:EqualLatitudes"); }
      this.sinphi = Math.sin(this.lat2); this.cosphi = Math.cos(this.lat2); this.ms2 = Proj4js.common.msfnz(this.e, this.sinphi, this.cosphi); this.ml2 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2); if (Math.abs(this.lat1 - this.lat2) >= Proj4js.common.EPSLN) { this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1); } else { this.ns = this.sinphi; }
    } else { this.ns = this.sinphi; }
    this.g = this.ml1 + this.ms1 / this.ns; this.ml0 = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); this.rh = this.a * (this.g - this.ml0);
  }, forward: function (p) { var lon = p.x; var lat = p.y; var ml = Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat); var rh1 = this.a * (this.g - ml); var theta = this.ns * Proj4js.common.adjust_lon(lon - this.long0); var x = this.x0 + rh1 * Math.sin(theta); var y = this.y0 + this.rh - rh1 * Math.cos(theta); p.x = x; p.y = y; return p; }, inverse: function (p) {
    p.x -= this.x0; p.y = this.rh - p.y + this.y0; var con, rh1; if (this.ns >= 0) { var rh1 = Math.sqrt(p.x * p.x + p.y * p.y); var con = 1.0; } else { rh1 = -Math.sqrt(p.x * p.x + p.y * p.y); con = -1.0; }
    var theta = 0.0; if (rh1 != 0.0) theta = Math.atan2(con * p.x, con * p.y); var ml = this.g - rh1 / this.a; var lat = this.phi3z(ml, this.e0, this.e1, this.e2, this.e3); var lon = Proj4js.common.adjust_lon(this.long0 + theta / this.ns); p.x = lon; p.y = lat; return p;
  }, phi3z: function (ml, e0, e1, e2, e3) {
    var phi; var dphi; phi = ml; for (var i = 0; i < 15; i++) { dphi = (ml + e1 * Math.sin(2.0 * phi) - e2 * Math.sin(4.0 * phi) + e3 * Math.sin(6.0 * phi)) / e0 - phi; phi += dphi; if (Math.abs(dphi) <= .0000000001) { return phi; } }
    Proj4js.reportError("PHI3Z-CONV:Latitude failed to converge after 15 iterations"); return null;
  }
}; Proj4js.Proj.tmerc = {
  init: function () { this.e0 = Proj4js.common.e0fn(this.es); this.e1 = Proj4js.common.e1fn(this.es); this.e2 = Proj4js.common.e2fn(this.es); this.e3 = Proj4js.common.e3fn(this.es); this.ml0 = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); }, forward: function (p) {
    var lon = p.x; var lat = p.y; var delta_lon = Proj4js.common.adjust_lon(lon - this.long0); var con; var x, y; var sin_phi = Math.sin(lat); var cos_phi = Math.cos(lat); if (this.sphere) { var b = cos_phi * Math.sin(delta_lon); if ((Math.abs(Math.abs(b) - 1.0)) < .0000000001) { Proj4js.reportError("tmerc:forward: Point projects into infinity"); return (93); } else { x = .5 * this.a * this.k0 * Math.log((1.0 + b) / (1.0 - b)); con = Math.acos(cos_phi * Math.cos(delta_lon) / Math.sqrt(1.0 - b * b)); if (lat < 0) con = -con; y = this.a * this.k0 * (con - this.lat0); } } else { var al = cos_phi * delta_lon; var als = Math.pow(al, 2); var c = this.ep2 * Math.pow(cos_phi, 2); var tq = Math.tan(lat); var t = Math.pow(tq, 2); con = 1.0 - this.es * Math.pow(sin_phi, 2); var n = this.a / Math.sqrt(con); var ml = this.a * Proj4js.common.mlfn(this.e0, this.e1, this.e2, this.e3, lat); x = this.k0 * n * al * (1.0 + als / 6.0 * (1.0 - t + c + als / 20.0 * (5.0 - 18.0 * t + Math.pow(t, 2) + 72.0 * c - 58.0 * this.ep2))) + this.x0; y = this.k0 * (ml - this.ml0 + n * tq * (als * (0.5 + als / 24.0 * (5.0 - t + 9.0 * c + 4.0 * Math.pow(c, 2) + als / 30.0 * (61.0 - 58.0 * t + Math.pow(t, 2) + 600.0 * c - 330.0 * this.ep2))))) + this.y0; }
    p.x = x; p.y = y; return p;
  }, inverse: function (p) {
    var con, phi; var delta_phi; var i; var max_iter = 6; var lat, lon; if (this.sphere) {
      var f = Math.exp(p.x / (this.a * this.k0)); var g = .5 * (f - 1 / f); var temp = this.lat0 + p.y / (this.a * this.k0); var h = Math.cos(temp); con = Math.sqrt((1.0 - h * h) / (1.0 + g * g)); lat = Proj4js.common.asinz(con); if (temp < 0)
        lat = -lat; if ((g == 0) && (h == 0)) { lon = this.long0; } else { lon = Proj4js.common.adjust_lon(Math.atan2(g, h) + this.long0); }
    } else {
      var x = p.x - this.x0; var y = p.y - this.y0; con = (this.ml0 + y / this.k0) / this.a; phi = con; for (i = 0; true; i++) { delta_phi = ((con + this.e1 * Math.sin(2.0 * phi) - this.e2 * Math.sin(4.0 * phi) + this.e3 * Math.sin(6.0 * phi)) / this.e0) - phi; phi += delta_phi; if (Math.abs(delta_phi) <= Proj4js.common.EPSLN) break; if (i >= max_iter) { Proj4js.reportError("tmerc:inverse: Latitude failed to converge"); return (95); } }
      if (Math.abs(phi) < Proj4js.common.HALF_PI) { var sin_phi = Math.sin(phi); var cos_phi = Math.cos(phi); var tan_phi = Math.tan(phi); var c = this.ep2 * Math.pow(cos_phi, 2); var cs = Math.pow(c, 2); var t = Math.pow(tan_phi, 2); var ts = Math.pow(t, 2); con = 1.0 - this.es * Math.pow(sin_phi, 2); var n = this.a / Math.sqrt(con); var r = n * (1.0 - this.es) / con; var d = x / (n * this.k0); var ds = Math.pow(d, 2); lat = phi - (n * tan_phi * ds / r) * (0.5 - ds / 24.0 * (5.0 + 3.0 * t + 10.0 * c - 4.0 * cs - 9.0 * this.ep2 - ds / 30.0 * (61.0 + 90.0 * t + 298.0 * c + 45.0 * ts - 252.0 * this.ep2 - 3.0 * cs))); lon = Proj4js.common.adjust_lon(this.long0 + (d * (1.0 - ds / 6.0 * (1.0 + 2.0 * t + c - ds / 20.0 * (5.0 - 2.0 * c + 28.0 * t - 3.0 * cs + 8.0 * this.ep2 + 24.0 * ts))) / cos_phi)); } else { lat = Proj4js.common.HALF_PI * Proj4js.common.sign(y); lon = this.long0; }
    }
    p.x = lon; p.y = lat; return p;
  }
}; Proj4js.defs["GOOGLE"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"; Proj4js.defs["EPSG:900913"] = Proj4js.defs["GOOGLE"]; Proj4js.Proj.gstmerc = { init: function () { var temp = this.b / this.a; this.e = Math.sqrt(1.0 - temp * temp); this.lc = this.long0; this.rs = Math.sqrt(1.0 + this.e * this.e * Math.pow(Math.cos(this.lat0), 4.0) / (1.0 - this.e * this.e)); var sinz = Math.sin(this.lat0); var pc = Math.asin(sinz / this.rs); var sinzpc = Math.sin(pc); this.cp = Proj4js.common.latiso(0.0, pc, sinzpc) - this.rs * Proj4js.common.latiso(this.e, this.lat0, sinz); this.n2 = this.k0 * this.a * Math.sqrt(1.0 - this.e * this.e) / (1.0 - this.e * this.e * sinz * sinz); this.xs = this.x0; this.ys = this.y0 - this.n2 * pc; if (!this.title) this.title = "Gauss Schreiber transverse mercator"; }, forward: function (p) { var lon = p.x; var lat = p.y; var L = this.rs * (lon - this.lc); var Ls = this.cp + (this.rs * Proj4js.common.latiso(this.e, lat, Math.sin(lat))); var lat1 = Math.asin(Math.sin(L) / Proj4js.common.cosh(Ls)); var Ls1 = Proj4js.common.latiso(0.0, lat1, Math.sin(lat1)); p.x = this.xs + (this.n2 * Ls1); p.y = this.ys + (this.n2 * Math.atan(Proj4js.common.sinh(Ls) / Math.cos(L))); return p; }, inverse: function (p) { var x = p.x; var y = p.y; var L = Math.atan(Proj4js.common.sinh((x - this.xs) / this.n2) / Math.cos((y - this.ys) / this.n2)); var lat1 = Math.asin(Math.sin((y - this.ys) / this.n2) / Proj4js.common.cosh((x - this.xs) / this.n2)); var LC = Proj4js.common.latiso(0.0, lat1, Math.sin(lat1)); p.x = this.lc + L / this.rs; p.y = Proj4js.common.invlatiso(this.e, (LC - this.cp) / this.rs); return p; } }; Proj4js.Proj.ortho = {
  init: function (def) { ; this.sin_p14 = Math.sin(this.lat0); this.cos_p14 = Math.cos(this.lat0); }, forward: function (p) {
    var sinphi, cosphi; var dlon; var coslon; var ksp; var g; var lon = p.x; var lat = p.y; dlon = Proj4js.common.adjust_lon(lon - this.long0); sinphi = Math.sin(lat); cosphi = Math.cos(lat); coslon = Math.cos(dlon); g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon; ksp = 1.0; if ((g > 0) || (Math.abs(g) <= Proj4js.common.EPSLN)) { var x = this.a * ksp * cosphi * Math.sin(dlon); var y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon); } else { Proj4js.reportError("orthoFwdPointError"); }
    p.x = x; p.y = y; return p;
  }, inverse: function (p) {
    var rh; var z; var sinz, cosz; var temp; var con; var lon, lat; p.x -= this.x0; p.y -= this.y0; rh = Math.sqrt(p.x * p.x + p.y * p.y); if (rh > this.a + .0000001) { Proj4js.reportError("orthoInvDataError"); }
    z = Proj4js.common.asinz(rh / this.a); sinz = Math.sin(z); cosz = Math.cos(z); lon = this.long0; if (Math.abs(rh) <= Proj4js.common.EPSLN) { lat = this.lat0; }
    lat = Proj4js.common.asinz(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh); con = Math.abs(this.lat0) - Proj4js.common.HALF_PI; if (Math.abs(con) <= Proj4js.common.EPSLN) { if (this.lat0 >= 0) { lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2(p.x, -p.y)); } else { lon = Proj4js.common.adjust_lon(this.long0 - Math.atan2(-p.x, p.y)); } }
    con = cosz - this.sin_p14 * Math.sin(lat); p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.somerc = {
  init: function () {
    var phy0 = this.lat0; this.lambda0 = this.long0; var sinPhy0 = Math.sin(phy0); var semiMajorAxis = this.a; var invF = this.rf; var flattening = 1 / invF; var e2 = 2 * flattening - Math.pow(flattening, 2); var e = this.e = Math.sqrt(e2); this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2.0)); this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4.0)); this.b0 = Math.asin(sinPhy0 / this.alpha); this.K = Math.log(Math.tan(Math.PI / 4.0 + this.b0 / 2.0))
      - this.alpha * Math.log(Math.tan(Math.PI / 4.0 + phy0 / 2.0))
      + this.alpha * e / 2 * Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  }, forward: function (p) {
    var Sa1 = Math.log(Math.tan(Math.PI / 4.0 - p.y / 2.0)); var Sa2 = this.e / 2.0 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y))); var S = -this.alpha * (Sa1 + Sa2) + this.K; var b = 2.0 * (Math.atan(Math.exp(S)) - Math.PI / 4.0); var I = this.alpha * (p.x - this.lambda0); var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) +
      Math.cos(this.b0) * Math.cos(I))); var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) -
        Math.sin(this.b0) * Math.cos(b) * Math.cos(I)); p.y = this.R / 2.0 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB)))
          + this.y0; p.x = this.R * rotI + this.x0; return p;
  }, inverse: function (p) {
    var Y = p.x - this.x0; var X = p.y - this.y0; var rotI = Y / this.R; var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4.0); var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB)
      + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI)); var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB))); var lambda = this.lambda0 + I / this.alpha; var S = 0.0; var phy = b; var prevPhy = -1000.0; var iteration = 0; while (Math.abs(phy - prevPhy) > 0.0000001) {
        if (++iteration > 20) { Proj4js.reportError("omercFwdInfinity"); return; }
        S = 1.0 / this.alpha * (Math.log(Math.tan(Math.PI / 4.0 + b / 2.0)) - this.K)
          + this.e * Math.log(Math.tan(Math.PI / 4.0
            + Math.asin(this.e * Math.sin(phy)) / 2.0)); prevPhy = phy; phy = 2.0 * Math.atan(Math.exp(S)) - Math.PI / 2.0;
      }
    p.x = lambda; p.y = phy; return p;
  }
}; Proj4js.Proj.stere = {
  ssfn_: function (phit, sinphi, eccen) { sinphi *= eccen; return (Math.tan(.5 * (Proj4js.common.HALF_PI + phit)) * Math.pow((1. - sinphi) / (1. + sinphi), .5 * eccen)); }, TOL: 1.e-8, NITER: 8, CONV: 1.e-10, S_POLE: 0, N_POLE: 1, OBLIQ: 2, EQUIT: 3, init: function () {
    this.phits = this.lat_ts ? this.lat_ts : Proj4js.common.HALF_PI; var t = Math.abs(this.lat0); if ((Math.abs(t) - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) { this.mode = this.lat0 < 0. ? this.S_POLE : this.N_POLE; } else { this.mode = t > Proj4js.common.EPSLN ? this.OBLIQ : this.EQUIT; }
    this.phits = Math.abs(this.phits); if (this.es) {
      var X; switch (this.mode) {
        case this.N_POLE: case this.S_POLE: if (Math.abs(this.phits - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) { this.akm1 = 2. * this.k0 / Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)); } else { t = Math.sin(this.phits); this.akm1 = Math.cos(this.phits) / Proj4js.common.tsfnz(this.e, this.phits, t); t *= this.e; this.akm1 /= Math.sqrt(1. - t * t); }
          break; case this.EQUIT: this.akm1 = 2. * this.k0; break; case this.OBLIQ: t = Math.sin(this.lat0); X = 2. * Math.atan(this.ssfn_(this.lat0, t, this.e)) - Proj4js.common.HALF_PI; t *= this.e; this.akm1 = 2. * this.k0 * Math.cos(this.lat0) / Math.sqrt(1. - t * t); this.sinX1 = Math.sin(X); this.cosX1 = Math.cos(X); break;
      }
    } else { switch (this.mode) { case this.OBLIQ: this.sinph0 = Math.sin(this.lat0); this.cosph0 = Math.cos(this.lat0); case this.EQUIT: this.akm1 = 2. * this.k0; break; case this.S_POLE: case this.N_POLE: this.akm1 = Math.abs(this.phits - Proj4js.common.HALF_PI) >= Proj4js.common.EPSLN ? Math.cos(this.phits) / Math.tan(Proj4js.common.FORTPI - .5 * this.phits) : 2. * this.k0; break; } }
  }, forward: function (p) {
    var lon = p.x; lon = Proj4js.common.adjust_lon(lon - this.long0); var lat = p.y; var x, y; if (this.sphere) {
      var sinphi, cosphi, coslam, sinlam; sinphi = Math.sin(lat); cosphi = Math.cos(lat); coslam = Math.cos(lon); sinlam = Math.sin(lon); switch (this.mode) {
        case this.EQUIT: y = 1. + cosphi * coslam; if (y <= Proj4js.common.EPSLN) { F_ERROR; }
          y = this.akm1 / y; x = y * cosphi * sinlam; y *= sinphi; break; case this.OBLIQ: y = 1. + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam; if (y <= Proj4js.common.EPSLN) { F_ERROR; }
          y = this.akm1 / y; x = y * cosphi * sinlam; y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam; break; case this.N_POLE: coslam = -coslam; lat = -lat; case this.S_POLE: if (Math.abs(lat - Proj4js.common.HALF_PI) < this.TOL) { F_ERROR; }
          y = this.akm1 * Math.tan(Proj4js.common.FORTPI + .5 * lat); x = sinlam * y; y *= coslam; break;
      }
    } else {
      coslam = Math.cos(lon); sinlam = Math.sin(lon); sinphi = Math.sin(lat); if (this.mode == this.OBLIQ || this.mode == this.EQUIT) { X = 2. * Math.atan(this.ssfn_(lat, sinphi, this.e)); sinX = Math.sin(X - Proj4js.common.HALF_PI); cosX = Math.cos(X); }
      switch (this.mode) { case this.OBLIQ: A = this.akm1 / (this.cosX1 * (1. + this.sinX1 * sinX + this.cosX1 * cosX * coslam)); y = A * (this.cosX1 * sinX - this.sinX1 * cosX * coslam); x = A * cosX; break; case this.EQUIT: A = 2. * this.akm1 / (1. + cosX * coslam); y = A * sinX; x = A * cosX; break; case this.S_POLE: lat = -lat; coslam = -coslam; sinphi = -sinphi; case this.N_POLE: x = this.akm1 * Proj4js.common.tsfnz(this.e, lat, sinphi); y = -x * coslam; break; }
      x = x * sinlam;
    }
    p.x = x * this.a + this.x0; p.y = y * this.a + this.y0; return p;
  }, inverse: function (p) {
    var x = (p.x - this.x0) / this.a; var y = (p.y - this.y0) / this.a; var lon, lat; var cosphi, sinphi, tp = 0.0, phi_l = 0.0, rho, halfe = 0.0, pi2 = 0.0; var i; if (this.sphere) {
      var c, rh, sinc, cosc; rh = Math.sqrt(x * x + y * y); c = 2. * Math.atan(rh / this.akm1); sinc = Math.sin(c); cosc = Math.cos(c); lon = 0.; switch (this.mode) {
        case this.EQUIT: if (Math.abs(rh) <= Proj4js.common.EPSLN) { lat = 0.; } else { lat = Math.asin(y * sinc / rh); }
          if (cosc != 0. || x != 0.) lon = Math.atan2(x * sinc, cosc * rh); break; case this.OBLIQ: if (Math.abs(rh) <= Proj4js.common.EPSLN) { lat = this.phi0; } else { lat = Math.asin(cosc * sinph0 + y * sinc * cosph0 / rh); }
          c = cosc - sinph0 * Math.sin(lat); if (c != 0. || x != 0.) { lon = Math.atan2(x * sinc * cosph0, c * rh); }
          break; case this.N_POLE: y = -y; case this.S_POLE: if (Math.abs(rh) <= Proj4js.common.EPSLN) { lat = this.phi0; } else { lat = Math.asin(this.mode == this.S_POLE ? -cosc : cosc); }
          lon = (x == 0. && y == 0.) ? 0. : Math.atan2(x, y); break;
      }
      p.x = Proj4js.common.adjust_lon(lon + this.long0); p.y = lat;
    } else {
      rho = Math.sqrt(x * x + y * y); switch (this.mode) {
        case this.OBLIQ: case this.EQUIT: tp = 2. * Math.atan2(rho * this.cosX1, this.akm1); cosphi = Math.cos(tp); sinphi = Math.sin(tp); if (rho == 0.0) { phi_l = Math.asin(cosphi * this.sinX1); } else { phi_l = Math.asin(cosphi * this.sinX1 + (y * sinphi * this.cosX1 / rho)); }
          tp = Math.tan(.5 * (Proj4js.common.HALF_PI + phi_l)); x *= sinphi; y = rho * this.cosX1 * cosphi - y * this.sinX1 * sinphi; pi2 = Proj4js.common.HALF_PI; halfe = .5 * this.e; break; case this.N_POLE: y = -y; case this.S_POLE: tp = -rho / this.akm1; phi_l = Proj4js.common.HALF_PI - 2. * Math.atan(tp); pi2 = -Proj4js.common.HALF_PI; halfe = -.5 * this.e; break;
      }
      for (i = this.NITER; i--; phi_l = lat) { sinphi = this.e * Math.sin(phi_l); lat = 2. * Math.atan(tp * Math.pow((1. + sinphi) / (1. - sinphi), halfe)) - pi2; if (Math.abs(phi_l - lat) < this.CONV) { if (this.mode == this.S_POLE) lat = -lat; lon = (x == 0. && y == 0.) ? 0. : Math.atan2(x, y); p.x = Proj4js.common.adjust_lon(lon + this.long0); p.y = lat; return p; } }
    }
  }
}; Proj4js.Proj.nzmg = {
  iterations: 1, init: function () { this.A = new Array(); this.A[1] = +0.6399175073; this.A[2] = -0.1358797613; this.A[3] = +0.063294409; this.A[4] = -0.02526853; this.A[5] = +0.0117879; this.A[6] = -0.0055161; this.A[7] = +0.0026906; this.A[8] = -0.001333; this.A[9] = +0.00067; this.A[10] = -0.00034; this.B_re = new Array(); this.B_im = new Array(); this.B_re[1] = +0.7557853228; this.B_im[1] = 0.0; this.B_re[2] = +0.249204646; this.B_im[2] = +0.003371507; this.B_re[3] = -0.001541739; this.B_im[3] = +0.041058560; this.B_re[4] = -0.10162907; this.B_im[4] = +0.01727609; this.B_re[5] = -0.26623489; this.B_im[5] = -0.36249218; this.B_re[6] = -0.6870983; this.B_im[6] = -1.1651967; this.C_re = new Array(); this.C_im = new Array(); this.C_re[1] = +1.3231270439; this.C_im[1] = 0.0; this.C_re[2] = -0.577245789; this.C_im[2] = -0.007809598; this.C_re[3] = +0.508307513; this.C_im[3] = -0.112208952; this.C_re[4] = -0.15094762; this.C_im[4] = +0.18200602; this.C_re[5] = +1.01418179; this.C_im[5] = +1.64497696; this.C_re[6] = +1.9660549; this.C_im[6] = +2.5127645; this.D = new Array(); this.D[1] = +1.5627014243; this.D[2] = +0.5185406398; this.D[3] = -0.03333098; this.D[4] = -0.1052906; this.D[5] = -0.0368594; this.D[6] = +0.007317; this.D[7] = +0.01220; this.D[8] = +0.00394; this.D[9] = -0.0013; }, forward: function (p) {
    var lon = p.x; var lat = p.y; var delta_lat = lat - this.lat0; var delta_lon = lon - this.long0; var d_phi = delta_lat / Proj4js.common.SEC_TO_RAD * 1E-5; var d_lambda = delta_lon; var d_phi_n = 1; var d_psi = 0; for (n = 1; n <= 10; n++) { d_phi_n = d_phi_n * d_phi; d_psi = d_psi + this.A[n] * d_phi_n; }
    var th_re = d_psi; var th_im = d_lambda; var th_n_re = 1; var th_n_im = 0; var th_n_re1; var th_n_im1; var z_re = 0; var z_im = 0; for (n = 1; n <= 6; n++) { th_n_re1 = th_n_re * th_re - th_n_im * th_im; th_n_im1 = th_n_im * th_re + th_n_re * th_im; th_n_re = th_n_re1; th_n_im = th_n_im1; z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im; z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im; }
    x = (z_im * this.a) + this.x0; y = (z_re * this.a) + this.y0; p.x = x; p.y = y; return p;
  }, inverse: function (p) {
    var x = p.x; var y = p.y; var delta_x = x - this.x0; var delta_y = y - this.y0; var z_re = delta_y / this.a; var z_im = delta_x / this.a; var z_n_re = 1; var z_n_im = 0; var z_n_re1; var z_n_im1; var th_re = 0; var th_im = 0; for (n = 1; n <= 6; n++) { z_n_re1 = z_n_re * z_re - z_n_im * z_im; z_n_im1 = z_n_im * z_re + z_n_re * z_im; z_n_re = z_n_re1; z_n_im = z_n_im1; th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im; th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im; }
    for (i = 0; i < this.iterations; i++) {
      var th_n_re = th_re; var th_n_im = th_im; var th_n_re1; var th_n_im1; var num_re = z_re; var num_im = z_im; for (n = 2; n <= 6; n++) { th_n_re1 = th_n_re * th_re - th_n_im * th_im; th_n_im1 = th_n_im * th_re + th_n_re * th_im; th_n_re = th_n_re1; th_n_im = th_n_im1; num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im); num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im); }
      th_n_re = 1; th_n_im = 0; var den_re = this.B_re[1]; var den_im = this.B_im[1]; for (n = 2; n <= 6; n++) { th_n_re1 = th_n_re * th_re - th_n_im * th_im; th_n_im1 = th_n_im * th_re + th_n_re * th_im; th_n_re = th_n_re1; th_n_im = th_n_im1; den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im); den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im); }
      var den2 = den_re * den_re + den_im * den_im; th_re = (num_re * den_re + num_im * den_im) / den2; th_im = (num_im * den_re - num_re * den_im) / den2;
    }
    var d_psi = th_re; var d_lambda = th_im; var d_psi_n = 1; var d_phi = 0; for (n = 1; n <= 9; n++) { d_psi_n = d_psi_n * d_psi; d_phi = d_phi + this.D[n] * d_psi_n; }
    var lat = this.lat0 + (d_phi * Proj4js.common.SEC_TO_RAD * 1E5); var lon = this.long0 + d_lambda; p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.mill = { init: function () { }, forward: function (p) { var lon = p.x; var lat = p.y; var dlon = Proj4js.common.adjust_lon(lon - this.long0); var x = this.x0 + this.a * dlon; var y = this.y0 + this.a * Math.log(Math.tan((Proj4js.common.PI / 4.0) + (lat / 2.5))) * 1.25; p.x = x; p.y = y; return p; }, inverse: function (p) { p.x -= this.x0; p.y -= this.y0; var lon = Proj4js.common.adjust_lon(this.long0 + p.x / this.a); var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Proj4js.common.PI / 4.0); p.x = lon; p.y = lat; return p; } }; Proj4js.Proj.gnom = {
  init: function (def) { this.sin_p14 = Math.sin(this.lat0); this.cos_p14 = Math.cos(this.lat0); this.infinity_dist = 1000 * this.a; this.rc = 1; }, forward: function (p) {
    var sinphi, cosphi; var dlon; var coslon; var ksp; var g; var lon = p.x; var lat = p.y; dlon = Proj4js.common.adjust_lon(lon - this.long0); sinphi = Math.sin(lat); cosphi = Math.cos(lat); coslon = Math.cos(dlon); g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon; ksp = 1.0; if ((g > 0) || (Math.abs(g) <= Proj4js.common.EPSLN)) { x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g; y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g; } else { Proj4js.reportError("orthoFwdPointError"); x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon); y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon); }
    p.x = x; p.y = y; return p;
  }, inverse: function (p) {
    var rh; var z; var sinc, cosc; var c; var lon, lat; p.x = (p.x - this.x0) / this.a; p.y = (p.y - this.y0) / this.a; p.x /= this.k0; p.y /= this.k0; if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) { c = Math.atan2(rh, this.rc); sinc = Math.sin(c); cosc = Math.cos(c); lat = Proj4js.common.asinz(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh); lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc); lon = Proj4js.common.adjust_lon(this.long0 + lon); } else { lat = this.phic0; lon = 0.0; }
    p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.sinu = {
  init: function () { this.R = 6370997.0; }, forward: function (p) { var x, y, delta_lon; var lon = p.x; var lat = p.y; delta_lon = Proj4js.common.adjust_lon(lon - this.long0); x = this.R * delta_lon * Math.cos(lat) + this.x0; y = this.R * lat + this.y0; p.x = x; p.y = y; return p; }, inverse: function (p) {
    var lat, temp, lon; p.x -= this.x0; p.y -= this.y0; lat = p.y / this.R; if (Math.abs(lat) > Proj4js.common.HALF_PI) { Proj4js.reportError("sinu:Inv:DataError"); }
    temp = Math.abs(lat) - Proj4js.common.HALF_PI; if (Math.abs(temp) > Proj4js.common.EPSLN) { temp = this.long0 + p.x / (this.R * Math.cos(lat)); lon = Proj4js.common.adjust_lon(temp); } else { lon = this.long0; }
    p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.vandg = {
  init: function () { this.R = 6370997.0; }, forward: function (p) {
    var lon = p.x; var lat = p.y; var dlon = Proj4js.common.adjust_lon(lon - this.long0); var x, y; if (Math.abs(lat) <= Proj4js.common.EPSLN) { x = this.x0 + this.R * dlon; y = this.y0; }
    var theta = Proj4js.common.asinz(2.0 * Math.abs(lat / Proj4js.common.PI)); if ((Math.abs(dlon) <= Proj4js.common.EPSLN) || (Math.abs(Math.abs(lat) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN)) { x = this.x0; if (lat >= 0) { y = this.y0 + Proj4js.common.PI * this.R * Math.tan(.5 * theta); } else { y = this.y0 + Proj4js.common.PI * this.R * -Math.tan(.5 * theta); } }
    var al = .5 * Math.abs((Proj4js.common.PI / dlon) - (dlon / Proj4js.common.PI)); var asq = al * al; var sinth = Math.sin(theta); var costh = Math.cos(theta); var g = costh / (sinth + costh - 1.0); var gsq = g * g; var m = g * (2.0 / sinth - 1.0); var msq = m * m; var con = Proj4js.common.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq); if (dlon < 0) { con = -con; }
    x = this.x0 + con; con = Math.abs(con / (Proj4js.common.PI * this.R)); if (lat >= 0) { y = this.y0 + Proj4js.common.PI * this.R * Math.sqrt(1.0 - con * con - 2.0 * al * con); } else { y = this.y0 - Proj4js.common.PI * this.R * Math.sqrt(1.0 - con * con - 2.0 * al * con); }
    p.x = x; p.y = y; return p;
  }, inverse: function (p) {
    var dlon; var xx, yy, xys, c1, c2, c3; var al, asq; var a1; var m1; var con; var th1; var d; p.x -= this.x0; p.y -= this.y0; con = Proj4js.common.PI * this.R; xx = p.x / con; yy = p.y / con; xys = xx * xx + yy * yy; c1 = -Math.abs(yy) * (1.0 + xys); c2 = c1 - 2.0 * yy * yy + xx * xx; c3 = -2.0 * c1 + 1.0 + 2.0 * yy * yy + xys * xys; d = yy * yy / c3 + (2.0 * c2 * c2 * c2 / c3 / c3 / c3 - 9.0 * c1 * c2 / c3 / c3) / 27.0; a1 = (c1 - c2 * c2 / 3.0 / c3) / c3; m1 = 2.0 * Math.sqrt(-a1 / 3.0); con = ((3.0 * d) / a1) / m1; if (Math.abs(con) > 1.0) { if (con >= 0.0) { con = 1.0; } else { con = -1.0; } }
    th1 = Math.acos(con) / 3.0; if (p.y >= 0) { lat = (-m1 * Math.cos(th1 + Proj4js.common.PI / 3.0) - c2 / 3.0 / c3) * Proj4js.common.PI; } else { lat = -(-m1 * Math.cos(th1 + Proj4js.common.PI / 3.0) - c2 / 3.0 / c3) * Proj4js.common.PI; }
    if (Math.abs(xx) < Proj4js.common.EPSLN) { lon = this.long0; }
    lon = Proj4js.common.adjust_lon(this.long0 + Proj4js.common.PI * (xys - 1.0 + Math.sqrt(1.0 + 2.0 * (xx * xx - yy * yy) + xys * xys)) / 2.0 / xx); p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.cea = { init: function () { }, forward: function (p) { var lon = p.x; var lat = p.y; dlon = Proj4js.common.adjust_lon(lon - this.long0); var x = this.x0 + this.a * dlon * Math.cos(this.lat_ts); var y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts); p.x = x; p.y = y; return p; }, inverse: function (p) { p.x -= this.x0; p.y -= this.y0; var lon = Proj4js.common.adjust_lon(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts)); var lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts)); p.x = lon; p.y = lat; return p; } }; Proj4js.Proj.eqc = { init: function () { if (!this.x0) this.x0 = 0; if (!this.y0) this.y0 = 0; if (!this.lat0) this.lat0 = 0; if (!this.long0) this.long0 = 0; if (!this.lat_ts) this.lat_ts = 0; if (!this.title) this.title = "Equidistant Cylindrical (Plate Carre)"; this.rc = Math.cos(this.lat_ts); }, forward: function (p) { var lon = p.x; var lat = p.y; var dlon = Proj4js.common.adjust_lon(lon - this.long0); var dlat = Proj4js.common.adjust_lat(lat - this.lat0); p.x = this.x0 + (this.a * dlon * this.rc); p.y = this.y0 + (this.a * dlat); return p; }, inverse: function (p) { var x = p.x; var y = p.y; p.x = Proj4js.common.adjust_lon(this.long0 + ((x - this.x0) / (this.a * this.rc))); p.y = Proj4js.common.adjust_lat(this.lat0 + ((y - this.y0) / (this.a))); return p; } }; Proj4js.Proj.cass = {
  init: function () {
    if (!this.sphere) {
      this.en = this.pj_enfn(this.es)
      this.m0 = this.pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
    }
  }, C1: .16666666666666666666, C2: .00833333333333333333, C3: .04166666666666666666, C4: .33333333333333333333, C5: .06666666666666666666, forward: function (p) {
    var x, y; var lam = p.x; var phi = p.y; lam = Proj4js.common.adjust_lon(lam - this.long0); if (this.sphere) { x = Math.asin(Math.cos(phi) * Math.sin(lam)); y = Math.atan2(Math.tan(phi), Math.cos(lam)) - this.phi0; } else { this.n = Math.sin(phi); this.c = Math.cos(phi); y = this.pj_mlfn(phi, this.n, this.c, this.en); this.n = 1. / Math.sqrt(1. - this.es * this.n * this.n); this.tn = Math.tan(phi); this.t = this.tn * this.tn; this.a1 = lam * this.c; this.c *= this.es * this.c / (1 - this.es); this.a2 = this.a1 * this.a1; x = this.n * this.a1 * (1. - this.a2 * this.t * (this.C1 - (8. - this.t + 8. * this.c) * this.a2 * this.C2)); y -= this.m0 - this.n * this.tn * this.a2 * (.5 + (5. - this.t + 6. * this.c) * this.a2 * this.C3); }
    p.x = this.a * x + this.x0; p.y = this.a * y + this.y0; return p;
  }, inverse: function (p) {
    p.x -= this.x0; p.y -= this.y0; var x = p.x / this.a; var y = p.y / this.a; if (this.sphere) { this.dd = y + this.lat0; phi = Math.asin(Math.sin(this.dd) * Math.cos(x)); lam = Math.atan2(Math.tan(x), Math.cos(this.dd)); } else { ph1 = this.pj_inv_mlfn(this.m0 + y, this.es, this.en); this.tn = Math.tan(ph1); this.t = this.tn * this.tn; this.n = Math.sin(ph1); this.r = 1. / (1. - this.es * this.n * this.n); this.n = Math.sqrt(this.r); this.r *= (1. - this.es) * this.n; this.dd = x / this.n; this.d2 = this.dd * this.dd; phi = ph1 - (this.n * this.tn / this.r) * this.d2 * (.5 - (1. + 3. * this.t) * this.d2 * this.C3); lam = this.dd * (1. + this.t * this.d2 * (-this.C4 + (1. + 3. * this.t) * this.d2 * this.C5)) / Math.cos(ph1); }
    p.x = Proj4js.common.adjust_lon(this.long0 + lam); p.y = phi; return p;
  }, pj_enfn: function (es) { en = new Array(); en[0] = this.C00 - es * (this.C02 + es * (this.C04 + es * (this.C06 + es * this.C08))); en[1] = es * (this.C22 - es * (this.C04 + es * (this.C06 + es * this.C08))); var t = es * es; en[2] = t * (this.C44 - es * (this.C46 + es * this.C48)); t *= es; en[3] = t * (this.C66 - es * this.C68); en[4] = t * es * this.C88; return en; }, pj_mlfn: function (phi, sphi, cphi, en) { cphi *= sphi; sphi *= sphi; return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])))); }, pj_inv_mlfn: function (arg, es, en) {
    k = 1. / (1. - es); phi = arg; for (i = Proj4js.common.MAX_ITER; i; --i) {
      s = Math.sin(phi); t = 1. - es * s * s; t = (this.pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k; phi -= t; if (Math.abs(t) < Proj4js.common.EPSLN)
        return phi;
    }
    Proj4js.reportError("cass:pj_inv_mlfn: Convergence error"); return phi;
  }, C00: 1.0, C02: .25, C04: .046875, C06: .01953125, C08: .01068115234375, C22: .75, C44: .46875, C46: .01302083333333333333, C48: .00712076822916666666, C66: .36458333333333333333, C68: .00569661458333333333, C88: .3076171875
}
Proj4js.Proj.gauss = {
  init: function () { sphi = Math.sin(this.lat0); cphi = Math.cos(this.lat0); cphi *= cphi; this.rc = Math.sqrt(1.0 - this.es) / (1.0 - this.es * sphi * sphi); this.C = Math.sqrt(1.0 + this.es * cphi * cphi / (1.0 - this.es)); this.phic0 = Math.asin(sphi / this.C); this.ratexp = 0.5 * this.C * this.e; this.K = Math.tan(0.5 * this.phic0 + Proj4js.common.FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + Proj4js.common.FORTPI), this.C) * Proj4js.common.srat(this.e * sphi, this.ratexp)); }, forward: function (p) { var lon = p.x; var lat = p.y; p.y = 2.0 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + Proj4js.common.FORTPI), this.C) * Proj4js.common.srat(this.e * Math.sin(lat), this.ratexp)) - Proj4js.common.HALF_PI; p.x = this.C * lon; return p; }, inverse: function (p) {
    var DEL_TOL = 1e-14; var lon = p.x / this.C; var lat = p.y; num = Math.pow(Math.tan(0.5 * lat + Proj4js.common.FORTPI) / this.K, 1. / this.C); for (var i = Proj4js.common.MAX_ITER; i > 0; --i) { lat = 2.0 * Math.atan(num * Proj4js.common.srat(this.e * Math.sin(p.y), -0.5 * this.e)) - Proj4js.common.HALF_PI; if (Math.abs(lat - p.y) < DEL_TOL) break; p.y = lat; }
    if (!i) { Proj4js.reportError("gauss:inverse:convergence failed"); return null; }
    p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.omerc = {
  init: function () {
    if (!this.mode) this.mode = 0; if (!this.lon1) { this.lon1 = 0; this.mode = 1; }
    if (!this.lon2) this.lon2 = 0; if (!this.lat2) this.lat2 = 0; var temp = this.b / this.a; var es = 1.0 - Math.pow(temp, 2); var e = Math.sqrt(es); this.sin_p20 = Math.sin(this.lat0); this.cos_p20 = Math.cos(this.lat0); this.con = 1.0 - this.es * this.sin_p20 * this.sin_p20; this.com = Math.sqrt(1.0 - es); this.bl = Math.sqrt(1.0 + this.es * Math.pow(this.cos_p20, 4.0) / (1.0 - es)); this.al = this.a * this.bl * this.k0 * this.com / this.con; if (Math.abs(this.lat0) < Proj4js.common.EPSLN) { this.ts = 1.0; this.d = 1.0; this.el = 1.0; } else {
      this.ts = Proj4js.common.tsfnz(this.e, this.lat0, this.sin_p20); this.con = Math.sqrt(this.con); this.d = this.bl * this.com / (this.cos_p20 * this.con); if ((this.d * this.d - 1.0) > 0.0) { if (this.lat0 >= 0.0) { this.f = this.d + Math.sqrt(this.d * this.d - 1.0); } else { this.f = this.d - Math.sqrt(this.d * this.d - 1.0); } } else { this.f = this.d; }
      this.el = this.f * Math.pow(this.ts, this.bl);
    }
    if (this.mode != 0) { this.g = .5 * (this.f - 1.0 / this.f); this.gama = Proj4js.common.asinz(Math.sin(this.alpha) / this.d); this.longc = this.longc - Proj4js.common.asinz(this.g * Math.tan(this.gama)) / this.bl; this.con = Math.abs(this.lat0); if ((this.con > Proj4js.common.EPSLN) && (Math.abs(this.con - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN)) { this.singam = Math.sin(this.gama); this.cosgam = Math.cos(this.gama); this.sinaz = Math.sin(this.alpha); this.cosaz = Math.cos(this.alpha); if (this.lat0 >= 0) { this.u = (this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1.0) / this.cosaz); } else { this.u = -(this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1.0) / this.cosaz); } } else { Proj4js.reportError("omerc:Init:DataError"); } } else {
      this.sinphi = Math.sin(this.at1); this.ts1 = Proj4js.common.tsfnz(this.e, this.lat1, this.sinphi); this.sinphi = Math.sin(this.lat2); this.ts2 = Proj4js.common.tsfnz(this.e, this.lat2, this.sinphi); this.h = Math.pow(this.ts1, this.bl); this.l = Math.pow(this.ts2, this.bl); this.f = this.el / this.h; this.g = .5 * (this.f - 1.0 / this.f); this.j = (this.el * this.el - this.l * this.h) / (this.el * this.el + this.l * this.h); this.p = (this.l - this.h) / (this.l + this.h); this.dlon = this.lon1 - this.lon2; if (this.dlon < -Proj4js.common.PI) this.lon2 = this.lon2 - 2.0 * Proj4js.common.PI; if (this.dlon > Proj4js.common.PI) this.lon2 = this.lon2 + 2.0 * Proj4js.common.PI; this.dlon = this.lon1 - this.lon2; this.longc = .5 * (this.lon1 + this.lon2) - Math.atan(this.j * Math.tan(.5 * this.bl * this.dlon) / this.p) / this.bl; this.dlon = Proj4js.common.adjust_lon(this.lon1 - this.longc); this.gama = Math.atan(Math.sin(this.bl * this.dlon) / this.g); this.alpha = Proj4js.common.asinz(this.d * Math.sin(this.gama)); if (Math.abs(this.lat1 - this.lat2) <= Proj4js.common.EPSLN) { Proj4js.reportError("omercInitDataError"); } else { this.con = Math.abs(this.lat1); }
      if ((this.con <= Proj4js.common.EPSLN) || (Math.abs(this.con - HALF_PI) <= Proj4js.common.EPSLN)) { Proj4js.reportError("omercInitDataError"); } else { if (Math.abs(Math.abs(this.lat0) - Proj4js.common.HALF_PI) <= Proj4js.common.EPSLN) { Proj4js.reportError("omercInitDataError"); } }
      this.singam = Math.sin(this.gam); this.cosgam = Math.cos(this.gam); this.sinaz = Math.sin(this.alpha); this.cosaz = Math.cos(this.alpha); if (this.lat0 >= 0) { this.u = (this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1.0) / this.cosaz); } else { this.u = -(this.al / this.bl) * Math.atan(Math.sqrt(this.d * this.d - 1.0) / this.cosaz); }
    }
  }, forward: function (p) {
    var theta; var sin_phi, cos_phi; var b; var c, t, tq; var con, n, ml; var q, us, vl; var ul, vs; var s; var dlon; var ts1; var lon = p.x; var lat = p.y; sin_phi = Math.sin(lat); dlon = Proj4js.common.adjust_lon(lon - this.longc); vl = Math.sin(this.bl * dlon); if (Math.abs(Math.abs(lat) - Proj4js.common.HALF_PI) > Proj4js.common.EPSLN) { ts1 = Proj4js.common.tsfnz(this.e, lat, sin_phi); q = this.el / (Math.pow(ts1, this.bl)); s = .5 * (q - 1.0 / q); t = .5 * (q + 1.0 / q); ul = (s * this.singam - vl * this.cosgam) / t; con = Math.cos(this.bl * dlon); if (Math.abs(con) < .0000001) { us = this.al * this.bl * dlon; } else { us = this.al * Math.atan((s * this.cosgam + vl * this.singam) / con) / this.bl; if (con < 0) us = us + Proj4js.common.PI * this.al / this.bl; } } else {
      if (lat >= 0) { ul = this.singam; } else { ul = -this.singam; }
      us = this.al * lat / this.bl;
    }
    if (Math.abs(Math.abs(ul) - 1.0) <= Proj4js.common.EPSLN) { Proj4js.reportError("omercFwdInfinity"); }
    vs = .5 * this.al * Math.log((1.0 - ul) / (1.0 + ul)) / this.bl; us = us - this.u; var x = this.x0 + vs * this.cosaz + us * this.sinaz; var y = this.y0 + us * this.cosaz - vs * this.sinaz; p.x = x; p.y = y; return p;
  }, inverse: function (p) {
    var delta_lon; var theta; var delta_theta; var sin_phi, cos_phi; var b; var c, t, tq; var con, n, ml; var vs, us, q, s, ts1; var vl, ul, bs; var dlon; var flag; p.x -= this.x0; p.y -= this.y0; flag = 0; vs = p.x * this.cosaz - p.y * this.sinaz; us = p.y * this.cosaz + p.x * this.sinaz; us = us + this.u; q = Math.exp(-this.bl * vs / this.al); s = .5 * (q - 1.0 / q); t = .5 * (q + 1.0 / q); vl = Math.sin(this.bl * us / this.al); ul = (vl * this.cosgam + s * this.singam) / t; if (Math.abs(Math.abs(ul) - 1.0) <= Proj4js.common.EPSLN) { lon = this.longc; if (ul >= 0.0) { lat = Proj4js.common.HALF_PI; } else { lat = -Proj4js.common.HALF_PI; } } else { con = 1.0 / this.bl; ts1 = Math.pow((this.el / Math.sqrt((1.0 + ul) / (1.0 - ul))), con); lat = Proj4js.common.phi2z(this.e, ts1); theta = this.longc - Math.atan2((s * this.cosgam - vl * this.singam), con) / this.bl; lon = Proj4js.common.adjust_lon(theta); }
    p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.lcc = {
  init: function () {
    if (!this.lat2) { this.lat2 = this.lat0; }
    if (!this.k0) this.k0 = 1.0; if (Math.abs(this.lat1 + this.lat2) < Proj4js.common.EPSLN) { Proj4js.reportError("lcc:init: Equal Latitudes"); return; }
    var temp = this.b / this.a; this.e = Math.sqrt(1.0 - temp * temp); var sin1 = Math.sin(this.lat1); var cos1 = Math.cos(this.lat1); var ms1 = Proj4js.common.msfnz(this.e, sin1, cos1); var ts1 = Proj4js.common.tsfnz(this.e, this.lat1, sin1); var sin2 = Math.sin(this.lat2); var cos2 = Math.cos(this.lat2); var ms2 = Proj4js.common.msfnz(this.e, sin2, cos2); var ts2 = Proj4js.common.tsfnz(this.e, this.lat2, sin2); var ts0 = Proj4js.common.tsfnz(this.e, this.lat0, Math.sin(this.lat0)); if (Math.abs(this.lat1 - this.lat2) > Proj4js.common.EPSLN) { this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2); } else { this.ns = sin1; }
    this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns)); this.rh = this.a * this.f0 * Math.pow(ts0, this.ns); if (!this.title) this.title = "Lambert Conformal Conic";
  }, forward: function (p) {
    var lon = p.x; var lat = p.y; if (lat <= 90.0 && lat >= -90.0 && lon <= 180.0 && lon >= -180.0) { } else { Proj4js.reportError("lcc:forward: llInputOutOfRange: " + lon + " : " + lat); return null; }
    var con = Math.abs(Math.abs(lat) - Proj4js.common.HALF_PI); var ts, rh1; if (con > Proj4js.common.EPSLN) { ts = Proj4js.common.tsfnz(this.e, lat, Math.sin(lat)); rh1 = this.a * this.f0 * Math.pow(ts, this.ns); } else {
      con = lat * this.ns; if (con <= 0) { Proj4js.reportError("lcc:forward: No Projection"); return null; }
      rh1 = 0;
    }
    var theta = this.ns * Proj4js.common.adjust_lon(lon - this.long0); p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0; p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0; return p;
  }, inverse: function (p) {
    var rh1, con, ts; var lat, lon; var x = (p.x - this.x0) / this.k0; var y = (this.rh - (p.y - this.y0) / this.k0); if (this.ns > 0) { rh1 = Math.sqrt(x * x + y * y); con = 1.0; } else { rh1 = -Math.sqrt(x * x + y * y); con = -1.0; }
    var theta = 0.0; if (rh1 != 0) { theta = Math.atan2((con * x), (con * y)); }
    if ((rh1 != 0) || (this.ns > 0.0)) { con = 1.0 / this.ns; ts = Math.pow((rh1 / (this.a * this.f0)), con); lat = Proj4js.common.phi2z(this.e, ts); if (lat == -9999) return null; } else { lat = -Proj4js.common.HALF_PI; }
    lon = Proj4js.common.adjust_lon(theta / this.ns + this.long0); p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.laea = {
  S_POLE: 1, N_POLE: 2, EQUIT: 3, OBLIQ: 4, init: function () {
    var t = Math.abs(this.lat0); if (Math.abs(t - Proj4js.common.HALF_PI) < Proj4js.common.EPSLN) { this.mode = this.lat0 < 0. ? this.S_POLE : this.N_POLE; } else if (Math.abs(t) < Proj4js.common.EPSLN) { this.mode = this.EQUIT; } else { this.mode = this.OBLIQ; }
    if (this.es > 0) { var sinphi; this.qp = Proj4js.common.qsfnz(this.e, 1.0); this.mmf = .5 / (1. - this.es); this.apa = this.authset(this.es); switch (this.mode) { case this.N_POLE: case this.S_POLE: this.dd = 1.; break; case this.EQUIT: this.rq = Math.sqrt(.5 * this.qp); this.dd = 1. / this.rq; this.xmf = 1.; this.ymf = .5 * this.qp; break; case this.OBLIQ: this.rq = Math.sqrt(.5 * this.qp); sinphi = Math.sin(this.lat0); this.sinb1 = Proj4js.common.qsfnz(this.e, sinphi) / this.qp; this.cosb1 = Math.sqrt(1. - this.sinb1 * this.sinb1); this.dd = Math.cos(this.lat0) / (Math.sqrt(1. - this.es * sinphi * sinphi) * this.rq * this.cosb1); this.ymf = (this.xmf = this.rq) / this.dd; this.xmf *= this.dd; break; } } else { if (this.mode == this.OBLIQ) { this.sinph0 = Math.sin(this.lat0); this.cosph0 = Math.cos(this.lat0); } }
  }, forward: function (p) {
    var x, y; var lam = p.x; var phi = p.y; lam = Proj4js.common.adjust_lon(lam - this.long0); if (this.sphere) {
      var coslam, cosphi, sinphi; sinphi = Math.sin(phi); cosphi = Math.cos(phi); coslam = Math.cos(lam); switch (this.mode) {
        case this.OBLIQ: case this.EQUIT: y = (this.mode == this.EQUIT) ? 1. + cosphi * coslam : 1. + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam; if (y <= Proj4js.common.EPSLN) { Proj4js.reportError("laea:fwd:y less than eps"); return null; }
          y = Math.sqrt(2. / y); x = y * cosphi * Math.sin(lam); y *= (this.mode == this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam; break; case this.N_POLE: coslam = -coslam; case this.S_POLE: if (Math.abs(phi + this.phi0) < Proj4js.common.EPSLN) { Proj4js.reportError("laea:fwd:phi < eps"); return null; }
          y = Proj4js.common.FORTPI - phi * .5; y = 2. * ((this.mode == this.S_POLE) ? Math.cos(y) : Math.sin(y)); x = y * Math.sin(lam); y *= coslam; break;
      }
    } else {
      var coslam, sinlam, sinphi, q, sinb = 0.0, cosb = 0.0, b = 0.0; coslam = Math.cos(lam); sinlam = Math.sin(lam); sinphi = Math.sin(phi); q = Proj4js.common.qsfnz(this.e, sinphi); if (this.mode == this.OBLIQ || this.mode == this.EQUIT) { sinb = q / this.qp; cosb = Math.sqrt(1. - sinb * sinb); }
      switch (this.mode) { case this.OBLIQ: b = 1. + this.sinb1 * sinb + this.cosb1 * cosb * coslam; break; case this.EQUIT: b = 1. + cosb * coslam; break; case this.N_POLE: b = Proj4js.common.HALF_PI + phi; q = this.qp - q; break; case this.S_POLE: b = phi - Proj4js.common.HALF_PI; q = this.qp + q; break; }
      if (Math.abs(b) < Proj4js.common.EPSLN) { Proj4js.reportError("laea:fwd:b < eps"); return null; }
      switch (this.mode) {
        case this.OBLIQ: case this.EQUIT: b = Math.sqrt(2. / b); if (this.mode == this.OBLIQ) { y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam); } else { y = (b = Math.sqrt(2. / (1. + cosb * coslam))) * sinb * this.ymf; }
          x = this.xmf * b * cosb * sinlam; break; case this.N_POLE: case this.S_POLE: if (q >= 0.) { x = (b = Math.sqrt(q)) * sinlam; y = coslam * ((this.mode == this.S_POLE) ? b : -b); } else { x = y = 0.; }
          break;
      }
    }
    p.x = this.a * x + this.x0; p.y = this.a * y + this.y0; return p;
  }, inverse: function (p) {
    p.x -= this.x0; p.y -= this.y0; var x = p.x / this.a; var y = p.y / this.a; if (this.sphere) {
      var cosz = 0.0, rh, sinz = 0.0; rh = Math.sqrt(x * x + y * y); var phi = rh * .5; if (phi > 1.) { Proj4js.reportError("laea:Inv:DataError"); return null; }
      phi = 2. * Math.asin(phi); if (this.mode == this.OBLIQ || this.mode == this.EQUIT) { sinz = Math.sin(phi); cosz = Math.cos(phi); }
      switch (this.mode) { case this.EQUIT: phi = (Math.abs(rh) <= Proj4js.common.EPSLN) ? 0. : Math.asin(y * sinz / rh); x *= sinz; y = cosz * rh; break; case this.OBLIQ: phi = (Math.abs(rh) <= Proj4js.common.EPSLN) ? this.phi0 : Math.asin(cosz * sinph0 + y * sinz * cosph0 / rh); x *= sinz * cosph0; y = (cosz - Math.sin(phi) * sinph0) * rh; break; case this.N_POLE: y = -y; phi = Proj4js.common.HALF_PI - phi; break; case this.S_POLE: phi -= Proj4js.common.HALF_PI; break; }
      lam = (y == 0. && (this.mode == this.EQUIT || this.mode == this.OBLIQ)) ? 0. : Math.atan2(x, y);
    } else {
      var cCe, sCe, q, rho, ab = 0.0; switch (this.mode) {
        case this.EQUIT: case this.OBLIQ: x /= this.dd; y *= this.dd; rho = Math.sqrt(x * x + y * y); if (rho < Proj4js.common.EPSLN) { p.x = 0.; p.y = this.phi0; return p; }
          sCe = 2. * Math.asin(.5 * rho / this.rq); cCe = Math.cos(sCe); x *= (sCe = Math.sin(sCe)); if (this.mode == this.OBLIQ) {
            ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho
            q = this.qp * ab; y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
          } else { ab = y * sCe / rho; q = this.qp * ab; y = rho * cCe; }
          break; case this.N_POLE: y = -y; case this.S_POLE: q = (x * x + y * y); if (!q) { p.x = 0.; p.y = this.phi0; return p; }
          ab = 1. - q / this.qp; if (this.mode == this.S_POLE) { ab = -ab; }
          break;
      }
      lam = Math.atan2(x, y); phi = this.authlat(Math.asin(ab), this.apa);
    }
    p.x = Proj4js.common.adjust_lon(this.long0 + lam); p.y = phi; return p;
  }, P00: .33333333333333333333, P01: .17222222222222222222, P02: .10257936507936507936, P10: .06388888888888888888, P11: .06640211640211640211, P20: .01641501294219154443, authset: function (es) { var t; var APA = new Array(); APA[0] = es * this.P00; t = es * es; APA[0] += t * this.P01; APA[1] = t * this.P10; t *= es; APA[0] += t * this.P02; APA[1] += t * this.P11; APA[2] = t * this.P20; return APA; }, authlat: function (beta, APA) { var t = beta + beta; return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t)); }
}; Proj4js.Proj.aeqd = {
  init: function () { this.sin_p12 = Math.sin(this.lat0); this.cos_p12 = Math.cos(this.lat0); }, forward: function (p) {
    var lon = p.x; var lat = p.y; var ksp; var sinphi = Math.sin(p.y); var cosphi = Math.cos(p.y); var dlon = Proj4js.common.adjust_lon(lon - this.long0); var coslon = Math.cos(dlon); var g = this.sin_p12 * sinphi + this.cos_p12 * cosphi * coslon; if (Math.abs(Math.abs(g) - 1.0) < Proj4js.common.EPSLN) { ksp = 1.0; if (g < 0.0) { Proj4js.reportError("aeqd:Fwd:PointError"); return; } } else { var z = Math.acos(g); ksp = z / Math.sin(z); }
    p.x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon); p.y = this.y0 + this.a * ksp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * coslon); return p;
  }, inverse: function (p) {
    p.x -= this.x0; p.y -= this.y0; var rh = Math.sqrt(p.x * p.x + p.y * p.y); if (rh > (2.0 * Proj4js.common.HALF_PI * this.a)) { Proj4js.reportError("aeqdInvDataError"); return; }
    var z = rh / this.a; var sinz = Math.sin(z); var cosz = Math.cos(z); var lon = this.long0; var lat; if (Math.abs(rh) <= Proj4js.common.EPSLN) { lat = this.lat0; } else { lat = Proj4js.common.asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh); var con = Math.abs(this.lat0) - Proj4js.common.HALF_PI; if (Math.abs(con) <= Proj4js.common.EPSLN) { if (lat0 >= 0.0) { lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2(p.x, -p.y)); } else { lon = Proj4js.common.adjust_lon(this.long0 - Math.atan2(-p.x, p.y)); } } else { con = cosz - this.sin_p12 * Math.sin(lat); if ((Math.abs(con) < Proj4js.common.EPSLN) && (Math.abs(p.x) < Proj4js.common.EPSLN)) { } else { var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh)); lon = Proj4js.common.adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh))); } } }
    p.x = lon; p.y = lat; return p;
  }
}; Proj4js.Proj.moll = {
  init: function () { }, forward: function (p) {
    var lon = p.x; var lat = p.y; var delta_lon = Proj4js.common.adjust_lon(lon - this.long0); var theta = lat; var con = Proj4js.common.PI * Math.sin(lat); for (var i = 0; true; i++) { var delta_theta = -(theta + Math.sin(theta) - con) / (1.0 + Math.cos(theta)); theta += delta_theta; if (Math.abs(delta_theta) < Proj4js.common.EPSLN) break; if (i >= 50) { Proj4js.reportError("moll:Fwd:IterationError"); } }
    theta /= 2.0; if (Proj4js.common.PI / 2 - Math.abs(lat) < Proj4js.common.EPSLN) delta_lon = 0; var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0; var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0; p.x = x; p.y = y; return p;
  }, inverse: function (p) { var theta; var arg; p.x -= this.x0; var arg = p.y / (1.4142135623731 * this.a); if (Math.abs(arg) > 0.999999999999) arg = 0.999999999999; var theta = Math.asin(arg); var lon = Proj4js.common.adjust_lon(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta)))); if (lon < (-Proj4js.common.PI)) lon = -Proj4js.common.PI; if (lon > Proj4js.common.PI) lon = Proj4js.common.PI; arg = (2.0 * theta + Math.sin(2.0 * theta)) / Proj4js.common.PI; if (Math.abs(arg) > 1.0) arg = 1.0; var lat = Math.asin(arg); p.x = lon; p.y = lat; return p; }
};