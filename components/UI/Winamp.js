import React, { useCallback, useEffect, useRef, useState } from "react";
import Webamp from "webamp";

function Winamp({ onClose, onMinimize }) {
  const [winampSongs, setWinampSongs] = useState([]);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const webamp = useRef(null);

  const fetchSongsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://admin.labestiaradio.com/api/v1/top_songs"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const initialTracks = data.data.map((item) => {
        const songFile =
          "https://admin.labestiaradio.com/uploads/sonaditas/" + item.file;
        return {
          url: songFile,
          duration: "",
          metaData: {
            title: item.name,
            artist: "",
            album: "",
          },
        };
      });

      // WINAMP
      const target = ref.current;
      if (!target) {
        return;
      }
      webamp.current = new Webamp({
        initialTracks,
      });
      webamp.current.renderWhenReady(target).then(() => {
        target.appendChild(document.querySelector("#webamp"));
      });
      return () => {
        webamp.current.dispose();
        webamp.current = null;
      };
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchSongsHandler();
  }, [fetchSongsHandler]);

  return (
    <div
      style={{
        position: "fixed",
        width: "300px",
        height: "500px",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
      ref={ref}
    />
  );
}

export default Winamp;
