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
import { PessoasService, TPessoas, IPessoa } from "../../shared/services/api/pessoas/PessoasService";
import { Environment } from "../../shared/environment";

export const ListagemPessoas: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<TPessoas>([]);
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
      PessoasService.getAll(pagina, busca)
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
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error)
            alert(result.message);
          else
            setRows(oldRows => oldRows.filter((oldRow: IPessoa) => oldRow.id !== id));
        })
    }
  }

  return (
    <BasePageLayout
      title="Pessoas"
      toolBar={
        <ListToolBar
          searchVisible
          searchText={busca}
          newButtonText="Nova"
          newButtonOnClick={() => navigate('/pessoas/detalhe/nova')}
          searchOnChange={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>

          <TableHead>
            <TableRow>
              {mdUp && <TableCell size="small">ID</TableCell>}
              <TableCell size="small">Nome</TableCell>
              {smUp && <TableCell size="small">E-mail</TableCell>}
              {mdUp && <TableCell size="small">Cidade</TableCell>}
              <TableCell size="small">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {mdUp && <TableCell size="small">{row.id}</TableCell>}
                <TableCell size="small">{row.nome}</TableCell>
                {smUp && <TableCell size="small">{row.email}</TableCell>}
                {mdUp && <TableCell size="small">{row.cidadeId}</TableCell>}
                <TableCell size="small">
                  <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${Number(row.id)}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(Number(row.id))}>
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
            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
            onChange={(e, p) => setSearchParams({ busca, pagina: p.toString() }, { replace: true })}
          />
        )}

        {isLoading && <LinearProgress variant="indeterminate" />}

      </TableContainer>
    </BasePageLayout>
  );
};