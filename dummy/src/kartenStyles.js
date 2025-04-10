// -------------------------------------------------
// Dieses Script definiert den Stil der WMS Layern.
// -------------------------------------------------

// Import der Benötigten Bibliotheken
import { Style, Stroke} from 'ol/style';

export function strassensegmenteStyle(feature){
    return new Style({
        stroke: new Stroke({
            color: 'black',
            width: 2,
        }),
    });
}

