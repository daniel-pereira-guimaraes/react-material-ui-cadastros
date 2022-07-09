import { useNavigate, useParams } from "react-router-dom"

import { BasePageLayout } from "../../shared/layouts"
import { DetailToolBar } from "../../shared/components"
import { CidadesService, ICidade } from "../../shared/services/api/cidades/CidadesService";
import { Environment } from "../../shared/environment";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

export const DetalheCidade: React.FC = () => {

  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [cidade, setCidade] = useState<ICidade>();
  const [isLoading, setIsLoading] = useState(false);
  const title = id === 'nova' ? 'Nova cidade' : cidade?.nome;

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      CidadesService.getById(Number(id))
      .then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate(-1);
        } else {
          console.log(result);
          setCidade(result);
        }
      });
    }
  }, [id]);

  const handleSave = (goToBack: boolean = false) => {
    alert('Salvando...' + goToBack);
    goToBack && navigate(-1);
  }

  const handleDelete = () => {
    //eslint-disable-next-line
    if (confirm(Environment.CONF_EXCLUIR_REGISTRO)) {
      CidadesService.deleteById(Number(id))
      .then(result => {
        if (result instanceof Error)
          alert(result.message);
        else
          navigate(-1);
      }); 
    }
  }
  
  return (
    <BasePageLayout 
      title={title}
      toolBar={
        <DetailToolBar
          saveAndBackButtonVisible
          newButtonText="Nova"
          deleteButtonVisible={id !== 'nova'}
          saveButtonOnClick={() => handleSave(false)}
          saveAndBackButtonOnClick={() => handleSave(true)}
          deleteButtonOnClick={handleDelete}
          newButtonOnClick={() => navigate('/cidades/detalhe/nova')}
          backButtonOnClick={() => navigate('/cidades')}
        />
      }>
        {isLoading && 
          <LinearProgress variant="indeterminate"/>
        }
        
        {!isLoading &&<pre>{JSON.stringify(cidade, null, 2)}</pre>}
    </BasePageLayout>
  )

}