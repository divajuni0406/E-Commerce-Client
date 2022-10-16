import Head from "next/head";

export default function Meta(props) {
  return (
    <div>
      <Head>
        <meta name="sober" content="website e-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <div>{props.children}</div>
    </div>
  );
}