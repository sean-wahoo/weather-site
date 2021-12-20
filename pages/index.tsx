import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/index.module.scss";

const Home: NextPage = (props) => {
  console.log(props);
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <section className={styles.welcome_section}>
          <h1>Hello.</h1>
          <h3>Welcome to a neat little weather tool.</h3>
          <h3>Scroll down to see the weather for more places.</h3>
        </section>
      </header>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: query,
  };
};

export default Home;
