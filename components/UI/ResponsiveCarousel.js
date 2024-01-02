import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "./ResponsiveCarousel.module.css";
import { Fragment } from "react";


export default function ResponsiveCarousel(props) {  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: (props.num_items === undefined) ? 3 : props.num_items
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <Fragment>
      <Carousel
          responsive={responsive}
          infinite={props.infinite}
        >
          {props.children}
        </Carousel>
    </Fragment>
  );
}
