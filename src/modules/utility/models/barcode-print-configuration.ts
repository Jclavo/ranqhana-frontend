export class BarcodePrintConfiguration {

    public id: string = '';
    public divWidth: string = '';
    public divHeight: string = '';
    public divQuantity: number = 0;

    public barcodeWidth: number = 0;
    public barcodeHeight: number = 0;

    public fontSize: string = '';

    constructor(
        _divWidth: string, _divHeight: string, _divQuantity: number,
        _barcodeWidth: number, _barcodeHeight: number, _fontSize: string
        ) {
        this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        this.divWidth = _divWidth;
        this.divHeight = _divHeight;
        this.divQuantity = _divQuantity;
        this.barcodeWidth = _barcodeWidth;
        this.barcodeHeight = _barcodeHeight;
        this.fontSize = _fontSize;
    }
}