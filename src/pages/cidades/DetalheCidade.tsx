import { useNavigate, useParams } from "react-router-dom"
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";

import { BasePageLayout } from "../../shared/layouts"
import { DetailToolBar } from "../../shared/components"
import { CidadesService, ICidade } from "../../shared/services/api/cidades/CidadesService";
import { Environment } from "../../shared/environment";
import { useEffect, useRef, useState } from "react";
import { VTextField } from "../../shared/forms";
//import { LinearProgress } from "@mui/material";

interface IFormData {
  nome: string;
}

export const DetalheCidade: React.FC = () => {

  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [cidade, setCidade] = useState<ICidade>();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const novaCidade = id === 'nova';
  const title = novaCidade ? 'Nova cidade' : cidade?.nome;

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
  
  
  const handleBackButtonClick = () => {
    navigate('/cidades');
  }
  
  const handleSaveButtonClick = () => {
    formRef.current?.submitForm();
  }
  
  const handleSaveAndBackButtonClick = () => {
    formRef.current?.submitForm();
    handleBackButtonClick();
  }

  const handleDeleteButtonClick = () => {
    //eslint-disable-next-line
    if (confirm(Environment.CONF_EXCLUIR_REGISTRO)) {
      CidadesService.deleteById(Number(id))
      .then(result => {
        if (result instanceof Error)
          alert(result.message);
        else
          handleBackButtonClick();
      }); 
    }
  }
  
  const handleNewButtonOnClick = () => {
    navigate('/cidades/detalhe/nova');
  }
  
  const handleFormSubmit = (data: IFormData) => {
    console.log(data);
  }


  // { isLoading && // <LinearProgress variant="indeterminate"/> }

  // { !isLoading &&<pre>{JSON.stringify(cidade, null, 2)}</pre> }
  
  return (
    <BasePageLayout 
      title={title}
      toolBar={
        <DetailToolBar
          saveAndBackButtonVisible
          newButtonText="Nova"
          deleteButtonVisible={!novaCidade}
          saveButtonOnClick={handleSaveButtonClick}
          saveAndBackButtonOnClick={handleSaveAndBackButtonClick}
          deleteButtonOnClick={handleDeleteButtonClick}
          newButtonOnClick={handleNewButtonOnClick}
          backButtonOnClick={handleBackButtonClick}
        />
      }>

        <Form ref={formRef} onSubmit={(dados) => console.log(dados)}>
          <VTextField name="nome"/>
        </Form>

    </BasePageLayout>
  );

};