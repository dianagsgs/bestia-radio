import styles from "./MenuPodcasts.module.css";

const list = [
  {
    name: "ALV los placeres culpables",
    link: "https://open.spotify.com/show/3GOYSm50hopvoiPIjMc0po?si=UgzJF9JeQFGOm9Vzfk-S9w&dl_branch=1",
  },
  {
    name: "Anti·Tude",
    link: "https://open.spotify.com/show/6ChLtVgFHN99IgHmA7LqTK?si=zANTDNY-SqmnjlTcTMZjZg&dl_branch=1",
  },
  {
    name: "Baby Steps",
    link: "https://open.spotify.com/show/71GtAB6OLZzIJapIZLzvWl?si=zAdsSuT3RuqgXs8NAy3weg&dl_branch=1",
  },
  {
    name: "Bolas de Acero",
    link: "https://open.spotify.com/show/7GP5FqejEBajsJfIG1J9rv?si=R9jFrnS6RBe0cWQhIln8JQ&dl_branch=1",
  },
  {
    name: "Bomb-Link-Gogo",
    link: "https://open.spotify.com/show/71GtAB6OLZzIJapIZLzvWl?si=zAdsSuT3RuqgXs8NAy3weg&dl_branch=1",
  },
  {
    name: "Carolina in Pj’s",
    link: "https://open.spotify.com/show/7Fe4ETMqWTiio3OcXIrMUs?si=-OUtW9iBQ_6dkJ0FQmONTQ&dl_branch=1",
  },
  {
    name: "Como grasa para tus oídos",
    link: "https://open.spotify.com/show/130quNygpFi6YXJ9CriayI?si=rEBlbiuWRVufO6hXDzrmnw&dl_branch=1",
  },
  {
    name: "El Rincón del Dude",
    link: "https://open.spotify.com/show/2wUn5BYIlTxcWQq73hzG0h?si=oIrSGCt0QfWMekiJS1YBwA&dl_branch=1",
  },
  {
    name: "Frytu-Radio",
    link: "https://open.spotify.com/show/6wyCW5R43o4g31wJ5KKLDf?si=0kgwBRSyT8uLCmYZMHg6Gg&dl_branch=1",
  },
  {
    name: "Fuego Nuevo",
    link: "https://open.spotify.com/show/1ke5JMFuEyko8km6hLx8NB?si=7646UEeYRiy9l0vc5kUrzQ&dl_branch=1",
  },
  {
    name: "Garage o Muerte!",
    link: "https://open.spotify.com/show/23yNXx5p5OTwQsRRvoF6eD?si=kBfisBlzSqKVGVbPFPZ91A&dl_branch=1",
  },
  {
    name: "Grind Radio",
    link: "https://open.spotify.com/show/160j9O1kAIBuPIOITC2GUz?si=355F5ZrBSSidhXNz1DOP6Q&dl_branch=1",
  },
  {
    name: "Ground Control",
    link: "https://open.spotify.com/show/2UTDEE72Ul1lvNJ0yojOQ2?si=CV5Z9cJ_S-S9kNM0vF9Ftw&dl_branch=1",
  },
  {
    name: "La Sociedad Secreta de los Iguanodontes",
    link: "https://open.spotify.com/show/11IImMP3Esa9EsU88rKRRi?si=MHkC7ewVRiOtlOKu0WBHVw&dl_branch=1",
  },
  {
    name: "La Hora De La Bestia",
    link: "https://open.spotify.com/show/0HO22MqxADjyfF9SbVmY7L?si=n31oyTi7Q5Gt279rq7lxhw&dl_branch=1",
  },
  {
    name: "La Peste",
    link: "https://open.spotify.com/show/5pdG20FctfkLS1xJhZVcfV?si=oCYXrLaJSN6wB-PHNnw5pQ&dl_branch=1",
  },
  {
    name: "Localoides",
    link: "https://open.spotify.com/show/1aFijgLot8Y0duzGTKSU2N?si=KtosD9RQR_OFRSjVyDV9hg&dl_branch=1",
  },
  {
    name: "MonkeyBee Radio",
    link: "https://open.spotify.com/show/5eHU4IvBR3bc3fDzbtIB3K?si=8rYDsXc2SIWRJzHYYdtNUA&dl_branch=1",
  },
  {
    name: "Plano",
    link: "https://open.spotify.com/show/18PNvUJam8X4FEHtEu1s31?si=LaejP7cPToWOoOfMfuk5Og&dl_branch=1",
  },
  {
    name: "Satracknico",
    link: "https://open.spotify.com/show/53njkBwHzXDAAD9dzw1nwv?si=XS7TpnBRSru6cnmrsSLpGA&dl_branch=1",
  },
  {
    name: "Spanish bombs",
    link: "https://open.spotify.com/show/71GtAB6OLZzIJapIZLzvWl?si=zAdsSuT3RuqgXs8NAy3weg&dl_branch=1",
  },
  {
    name: "Supernova",
    link: "https://open.spotify.com/show/71GtAB6OLZzIJapIZLzvWl?si=zAdsSuT3RuqgXs8NAy3weg&dl_branch=1",
  },
  {
    name: "Taxi Emocional",
    link: "https://open.spotify.com/show/7DqsaqBwGf27nKaOs70mbk?si=FNOgk6oFTiqSZgeMNSUi7A&dl_branch=1",
  },
  {
    name: "The wild mambo",
    link: "https://open.spotify.com/show/71GtAB6OLZzIJapIZLzvWl?si=zAdsSuT3RuqgXs8NAy3weg&dl_branch=1",
  },
  {
    name: "Watcharlando",
    link: "https://open.spotify.com/show/44fm5FQ8Ww4g7NmjRvIyC0?si=neHk8ezkSFu9fz_a-9GpRQ&dl_branch=1",
  },
  {
    name: "Milo Bestia",
    link: "https://www.somoslabestia.com/product-page/milo-bestia",
  },
  {
    name: "La Bestia Houdini",
    link: "https://www.somoslabestia.com/product-page/la-bestia-houdini",
  },
];

const MenuPodcasts = () => {
  return list.map((item) => {
    return (
      <div className={styles.link} key={Math.random()}>
        <a href={item.link} target="_blank" rel="noreferrer">
          <img src="/img/menu/podcasts.png" />
          {item.name}
        </a>
      </div>
    );
  });
};

export default MenuPodcasts;
