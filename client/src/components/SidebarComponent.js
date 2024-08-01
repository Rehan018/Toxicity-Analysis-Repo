// components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
        setFilteredHistory(res.data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    setFilteredHistory(
      history.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, history]);

  return (
    <div className="sidebar">
      <h3>Search History</h3>
      <input
        type="text"
        placeholder="Search history..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item, index) => (
            <li key={index}>
              <Link to={`/history/${item._id}`}>{item.text}</Link>
            </li>
          ))
        ) : (
          <li>No history found.</li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function SidebarComponent({ setSelectedPrediction }) {
//   const [history, setHistory] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredHistory, setFilteredHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axios.get('http://localhost:5000/api/history', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHistory(res.data);
//         setFilteredHistory(res.data); 
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchHistory();
//   }, []);

//   useEffect(() => {
//     setFilteredHistory(
//       history.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   }, [searchTerm, history]);

//   const handleTextClick = async (id) => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await axios.get(`http://localhost:5000/api/history/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSelectedPrediction(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="sidebar">
//       <h3>Search History</h3>
//       <input
//         type="text"
//         placeholder="Search history..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul>
//         {filteredHistory.length > 0 ? (
//           filteredHistory.map((item, index) => (
//             <li key={index} onClick={() => handleTextClick(item._id)}>
//               {item.text}
//             </li>
//           ))
//         ) : (
//           <li>No history found.</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default SidebarComponent;
