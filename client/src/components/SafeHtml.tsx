import DOMPurify from "dompurify";

interface SafeHtmlProps {
    html: string;
}

export default function SafeHtml({
    html,
}: SafeHtmlProps) {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(html),
            }}
        />
    );
}