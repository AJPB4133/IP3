/*---------------------------------------
  WFS-Anfrage für die Karte,
  Code from Alpine_Ace
  ---------------------------------------*/

import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import config from "./network/network_config";

// WFS Anfrage-Funktion

const geoserverWFSAnfrage = `${config.projectIPadress}:8080/geoserver/IP3/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=`;
const geoserverWFSOutputFormat = "&outputFormat=application/json";

export function createVectorSource(Abfrage, bboxStrategy) {
  return new VectorSource({
    format: new GeoJSON(),
    url: function (extent) {
      return (
        geoserverWFSAnfrage + "IP3:" + Abfrage + geoserverWFSOutputFormat
      );
    },
    strategy: bboxStrategy,
    onError: function (error) {
      console.error("Error fetching WFS data for " + Abfrage + ":", error);
    },
  });
}

