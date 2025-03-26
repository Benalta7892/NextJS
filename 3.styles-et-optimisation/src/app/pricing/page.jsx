import styles from "./pricing.module.css";

function page() {
  console.log(styles);

  return (
    <div>
      <h1 className={styles.title}>Pricing</h1>
    </div>
  );
}
export default page;
