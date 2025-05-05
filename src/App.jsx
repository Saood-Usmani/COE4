import { useState } from 'react'
import './App.css'

function App() {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await fetch('filler/filler', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const csvData = await response.text();
        // Handle the response CSV data as needed
        console.log(csvData);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>CSV Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload CSV</button>
      </form>
    </div>
  );
}

export default App
