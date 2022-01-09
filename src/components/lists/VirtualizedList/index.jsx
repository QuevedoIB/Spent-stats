/* Contenedor superior tiene tamaño dinámico
    Ul contendor de la lista tiene height fijo equivalente al total de items de la lista * height de cada item
    Li contenedor de cada item tiene height fijo
    En los boundaries de la lista restar un par de items en el mínimo y añadir un par en el final

    Añadir item al final con intersection observer
    Cuando el item del final se muestra lanzar un callback onEndReached
*/

import { useRef } from "react";
import { useObserver } from "src/hooks/useObserver";

const VirtualizedList = ({
  onEndReached = () => null,
  list = [],
  totalLength,
  itemHeight = 0,
}) => {
  const observerItem = useRef();

  useObserver({
    ref: observerItem,
    keepObserving: true,
    intersectingCallback: onEndReached,
    options: { rootMargin: "20px" }, //empty li as observed item or use one of last items displayed?
  });

  return (
    <div>
      <ul style={{ height: (totalLength ?? list?.length) * itemHeight }}>
        <li ref={observerItem} id="list-observer" />
      </ul>
    </div>
  );
};

export default VirtualizedList;
