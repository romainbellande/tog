import { findUsersQuery } from '../src/operations';
import { Layout } from '@client/components';

export async function getServerSideProps() {
  const { users } = await findUsersQuery();
  console.log('data :>> ', users);
  return { props: { users } };
}

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return <Layout>home</Layout>;
}

export default Index;
