// -------------------------------------------------------
// Dieses Script ist für die Darstellung der GIS-Daten in 
// einer Hintergrundkarte zuständig.
// -------------------------------------------------------

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css"; 
import Map from "ol/Map";
import View from "ol/View";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorLayer from "ol/layer/Vector";
import { Projection } from "ol/proj";
import Box from "@mui/material/Box";

import { createVectorSource } from "./kartenWFS.js";
import { SwisstopoLayer } from "./swisstopoLayer.js";
import { strassensegmenteStyle } from "./kartenStyles.js";



const Karte = () => {
    const mapRef = useRef(null);
    useEffect (() => {
        // WFS Anfrage für alle Strassensegmente aus KartenWFS.js
        const strassensegmentSource = createVectorSource ('strassensegment', bboxStrategy);


        // Strassensegmenlayer Style aus kartenlayerstyle.js
        const strassensegmentLayer = new VectorLayer({
            source: strassensegmentSource,
            style: strassensegmenteStyle,
        });


        //Definition des Kartenextents für WMS/WMTS
        const extent = [2619675, 1263843, 2621828, 1265690];
        // WMS SwissImage holen mit der Funktion SwisstopoLayer aus dem File swisstopoLayer.js
        const WMSswissimageLayer = SwisstopoLayer(extent);

        // Layer Reihenfolge festlegen
        WMSswissimageLayer.setZIndex(0);
        strassensegmentLayer.setZIndex(1);

        // Karte erstellen
        const map = new Map({
                layers: [
                    WMSswissimageLayer,
                    strassensegmentLayer
            ],
            target: mapRef.current,
            view: new View({
                center: [2620658.9, 1264874.1],
                zoom: 17,
                projection: new Projection({
                code: "EPSG:2056",
                units: "m",
            }),
        }),

    });
   
    }, []);


    return (
        <div>
          <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
        </div>
      );
    };

export default Karte;