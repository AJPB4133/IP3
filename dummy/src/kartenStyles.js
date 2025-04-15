// -------------------------------------------------
// Dieses Script definiert den Stil der WFS Layern.
// -------------------------------------------------

// Import der Benötigten Bibliotheken
import { Style, Stroke} from 'ol/style';

export function strassensegmenteStyle(){
    return new Style({
        stroke: new Stroke({
            color: 'black',
            width: 5,
        }),
    });
}

