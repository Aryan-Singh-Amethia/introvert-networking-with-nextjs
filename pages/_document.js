import Document ,{ Html, Head, Main, NextScript } from "next/document";


class LayoutDocument extends Document{
    render(){
        return <Html>
            <Head/>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    }
};

export default LayoutDocument;
