import usePDF from "../react-use-pdf";

export function Simple() {
    const pdf = usePDF('./sample.pdf')
    return (
        <div>
            {pdf && pdf.map((pages, index) =>
                <pages.canvas key={index} {...pages.props}/>
            )}
        </div>
    )
}