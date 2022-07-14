import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback } from 'react';
import { ListToolBar } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { CountCard } from './components/CountCard';

export const Dashboard = () => {

  const getCountPessoas = useCallback(async () => {
    const result = await PessoasService.getAll(1);
    return result instanceof Error ? 0 : result.totalCount;
  }, []);

  const getCountCidades = useCallback(async () => {
    const result = await CidadesService.getAll(1);
    return result instanceof Error ? 'Erro' : result.totalCount;
  }, []);

  return (
    <BasePageLayout 
      title='Página inicial'
      toolBar={<ListToolBar newButtonVisible={false} />} 
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <CountCard title="Quantidade de pessoas" getCount={getCountPessoas} />
            <CountCard title="Quantidade de cidades" getCount={getCountCidades} />
            </Grid>
        </Grid>
      </Box>
    </BasePageLayout>
  );
};