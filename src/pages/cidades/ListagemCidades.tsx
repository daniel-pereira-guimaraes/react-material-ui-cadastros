import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { ListToolBar } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { BasePageLayout } from "../../shared/layouts";
import { CidadesService, ICidades } from "../../shared/services/api/cidades/CidadesService";
import { Environment } from "../../shared/environment";
import { padding } from "@mui/system";


export const ListagemCidades: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<ICidades>([]);
  const navigate = useNavigate();
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
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    //eslint-disable-next-line
    if (confirm(Environment.CONF_EXCLUIR_REGISTRO)) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error)
            alert(result.message);
          else
            setRows(oldRows => oldRows.filter(oldRow => oldRow.id !== id));
        })
    }
  }

  console.log('Renderizando ListagemCidades');
  return (
    <BasePageLayout 
      title="Cidades"
      toolBar={
        <ListToolBar 
          searchVisible
          searchText={busca}
          newButtonText="Nova" 
          newButtonOnClick={() => navigate('/cidades/detalhe/nova')}
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
                <TableCell size="small">Código</TableCell>
                <TableCell size="small">Nome</TableCell>
                <TableCell size="small">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell size="small">{row.id}</TableCell>
                  <TableCell size="small">{row.nome}</TableCell>
                  <TableCell size="small">
                    <IconButton size="small" onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={()=> handleDelete(row.id)}>
                      <Icon>delete</Icon>
                    </IconButton>
                  </TableCell>
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