import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function withSSRGuest(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    // do nothing
    return fn(ctx);
  };
}
