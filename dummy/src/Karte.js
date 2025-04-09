/* Karte mit GIS Daten */

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css"; // Import OpenLayers CSS
import Map from "ol/Map";
import View from "ol/View";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorLayer from "ol/layer/Vector";
import { ThemeProvider } from "@mui/material/styles";
import { Projection } from "ol/proj";
import Box from "@mui/material/Box";
import theme from "./theme";
import { ZoomToExtent, defaults as defaultControls } from "ol/control.js";
import { createVectorSource } from "./kartenWFS.js";
import { SwisstopoLayer } from "./swisstopoLayer.js";

const Karte = () => {
    const mapRef = useRef(null);
    const [setselectedFeature, setSelectedFeature] = useState(null);


    useEffect (() => {
    // WFS Anfrage für alle Strassensegmente aus KartenWFS.js

        const strassensegmenteSource = createVectorSource ("strassensegment", bboxStrategy);


        // Strassensegmenlayer Style aus kartenlayerstyle.js
        const strassensegmentLayer = new VectorLayer({
            source: strassensegmenteSource,
            //style: strassensegmentLayerStyle,
        });


        //Definition des Kartenextents für WMS/WMTS
        const extent = [2420000, 130000, 2900000, 1350000];
        // WMS Winterlandeskarte holen mit der Funktion SwisstopoLayer aus dem File swisstopoLayer.js
        const WMSswissimageLayer = SwisstopoLayer(extent);

        // Layer Reihenfolge festlegen, 0 ist zuunterst
        WMSswissimageLayer.setZIndex(0);
        strassensegmentLayer.setZIndex(1);

        // Karte erstellen
        const map = new Map({
            //Zoom to Extent Button hinzufügen
            controls: defaultControls().extend([
                new ZoomToExtent({
                    extent: [2755375, 1164628, 2775625, 1195443],
                }),
             ]),
            layers: [
                WMSswissimageLayer,
                //strassensegmentLayer
            ],
            target: mapRef.current,
            view: new View({
                center: [2762640.8, 1179359.1],
                zoom: 12,
                projection: new Projection({
                code: "EPSG:2056",
                units: "m",
            }),
        }),

    });



    }, []);

    

}



export default Karte;