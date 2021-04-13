import CustomDataTable from "./components/DataTable";
import tableData from "./dummy/tabledata";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h3>Custom Datatable</h3>
      <CustomDataTable tableData={tableData} />
    </div>
  );
}
