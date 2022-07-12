import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from 'yup';

import { IVFormErrors, useVForm, VForm, VTextField } from "../../shared/forms";
import { BasePageLayout } from "../../shared/layouts"
import { Environment } from "../../shared/environment";
import { DetailToolBar } from "../../shared/components"
import { PessoasService, IPessoa } from "../../shared/services/api/pessoas/PessoasService";
import '../../shared/forms/YupLocaleBr';

const formValidationSchema: yup.SchemaOf<IPessoa> = yup.object().shape({
  id: yup.number().notRequired()
    .transform((currentValue, originalValue) => {
      return originalValue === '' ? null : currentValue;
    }).nullable(),
  nome: yup.string().required().min(3).label('Nome'),
  email: yup.string().email().label('E-mail'),
  cidadeId: yup.number().required().min(1).label('Cidade')
  .transform((currentValue, originalValue) => {
    return originalValue === '' ? null : currentValue;
  }).nullable()
});

export const DetalhePessoa: React.FC = () => {

  const navigate = useNavigate();
  const { id = 'nova' } = useParams<'id'>();
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, save, saveAndClose, actionAfterSave } = useVForm();
  const novaPessoa = id === 'nova';

  useEffect(() => {
    if (!novaPessoa) {
      setIsLoading(true);
      PessoasService.getById(Number(id))
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
        { id: '', nome: '', email: '', cidadeId: '' }
      );
    }
    return () => {
      setIsLoading(false);
    }
  }, [id, novaPessoa, navigate, formRef]);

  const handleCloseButtonClick = () => {
    navigate('/pessoas');
  }

  const handleDeleteButtonClick = () => {
    //eslint-disable-next-line
    if (confirm(Environment.CONF_EXCLUIR_REGISTRO)) {
      PessoasService.deleteById(Number(id))
        .then(result => {
          if (result instanceof Error)
            alert(result.message);
          else
            handleCloseButtonClick();
        });
    }
  }

  const handleNewButtonOnClick = () => {
    navigate('/pessoas/detalhe/nova');
  }

  const handleFormSubmit = (dados: IPessoa) => {

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (novaPessoa) {
          PessoasService.create(dadosValidados)
            .then(result => {
              setIsLoading(false);
              if (result instanceof Error)
                alert(result.message);
              else if (actionAfterSave() === 'close')
                navigate('/pessoas');
              else
                navigate(`/pessoas/detalhe/${result}`);
            });
        } else {
          PessoasService.updateById(dadosValidados)
            .then(result => {
              setIsLoading(false);
              if (result instanceof Error)
                alert(result.message);
              else if (actionAfterSave() === 'close')
                navigate('/pessoas');
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
      title={novaPessoa ? 'Nova pessoa' : title || 'Detalhes da pessoa'}
      toolBar={
        <DetailToolBar
          saveAndCloseButtonVisible
          newButtonText="Nova"
          deleteButtonVisible={!novaPessoa}
          saveButtonOnClick={save}
          saveAndCloseButtonOnClick={saveAndClose}
          deleteButtonOnClick={handleDeleteButtonClick}
          newButtonOnClick={handleNewButtonOnClick}
          closeButtonOnClick={handleCloseButtonClick}
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
              <Grid item xs={12} sm={9} md={10}>
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
              <Grid item xs={12} md={6}>
                <VTextField
                  fullWidth
                  name="email"
                  label="E-mail"
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <VTextField
                  fullWidth
                  name="cidadeId"
                  label="Cidade"
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