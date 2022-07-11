import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from 'yup';

import { IVFormErrors, useVForm, VForm, VTextField } from "../../shared/forms";
import { BasePageLayout } from "../../shared/layouts"
import { Environment } from "../../shared/environment";
import { DetailToolBar } from "../../shared/components"
import { CidadesService, ICidade } from "../../shared/services/api/cidades/CidadesService";

const formValidationSchema: yup.SchemaOf<ICidade> = yup.object().shape({
  id: yup.number().notRequired(),
  nome: yup.string().required().min(3).label('Nome'),
  ddd: yup.string().required().length(2).label('DDD'),
  codigoIBGE: yup.string().required().length(7).label('Código IBGE')
});

export const DetalheCidade: React.FC = () => {

  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, save, saveAndBack, actionAfterSave } = useVForm();
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
    } else {
      formRef.current?.setData(
        { id: '', nome: '', ddd: '', codigoIBGE: '' }
      );
    }
    return () => {
      setIsLoading(false);
    }
  }, [id, novaCidade, navigate, formRef]);

  const handleBackButtonClick = () => {
    navigate('/cidades');
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

  const handleFormSubmit = (dados: ICidade) => {

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (novaCidade) {
          CidadesService.create(dadosValidados)
            .then(result => {
              setIsLoading(false);
              if (result instanceof Error)
                alert(result.message);
              else if (actionAfterSave() === 'close')
                navigate('/cidades');
              else
                navigate(`/cidades/detalhe/${result}`);
            });
        } else {
          CidadesService.updateById(dadosValidados)
            .then(result => {
              setIsLoading(false);
              if (result instanceof Error)
                alert(result.message);
              else if (actionAfterSave() === 'close')
                navigate('/cidades');
            });
        };
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach(error => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  }

  return (
    <BasePageLayout
      title={novaCidade ? 'Nova cidade' : title || 'Detalhes da cidade'}
      toolBar={
        <DetailToolBar
          saveAndCloseButtonVisible
          newButtonText="Nova"
          deleteButtonVisible={!novaCidade}
          saveButtonOnClick={save}
          saveAndCloseButtonOnClick={saveAndBack}
          deleteButtonOnClick={handleDeleteButtonClick}
          newButtonOnClick={handleNewButtonOnClick}
          closeButtonOnClick={handleBackButtonClick}
          saveButtonLoading={isLoading}
          saveAndCloseButtonLoading={isLoading}
          deleteButtonLoading={isLoading}
        />
      }>

      <VForm ref={formRef} onSubmit={handleFormSubmit}>
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
      </VForm>
    </BasePageLayout>
  );
};