import blobshape from "blobshape";
import { useSpring, animated, config } from "react-spring";
import { useState } from "react";

function getRandomPath() {
    return blobshape({
      growth: 8,
      edges: 18
    }).path;
  }
  
  export function Blob(props : BlobProps) {
    const [flip, set] = useState(false);
  
    const { path } = useSpring({
      to: { path: getRandomPath() },
      from: { path: getRandomPath() },
      reverse: flip,
      config: {
        duration: props.image ? 9000 : 6000
      },
      onRest: (x) => {
        x.value.path = getRandomPath();
        // !props.image &&
        set(!flip);
      }
    });
  
    return (
      <svg viewBox="0 0 500 500" width="100%" style={props.style} className={`${props.className}`}>
        {!props.image && <animated.path fill={props.color} d={path} />}
  
        {props.image && (
          <>
            <defs>
              <clipPath id="a">
                <animated.path fill={props.color} d={path} />
              </clipPath>
            </defs>
            <image
              width="80%"
              height="80%"
              clip-path="url(#a)"
              xlinkHref="https://images.unsplash.com/photo-1661868149328-5d22b6b9bdd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=933&q=80"
              preserveAspectRatio="xMidYMid slice"
            />
          </>
        )}
      </svg>
    );
  }
  
type BlobProps = {
    color?: string,
    image?: any,
    style?: any,
    className?: string,
}
