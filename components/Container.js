import Head from "next/head";
import Header from "./Header";

const Container = ({ title, description, children }) => (
  <div className="container mx-auto md:py-5">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    {children}
  </div>
);

export default Container;
