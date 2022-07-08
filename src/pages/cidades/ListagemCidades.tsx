import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { ListToolBar } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { BasePageLayout } from "../../shared/layouts";
import { CidadesService, ICidades } from "../../shared/services/api/cidades/CidadesService";
import { Environment } from "../../shared/environment";


export const ListagemCidades: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<ICidades>([]);
  const debounce = useDebounce();
  
  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(1, busca)
        .then(result => {
          setIsLoading(false);
          if (result instanceof Error)
            alert(result.message);
          else {
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  }, [busca, debounce]);

  console.log('Renderizando ListagemCidades');
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

        <TableContainer 
          component={Paper} 
          variant="outlined" 
          sx={{ m:1, width: "auto" }}
        >
          <Table>
            
            <TableHead>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>Ações</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && !isLoading &&
              (<caption>{Environment.NENHUM_REGISTRO}</caption>)
            }

            {isLoading && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}

          </Table>
        </TableContainer>
    </BasePageLayout>
  );
};