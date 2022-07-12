import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Icon, IconButton, LinearProgress, Pagination, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, 
  useMediaQuery, useTheme 
 } from '@mui/material';

 import { ListToolBar } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { BasePageLayout } from "../../shared/layouts";
import { CidadesService, TCidades } from "../../shared/services/api/cidades/CidadesService";
import { Environment } from "../../shared/environment";

export const ListagemCidades: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<TCidades>([]);
  const navigate = useNavigate();
  const debounce = useDebounce();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  
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
                {mdUp && <TableCell size="small" width={50}>ID</TableCell>}
                <TableCell size="small">Nome</TableCell>
                {smUp && <TableCell size="small" width={40}>DDD</TableCell>}
                {mdUp && <TableCell size="small">Código IBGE</TableCell>}
                <TableCell size="small" width={70}>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  {mdUp && <TableCell size="small">{row.id}</TableCell>}
                  <TableCell size="small">{row.nome}</TableCell>
                  {smUp && <TableCell size="small">{row.ddd}</TableCell>}
                  {mdUp && <TableCell size="small">{row.codigoIBGE}</TableCell>}
                  <TableCell size="small">
                    <IconButton size="small" onClick={() => navigate(`/cidades/detalhe/${Number(row.id)}`)}>
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={()=> handleDelete(Number(row.id))}>
                      <Icon>delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && !isLoading &&
              (<caption>{Environment.NENHUM_REGISTRO}</caption>)
            }
          </Table>

          {totalCount > Environment.LIMITE_DE_LINHAS && (
            <Pagination 
              page={pagina}
              count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS) } 
              onChange={(e,p) => setSearchParams({busca, pagina: p.toString()}, {replace: true})}
            />
          )}

          {isLoading && <LinearProgress variant="indeterminate" />}

        </TableContainer>
    </BasePageLayout>
  );
};