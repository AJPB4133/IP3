/*-------------------------------------------------
 Dieses Script definiert den Stil der WFS Layern.
 -------------------------------------------------*/


import { Style, Stroke} from 'ol/style';

export function strassensegmenteStyle(){
    return new Style({
        stroke: new Stroke({
            color: 'black',
            width: 5,
        }),
    });
}

