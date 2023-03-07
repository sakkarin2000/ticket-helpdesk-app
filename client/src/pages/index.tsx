import Head from "next/head";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ticket Helpdesk Management</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-prompt">
        <LandingPage />
      </div>
    </>
  );
}