/* Contenedor superior tiene tamaño dinámico
    Ul contendor de la lista tiene height fijo equivalente al total de items de la lista * height de cada item
    Li contenedor de cada item tiene height fijo
    En los boundaries de la lista restar un par de items en el mínimo y añadir un par en el final

    Añadir item al final con intersection observer
    Cuando el item del final se muestra lanzar un callback onEndReached
*/

import React, { useRef, useEffect, useState } from "react";
import useObserver from "src/hooks/useObserver";

// import styles from "../VirtualizedList.module.css";

import styles from "./VirtualizedList.module.css";

const VirtualizedList = ({
  onEndReached = () => null,
  list = [],
  totalLength,
  itemHeight = 0,
  Row,
  keyExtractor,
  keepObserving = true,
}) => {
  const observerItem = useRef();
  const listRef = useRef();

  const isIntersecting = useObserver({
    ref: observerItem,
    keepObserving,
    intersectingCallback: onEndReached,
    options: { rootMargin: "20px" },
  });

  console.log({ isIntersecting });

  useEffect(() => {
    if (!itemHeight) {
      setListHeight((listRef.current.clientHeight / list.length) * totalLength);
    }
  }, [itemHeight, list.length, totalLength]);

  console.log(list.length, itemHeight, list.length + 1 * itemHeight);

  return (
    <div
      className={styles.listContainer}
      style={{ overflowY: "scroll", height: `${itemHeight * 10}px` }}
    >
      <ul
        ref={listRef}
        style={{
          height: `${itemHeight * totalLength}px`,
          position: "relative",
        }}
      >
        {list.map((item, i) => (
          <li
            key={item?.[keyExtractor] ?? i}
            style={{
              position: "absolute",
              top: `${i * itemHeight}px`,
              width: "100%",
              height: `${itemHeight}px`,
            }}
          >
            <Row item={item} />
          </li>
        ))}
        <li
          ref={observerItem}
          id="list-observer"
          style={{
            position: "absolute",
            top: `${list.length * itemHeight}px`,
          }}
        />
      </ul>
    </div>
  );
};

export default VirtualizedList;
