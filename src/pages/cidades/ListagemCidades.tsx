import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListToolBar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";

export const ListagemCidades: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  
  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    CidadesService.getAll(1, busca)
      .then(result => {
        if (result instanceof Error)
          alert(result.message);
        else
          console.log(result);
      });
  }, [busca]);

  return (
    <BasePageLayout 
      title="Cidades"
      toolBar={
        <ListToolBar 
          searchVisible
          newButtonText="Nova" 
          searchText={busca}
          searchOnChange={texto => setSearchParams({busca: texto}, {replace: true})}
        />
      }>
    </BasePageLayout>
  );
};