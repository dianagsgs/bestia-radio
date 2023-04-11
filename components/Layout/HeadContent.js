import { Fragment } from "react";

const HeadContent = () => {
  return (
    <Fragment>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="La estación musical oficial de La Bestia"
      />
      <meta
        name="keywords"
        content="la bestia, radio, musica, independiente, mexico, usa, rock, pop, alternativo"
      />
      <meta name="author" content="Vannelo - http://www.vannelo.com" />
      <meta name="copyright" content="Vannelo - http://www.vannelo.com" />
      <link rel="icon" href="/img/icon.jpg" />



      {/* SOCIAL */}

      <meta property="og:title" content="La Bestia Radio" />
      <meta
        property="og:description"
        content="La estación musical oficial de La Bestia"
      />
      <meta property="og:url" content="https://www.labestiaradio.com/" />
      <meta
        property="og:image"
        content="meta.png"
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="player" />        
    </Fragment>
  );
};

export default HeadContent;
