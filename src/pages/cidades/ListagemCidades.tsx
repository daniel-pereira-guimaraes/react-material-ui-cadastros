import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
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

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || 1);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(pagina, busca)
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
  }, [busca, pagina, debounce]);

  console.log('Renderizando ListagemCidades');
  return (
    <BasePageLayout 
      title="Cidades"
      toolBar={
        <ListToolBar 
          searchVisible
          newButtonText="Nova" 
          searchText={busca}
          searchOnChange={texto => setSearchParams({busca: texto, pagina: '1'}, {replace: true})}
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

            <TableFooter>
              {totalCount > Environment.LIMITE_DE_LINHAS && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Pagination 
                      page={pagina}
                      count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS) } 
                      onChange={(e,p) => setSearchParams({busca, pagina: p.toString()}, {replace: true})}
                    />
                  </TableCell>
                </TableRow>
              )}

              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}


            </TableFooter>

          </Table>
        </TableContainer>
    </BasePageLayout>
  );
};