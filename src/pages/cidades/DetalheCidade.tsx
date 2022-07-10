import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { VTextField } from "../../shared/forms";
import { useEffect, useRef, useState } from "react";
import { BasePageLayout } from "../../shared/layouts"
import { Environment } from "../../shared/environment";
import { DetailToolBar } from "../../shared/components"
import { CidadesService, ICidade } from "../../shared/services/api/cidades/CidadesService";

export const DetalheCidade: React.FC = () => {

  const navigate = useNavigate();
  const {id = 'nova'} = useParams<'id'>();
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const novaCidade = id === 'nova';

  useEffect(() => {
    if (!novaCidade) {
      setIsLoading(true);
      CidadesService.getById(Number(id))
      .then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate(-1);
        } else {
          setTitle(result.nome);
          formRef.current?.setData(result);
        }
      });
    }
    return () => {
      setIsLoading(false);
    }
  }, [id, novaCidade]);
    
  const handleBackButtonClick = () => {
    navigate('/cidades');
  }
  
  const handleSaveButtonClick = () => {
    formRef.current?.submitForm();
  }
  
  const handleSaveAndBackButtonClick = () => {
    formRef.current?.submitForm();
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
  
  const handleFormSubmit = (data: ICidade) => {
    setIsLoading(true);
    if (novaCidade) {
      CidadesService.create(data)
        .then(result => {
          setIsLoading(false);
          if (result instanceof Error)
            alert(result.message);
          else
            navigate(`/cidades/detalhe/${result}`);
        });
    } else {
      CidadesService.updateById(data)
        .then(result => {
          setIsLoading(false);
          if (result instanceof Error)
            alert(result.message);
        });
    };
  }
  
  return (
    <BasePageLayout 
      title={novaCidade ? 'Nova cidade' : title || 'Detalhes da cidade'}
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
          saveButtonLoading={isLoading}
          saveAndBackButtonLoading={isLoading}
          deleteButtonLoading={isLoading}
        />
      }>

      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={4} sm={3} md={2}>
                <VTextField 
                  name="id"
                  label="ID" 
                  disabled
                />
              </Grid>
              <Grid item xs={8} sm={9} md={10}>
                <VTextField 
                  fullWidth
                  name="nome"
                  label="Nome" 
                  disabled={isLoading}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={4} sm={3} md={2}>
                <VTextField 
                  name="ddd"
                  label="DDD" 
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={8} sm={5} md={3}>
                <VTextField 
                  name="codigoIBGE"
                  label="Código IBGE" 
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            {isLoading &&
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            }

          </Grid>
        </Box>
      </Form>
    </BasePageLayout>
  );
};