//---------------------------------------------------------------
//  Dieser Code erstellt mithilfe von OpenLayers 
// eine WMS-Kachelschicht von swisstopo. In diesem
// Beispiel wird die Schicht "ch.swisstopo.swissimage" verwendet
//--------------------------------------------------------------
import TileLayer from "ol/layer/Tile"; 
import { TileWMS } from "ol/source";

export function SwisstopoLayer(extent) {
  return new TileLayer({
    extent: extent,
    source: new TileWMS({
      // Basis-URL
      url: "https://wms.geo.admin.ch/",
      crossOrigin: "anonymous",
      //Quellenangabe
      attributions:
        '© <a href="https://www.geo.admin.ch/de/wms-verfuegbare-dienste-und-daten" >geo.admin.ch</a>',
      projection: "EPSG:2056",
      params: {
        // Layer-URL
        LAYERS: "ch.swisstopo.swissimage",
        FORMAT: "image/jpeg",
      },
      serverType: "mapserver",
    }),
  });
}