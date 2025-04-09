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