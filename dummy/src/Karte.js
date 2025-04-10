// -------------------------------------------------------
// Dieses Script ist für die Darstellung der GIS-Daten in 
// einer Hintergrundkarte zuständig
// -------------------------------------------------------

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css"; // Import OpenLayers CSS
import Map from "ol/Map";
import View from "ol/View";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorLayer from "ol/layer/Vector";
import { ThemeProvider } from "@mui/material/styles";
import { Projection } from "ol/proj";
import Box from "@mui/material/Box";
//import theme from "./theme";
import { ZoomToExtent, defaults as defaultControls } from "ol/control.js";
import { createVectorSource } from "./kartenWFS.js";
import { SwisstopoLayer } from "./swisstopoLayer.js";
import { strassensegmenteStyle } from "./kartenStyles.js";


const Karte = () => {
    const mapRef = useRef(null);
    const [setselectedFeature, setSelectedFeature] = useState(null);


    useEffect (() => {
    // WFS Anfrage für alle Strassensegmente aus KartenWFS.js

        const strassensegmenteSource = createVectorSource ("strassensegment", bboxStrategy);


        // Strassensegmenlayer Style aus kartenlayerstyle.js
        const strassensegmentLayer = new VectorLayer({
            source: strassensegmenteSource,
            style: strassensegmenteStyle,
        });


        //Definition des Kartenextents für WMS/WMTS
        const extent = [2420000, 1300000, 2900000, 1350000];
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
                strassensegmentLayer
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

    // Funktion wenn auf ein Vektorlayer geklickt wird
    const handleClick = (event) => {
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
            console.log('Feature Eigenschaften:', feature.getProperties());

            // Maximal sowie Minimal Zoomsstufe einstellen
            const minZoomLevel = 8; // mindestzoomstufe
            const maxZoomLevel = 18; // maxzoomstufe
            map.getView().setMinZoom(minZoomLevel);
            map.getView().setMaxZoom(maxZoomLevel);

            // Zoom auf das ausgewählte Feature
            map.getView().fit(feature.getGeometry().getExtent(),{
                duration: 500,
                padding: [1000,1000,1000,1000],
            });

            setSelectedFeature(feature.getProperties());  



        });
    };

    // Event-Handler für das Klicken auf die Features hinzufügen

    map.on('click', handleClick);

    // Anpassung der Fenstergrösse

    window.addEventListener('resize', () => {
        map.updateSize();
    });

    return () =>{
        map.on('click', handleClick);
        window.removeEventListener('resize', () =>{
            map.updateSize();
        });
    };



    }, []);

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="left"
            alignItems="flex-start"
            gap={2}
            sx={{
                width: "95vw", // Volle Breite der Elternbox
                borderRadius: "3vw",
                bgcolor: "p_white.main",
                position: "relative",
                overflowY: "auto",
            }}
        >
            <Box
                ref={mapRef}
                sx={{
                    flexGrow: 1,
                    borderRadius: '3vw',
                    overflow: 'hidden',
                    bgcolor: 'inherit',

                }}
            ></Box>
        </Box>    
    );

};

export default Karte;