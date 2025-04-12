import React, { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { GeoJSON } from 'ol/format';
import { Style, Stroke } from 'ol/style';
import { transform } from 'ol/proj';

const Kart = () => {
  const mapRef = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(), // Optional: Eine Basiskarte als Hintergrund
        }),
      ],
      view: new View({
        center: transform([7.77, 47.5], 'EPSG:4326', 'EPSG:2056'), // Beispielzentrum in der Schweiz, angepasst an EPSG:2056
        zoom: 12,
        projection: 'EPSG:2056',
      }),
    });
    setMap(initialMap);

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: `http://localhost:8080/geoserver/IP3/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IP3:strassensegment&outputFormat=application/json&srsName=EPSG:2056`,
      strategy: (extent, resolution) => [extent], // Lädt Features basierend auf der aktuellen Kartenansicht
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'black',
          width: 2,
        }),
      }),
    });

    map.addLayer(vectorLayer);

    
  }, [map]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default Kart;