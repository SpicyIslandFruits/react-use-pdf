import { jsx as _jsx } from "react/jsx-runtime";
import * as pdfjsLib from "pdfjs-dist";
import React, { useEffect, useState } from "react";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
function Canvas(props) {
    const canvasRef = React.useRef(null);
    const [state, setState] = React.useState('loading');
    useEffect(function () {
        if (state === 'loading') {
            const canvas = canvasRef.current;
            if (!canvas)
                return;
            const context = canvas.getContext('2d');
            if (!context)
                return;
            props.page.then((page) => {
                let viewport = page.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                // Prevent double rendering in strict mode
                if (canvas.ariaDisabled === 'true')
                    return;
                canvas.ariaDisabled = 'true';
                const renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    setState('success');
                    canvas.ariaDisabled = 'false';
                });
            });
        }
    });
    return (_jsx("canvas", { style: props.style, ref: canvasRef }));
}
function usePDF(src) {
    const loadingTask = pdfjsLib.getDocument(src);
    const [pdf, setPdf] = React.useState();
    const [state, setState] = useState('loading');
    useEffect(() => {
        if (state === 'loading') {
            loadingTask.promise.then((document) => {
                const pageNumbers = Array.from(Array(document.numPages), (e, i) => i + 1);
                const pdf = pageNumbers.map((pageNumber) => {
                    return {
                        canvas: Canvas,
                        props: { page: document.getPage(pageNumber) },
                    };
                });
                setPdf(pdf);
                setState('success');
            });
        }
    });
    return pdf;
}
export default usePDF;
