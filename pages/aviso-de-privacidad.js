import Head from "next/head";
import Image from "next/image";
import HeadContent from "../components/Layout/HeadContent";
import classes from "../styles/radioteca.module.css";

const Radioteca = () => {
  return (
    <div>
      <Head>
        <title>La Bestia Radio</title>
        <HeadContent />
      </Head>
      <main className={classes.radioteca}>
        <div className={classes.container}>
          <div className={classes.title}>
            <h2>Aviso de privacidad</h2>
          </div>
          <div className={classes.divider} />
          <div>
            <p>
              When connecting to our radio stream, your IP address will be sent
              to our radio service provider in order for us to track listening
              trends and provide licensing bodies with royalty reports. Once our
              service provider receives your IP it is immediately anonymised,
              deleted and becomes untraceable. This data is never sold on or
              passed to other companies.
            </p>
            <p>
              <b>For iOS Apps</b>
              <br></br>
              The &apos;LA BESTIA RADIO&apos; iOS App does not collect any user
              data when installed or launched on your device.
            </p>
            <p>
              <b>For Android Apps</b>
              <br></br>
              The &apos;LA BESTIA RADIO&apos; Android App does not collect any
              user data during use. In order to provide audio control during
              Phone App use, the App will monitor the &apos;state&apos; of the
              phone App (Idle, in call, call ended) if applicable on your
              device. At no point will the App be able to listen in or derive
              phone numbers or data.<br></br>
              The Android App also requires access to local storage. This is to
              store its configuration for faster launch times.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Radioteca;
