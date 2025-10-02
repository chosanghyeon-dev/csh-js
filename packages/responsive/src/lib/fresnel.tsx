import { createMedia, MediaProps } from "@artsy/fresnel/dist/Media";
import { isEmptyObject } from "../utils/object";

export const createFresnelMedia = <T extends string>(
  breakpoints: Record<T, number>
) => {
  const AppMedia = createMedia({
    breakpoints,
  });

  const { MediaContextProvider, Media } = AppMedia;
  const rootMediaStyle = AppMedia.createMediaStyle();

  const breakPointKeyArray = Object.keys(breakpoints) as T[];

  const Responsive = (
    props: Partial<Record<T, React.ReactNode>> & {
      className?: string;
    }
  ) => {
    type MediaPropsManager = (
      current: T
    ) => Omit<MediaProps<T, undefined>, "children">;

    const createMediaProps: MediaPropsManager = (current) => {
      let returnValue: ReturnType<MediaPropsManager> = {};

      breakPointKeyArray.forEach((breakPointKey, idx, originArray) => {
        const isFoundCurrentBreakPointKey = current === breakPointKey;

        if (isFoundCurrentBreakPointKey) {
          const lagerCurrentBreakPointKeyArray = originArray.slice(idx + 1);

          const isEmptyLagerCurrentBreakPointKeyArray =
            lagerCurrentBreakPointKeyArray.length === 0;

          if (isEmptyLagerCurrentBreakPointKeyArray) {
            returnValue = { greaterThanOrEqual: current };
          } else {
            lagerCurrentBreakPointKeyArray.forEach(
              (lagerCurrentBreakPointKey, idx, originArray) => {
                const isExistReturnValue = !isEmptyObject(returnValue);
                const isEarlyReturn = isExistReturnValue;

                if (isEarlyReturn) {
                  return;
                }

                const isExistLagerCurrentBreakPoint =
                  !!props[lagerCurrentBreakPointKey];

                if (isExistLagerCurrentBreakPoint) {
                  returnValue = {
                    between: [current, lagerCurrentBreakPointKey],
                  };
                  return;
                }

                const isLast = idx === originArray.length - 1;

                if (isLast) {
                  returnValue = { greaterThanOrEqual: current };
                  return;
                }
              }
            );
          }
        }
      });

      return returnValue;
    };

    return (
      <>
        {breakPointKeyArray.map((breakPointKey) => {
          const variable = props[breakPointKey];

          const isExistVariable = !!variable;

          if (isExistVariable) {
            return (
              <Media
                {...createMediaProps(breakPointKey)}
                key={breakPointKey}
                className={props.className}
              >
                {variable}
              </Media>
            );
          }

          return null;
        })}
      </>
    );
  };

  return {
    MediaContextProvider,
    Responsive,
    rootMediaStyle,
  };
};

// const {MediaContextProvider, Responsive, rootMediaStyle} = createFresnelMedia({
//   xs: 0,
//   s: 600,
//   m: 1024,
//   l: 1366,
//   xl: 1536,
//   xxl: 1920,
//   xxxl: 2560,
// });
