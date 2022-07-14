import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";

type TAutoCompleteOption = {
  id: number;
  label: string;
}

type TAutoCompleteOptions = TAutoCompleteOption[];

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false
}) => {

  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
  const debounce = useDebounce();
  const [options, setOptions] = useState<TAutoCompleteOptions>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, value) => setSelectedId(value)
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(1, busca)
        .then(result => {
          console.log('CidadesService.getAll: ', busca);
          setIsLoading(false);
          if (!(result instanceof Error)) {
            setOptions(result.data.map(cidade => {
              return {id: Number(cidade.id), label: cidade.nome};
            }));
          }
        })
    });
  }, [debounce, busca]);

  const selectedOption = useMemo(() => {
    let option;
    if (selectedId)
      option = options.find(option => option.id === selectedId);
    return option ? option : null;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Nenhuma opção"
      loadingText="Carregando..."
      disablePortal
      disabled={isExternalLoading}
      loading={isLoading}
      popupIcon={isLoading && <CircularProgress size={20} />}
      options={options}
      value={selectedOption}
      defaultValue={defaultValue}
      onInputChange={(_, value) => setBusca(value)}
      onChange={(_, option) => {
        setSelectedId(option?.id);
        setBusca('');
        clearError();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          size="small"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );

};