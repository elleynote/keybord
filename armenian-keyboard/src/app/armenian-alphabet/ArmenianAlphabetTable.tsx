import { armenianAlphabetRows } from "./alphabet-data";
import styles from "./page.module.css";

export function ArmenianAlphabetTable() {
  return (
    <div className={styles.tableScroller} role="region" aria-label="Armenian alphabet chart" tabIndex={0}>
      <table className={styles.alphabetTable}>
        <thead>
          <tr>
            <th rowSpan={2} scope="col">Forms</th>
            <th colSpan={2} scope="colgroup">Name</th>
            <th colSpan={3} scope="colgroup">Letter pronunciation</th>
            <th colSpan={2} scope="colgroup">Transliteration</th>
          </tr>
          <tr>
            <th scope="col">Classical</th>
            <th scope="col">Reformed</th>
            <th scope="col">Classical</th>
            <th scope="col">Eastern</th>
            <th scope="col">Western</th>
            <th scope="col">Classical</th>
            <th scope="col">ISO 9985</th>
          </tr>
        </thead>
        <tbody>
          {armenianAlphabetRows.map((row) => (
            <tr key={row.forms}>
              <th className={styles.formsCell} scope="row">{row.forms}</th>
              <td>{row.nameClassical}</td>
              <td>{row.nameReformed}</td>
              <td>{row.letterClassical}</td>
              <td>{row.letterEastern}</td>
              <td>{row.letterWestern}</td>
              <td>{row.transliterationClassical}</td>
              <td>{row.transliterationIso9985}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
