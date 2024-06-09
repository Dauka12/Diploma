import { Autocomplete, Chip, TextField } from '@mui/joy';
import * as React from 'react';

interface Tag {
  id: number;
  tagName: string;
}

interface Category {
  id: number;
  name: string;
}

interface SelectMultipleProps {
  items: Tag[] | Category[];
  setSelectedItems: (items: number[]) => void;
  placeholder: string;
  selectedItems: number[];
}

function SelectMultiple({ items, setSelectedItems, placeholder, selectedItems }: SelectMultipleProps) {
  const selectedObjects = items.filter(item => selectedItems.includes(item.id));

  return (
    <Autocomplete
      multiple
      options={items}
      getOptionLabel={(option: Tag | Category) => 'tagName' in option ? option.tagName : option.name}
      value={selectedObjects}
      filterSelectedOptions
      onChange={(event, newValue) => {
        setSelectedItems(newValue.map((item: Tag | Category) => item.id));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="soft"
            color="primary"
            label={'tagName' in option ? option.tagName : option.name}
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
}

export default SelectMultiple;
