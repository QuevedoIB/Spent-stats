import { Listbox } from "@headlessui/react";

import { CATEGORIES_PICTURES } from "src/constants";

const SelectCategoryIcon = ({ handleChange, selected }) => {
  const SelectedIcon = CATEGORIES_PICTURES.find(
    (icon) => icon.id === selected
  )?.icon;
  const onIconSelect = (id) => handleChange("picture", id);
  return (
    <Listbox value={selected} onChange={onIconSelect}>
      <Listbox.Label>Picture:</Listbox.Label>
      <Listbox.Button>
        {SelectedIcon && <SelectedIcon size={40} />}
      </Listbox.Button>
      <Listbox.Options>
        {CATEGORIES_PICTURES.map(({ id, icon: IconComponent }) => (
          <Listbox.Option key={id} value={id}>
            <IconComponent size={40} />
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default SelectCategoryIcon;
