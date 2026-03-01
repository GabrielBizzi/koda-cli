import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function withSSRAuth(fn: GetServerSideProps): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    // do nothing
    return fn(ctx);
  };
}
