// @flow
import { GetServerSideProps } from "next";
import * as React from "react";
type Props = {};
const ServerPage = (props: any) => {
  return <div>Server {props.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      name: "Wslmacieira",
    },
  };
};

export default ServerPage;
