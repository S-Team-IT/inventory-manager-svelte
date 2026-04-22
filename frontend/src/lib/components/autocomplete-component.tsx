import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface OptionWithInput {
  inputValue?: string;
  id: string;
  name: string;
}

interface Props<T> {
  label: string;
  optionsArray: T[];
  databaseInsert: (newValue: string) => Promise<T | null>;
  returnIDAsValue: (id: string) => void;
}

const filter = createFilterOptions<OptionWithInput>();

export default function AutocompleteComponent<
  T extends { id: string; name: string },
>({ label, optionsArray, databaseInsert, returnIDAsValue }: Props<T>) {
  const [options, setOptions] = useState<OptionWithInput[]>(optionsArray);
  const [value, setValue] = useState<OptionWithInput | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOptions(optionsArray);
  }, [optionsArray]);

  useEffect(() => {
    if (value) returnIDAsValue(value.id);
  }, [value]);

  async function handleNewOption(inputString: string) {
    setLoading(true);
    try {
      const newOption = await databaseInsert(inputString);
      if (newOption) {
        setOptions((prev) => [...prev, newOption]);
        setValue(newOption);
      } else {
        console.error("new option is falsy");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Autocomplete
      id="free-solo-demo3"
      freeSolo
      loading={loading}
      options={options}
      value={value}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        if (option.inputValue) return option.inputValue;
        return option.name;
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        // Suggest creating a new option if no exact match exists
        const isExisting = options.some(
          (option) => inputValue.toLowerCase() === option.name.toLowerCase(),
        );

        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            id: "",
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      onChange={async (_e, newValue) => {
        if (typeof newValue === "string") {
          // User pressed Enter on a free-text value
          await handleNewOption(newValue);
        } else if (newValue?.inputValue) {
          // User clicked the "Add X" option
          await handleNewOption(newValue.inputValue);
        } else {
          // User selected an existing option
          setValue(newValue);
        }
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id || option.inputValue}>
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
