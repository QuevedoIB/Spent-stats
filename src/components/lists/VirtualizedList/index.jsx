/* Contenedor superior tiene tamaño dinámico
    Ul contendor de la lista tiene height fijo equivalente al total de items de la lista * height de cada item
    Li contenedor de cada item tiene height fijo
    En los boundaries de la lista restar un par de items en el mínimo y añadir un par en el final

    Añadir item al final con intersection observer
    Cuando el item del final se muestra lanzar un callback onEndReached
*/

import React, { useRef, useEffect, useState } from "react";
import useObserver from "src/hooks/useObserver";

const VirtualizedList = ({
  onEndReached = () => null,
  list = [],
  totalLength,
  itemHeight = 0,
  Row,
  keyExtractor,
}) => {
  const observerItem = useRef();
  const listRef = useRef();
  const [listHeight, setListHeight] = useState(totalLength * itemHeight);

  useObserver({
    ref: observerItem,
    keepObserving: true,
    intersectingCallback: onEndReached,
    options: { rootMargin: "20px" }, //empty li as observed item or use one of last items displayed?
  });

  useEffect(() => {
    if (!itemHeight) {
      setListHeight((listRef.current.clientHeight / list.length) * totalLength);
    }
  }, [itemHeight, list.length, totalLength]);

  console.log({ listHeight });

  return (
    <div style={{ height: listHeight }}>
      <ul ref={listRef}>
        {list.map((item, i) => (
          <Row key={item?.[keyExtractor] ?? i} item={item} />
        ))}
      </ul>
      <div ref={observerItem} id="list-observer" />
    </div>
  );
};

export default VirtualizedList;
