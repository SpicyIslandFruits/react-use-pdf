import * as pdfjsLib from "pdfjs-dist";
import React, { ReactElement } from "react";
type CanvasProps = {
    page: Promise<pdfjsLib.PDFPageProxy>;
    style?: React.CSSProperties;
};
type PDF = {
    canvas(props: CanvasProps): ReactElement;
    props: CanvasProps;
}[];
declare function usePDF(src: string): PDF | undefined;
export default usePDF;
