import Users from "./../src/components/users";
import Header from "@/src/head";
import { useStyles } from "./../src/styles";

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Users />
      </main>
    </>
  );
}
