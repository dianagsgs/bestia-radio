import React, { Fragment, useCallback, useRef, useState } from "react";
import styles from "./Modal.module.css";
import MenuThemes from "../Layout/MenuThemes";

const Modal = React.forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef("");
  const songRef = useRef("");
  let text;

  // SUSBSCRIBER
  const subscriberHandler = useCallback(async (event) => {
    setIsLoading(true);
    setMessage(<p>Pactando con el diablo...</p>);
    setError(null);

    event.preventDefault();
    const email = {
      email: emailRef.current.value,
    };

    try {
      const response = await fetch(
        "https://admin.labestiaradio.com/api/v1/forms/subscriber",
        {
          method: "POST",
          body: JSON.stringify(email),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "error") {
        setMessage(<p>El email que ingresaste ya ha pactado con el diablo</p>);
        throw new Error("Error:  email duplicated");
      }

      setIsDone(true);
      setMessage(<p>Has pactado exitosamente</p>);
    } catch (error) {
      console.log(error.message);
      setIsDone(false);
      setError("El email que ingresaste ya ha pactado con el diablo");
    }

    setIsLoading(false);
  }, []);

  // SONGS
  const songHandler = useCallback(async (event) => {
    setIsLoading(true);
    setMessage(<p>Enviando la rola...</p>);
    setError(null);

    event.preventDefault();
    const song = { name: songRef.current.value };

    try {
      const response = await fetch(
        "https://admin.labestiaradio.com/api/v1/forms/song",
        {
          method: "POST",
          body: JSON.stringify(song),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setMessage(<p>Recibímos la rola, más te vale que esté buena.</p>);
      setIsDone(true);
    } catch (err) {
      console.log(err);
      setIsDone(false);
      setError("Un error inesperado");
    }

    setIsLoading(false);
  }, []);

  let content;
  switch (props.type) {
    case "1":
      content = (
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <img src="/img/modal/icon1.png" />
            Pacta con la bestia
            <img
              src="/img/modal/close.png"
              className={styles.close_img}
              onClick={props.onHideModal}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.message}>
              <img src="/img/modal/alert.png" className={styles.message_img} />
              {message ? (
                message
              ) : (
                <p>
                  No queremos tu alma, queremos tu correo. Únete a nuestra secta
                  y mailing list para saber qué es lo que escucha satanás antes
                  que nadie.
                </p>
              )}
            </div>

            {!isDone && !isLoading && (
              <div className={styles.form}>
                <form onSubmit={subscriberHandler}>
                  <label>Vas con tu email:</label>
                  <input type="email" name="email" ref={emailRef} required />
                  <div className={styles.submit_box}>
                    <button type="submit">Pactar</button>
                  </div>
                </form>
              </div>
            )}
            {isDone && (
              <div className={styles.submit_box}>
                <button onClick={props.onHideModal}>OK</button>
              </div>
            )}
          </div>
        </div>
      );
      break;
    case "2":
      content = (
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <img src="/img/modal/icon2.png" />
            Rola una rola
            <img
              src="/img/modal/close.png"
              className={styles.close_img}
              onClick={props.onHideModal}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.message}>
              <img src="/img/modal/alert.png" className={styles.message_img} />
              {message ? (
                message
              ) : (
                <p>
                  Ya no sabemos qué poner. Recomiéndanos algo bueno o no lo
                  ponemos..
                </p>
              )}
            </div>

            {!isDone && !isLoading && (
              <div className={styles.form}>
                <form onSubmit={songHandler}>
                  <label>Vas con tu rola:</label>
                  <input type="text" name="song" ref={songRef} required />
                  <div className={styles.submit_box}>
                    <button type="submit">Rolar</button>
                  </div>
                </form>
              </div>
            )}
            {isDone && (
              <div className={styles.submit_box}>
                <button onClick={props.onHideModal}>OK</button>
              </div>
            )}
          </div>
        </div>
      );
      break;
    case "3":
      content = (
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <img src="/img/icons/icon-wallpaper.png" />
            Cambia tu wallpaper
            <img
              src="/img/modal/close.png"
              className={styles.close_img}
              onClick={props.onHideModal}
            />
          </div>
          <div className={styles.content}>
            <MenuThemes
              folder={props.wallpaperFolder}
              count={props.wallpaperCount}
              custom_names={props.custom_names}
            />
          </div>
        </div>
      );
      break;
  }

  return <Fragment>{content}</Fragment>;
});

export default Modal;
