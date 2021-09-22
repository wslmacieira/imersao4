// @flow
import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SortingState,
} from "@devexpress/dx-react-grid";
import { Container, Typography } from "@material-ui/core";
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import * as React from "react";
import { GetServerSideProps, NextPage } from "next";
import { http } from "../utils/http";
import { Token, validateAuth } from "../utils/auth";
import { Transaction } from "../utils/models";

interface TransactionsPageProps {
  transactions: Transaction[];
}

const columns: Column[] = [
  {
    name: "payment_date",
    title: "Data pag.",
  },
  {
    name: "name",
    title: "Nome",
  },
  {
    name: "category",
    title: "Categoria",
  },
  {
    name: "type",
    title: "Operação",
  },
  {
    name: "created_at",
    title: "Criado em",
  },
];
const TransactionsPage: NextPage<TransactionsPageProps> = (props) => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas Transações
      </Typography>
      <Grid rows={props.transactions ?? []} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: "created_at", direction: "desc" }]}
        />
        <SearchState defaultValue="Conta de luz" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Container>
  );
};

export default TransactionsPage;

const getServerSideprops: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const token = (auth as Token).token;

  const { data: transactions } = await http.get("transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      transactions,
    },
  };
};
