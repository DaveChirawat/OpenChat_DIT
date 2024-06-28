import { useEffect, useState } from "react";
import BackOffice from "./BackOffice";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../config";

function OpenChat() {
  const [user, setUser] = useState({});
  const [openchat, setOpenChat] = useState({});
  const [openchats, setOpenChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResigned, setSelectedResigned] = useState('');
  const [selectedOpenChatStatus, setSelectedOpenChatStatus] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDataAdmin();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedResigned, selectedOpenChatStatus, openchats]);

  const handleStatus = async (item) => {
    try {
      let res;
      if (item.openchat.empcode === null) {
        const button = await Swal.fire({
          title: 'Add',
          text: 'Add item',
          icon: 'question',
          showCancelButton: true,
          showConfirmButton: true
        });
        if (button.isConfirmed) {
          openchat.modified_by = user.name;
         openchat.empcode = item.empcode;
         console.log(openchat);
          res = await axios.post(config.apiPath + '/openchat/create', openchat, config.headers());
          if (res.data.message === 'success') {
            Swal.fire({
              title: 'Add',
              text: 'Add success',
              icon: 'success',
              timer: 1000
            });
            fetchData();
          }
        }
      } else {
        const button = await Swal.fire({
          title: 'Remove',
          text: 'Remove item',
          icon: 'question',
          showCancelButton: true,
          showConfirmButton: true
        });
        if (button.isConfirmed) {
          openchat.modified_by = user.name;
          res = await axios.delete(config.apiPath + '/openchat/remove/' + item.empcode,openchat, config.headers());
          if (res.data.message === 'success') {
            Swal.fire({
              title: 'Remove',
              text: 'Remove success',
              icon: 'success',
              timer: 1000
            });
            fetchData();
          }
        }
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error'
      });
    }
  }

  const fetchDataAdmin = async () => {
    try {
      const res = await axios.get(config.apiPath + '/user/info', config.headers());
      if (res.data.result !== undefined) {
        setUser(res.data.result);
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error'
      });
    }
  }

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + '/openchat/list1', config.headers());
      if (res.data.results !== undefined) {
        setOpenChats(res.data.results);
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: e.message,
        icon: 'error'
      });
    }
  }

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = openchats.filter(chat => {
      const matchesSearchTerm =
        chat.empcode.toLowerCase().includes(lowercasedFilter) ||
        chat.name_th.toLowerCase().includes(lowercasedFilter) ||
        chat.name_en.toLowerCase().includes(lowercasedFilter) ||
        chat.div.toLowerCase().includes(lowercasedFilter) ||
        chat.dept.toLowerCase().includes(lowercasedFilter);

      const matchesResigned = selectedResigned ?
        chat.resigned === (selectedResigned === "Yes" ? "Yes" : "No") :
        true;

      const matchesOpenChatStatus = selectedOpenChatStatus !== '' ?
        chat.openchat.status === (selectedOpenChatStatus === "Add" ? null : parseInt(selectedOpenChatStatus)) :
        true;

      return matchesSearchTerm && matchesResigned && matchesOpenChatStatus;
    });
    setFilteredChats(filtered);
  };

  return (
    <BackOffice>
      <div className="h4">Open Chat</div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '250px', marginRight: '20px', height: '50px' }}
        />
        <select
          value={selectedResigned}
          onChange={e => setSelectedResigned(e.target.value)}
          style={{ width: '250px', marginRight: '20px', height: '50px' }}
        >
          <option value="" >Resigned</option>
          <option value="Yes">เปิดแชท</option>
          <option value="No">ปิดแชท</option>
        </select>
        <select
          value={selectedOpenChatStatus}
          onChange={e => setSelectedOpenChatStatus(e.target.value)}
          style={{ width: '250px', marginRight: '20px', height: '50px' }}
        >
          <option value="">Open Chat</option>
          <option value="null">Add</option>
          <option value="1">Delete</option>
          <option value="0">Null</option>
        </select>
      </div>
      <table className="mt-3 table table-bordered table-striped">
        <thead>
          <tr>
            <th>Employee Code</th>
            <th width='150px' className="text-right">Name TH</th>
            <th width='150px' className="text-right">Name EN</th>
            <th>Division</th>
            <th>Department</th>
            <th width='140px'>Profile Picture</th>
            <th width='150px' className="text-right">Resigned</th>
            <th width='150px' className="text-right">Open Chat</th>
            <th width='150px' className="text-right">Modified</th>
            <th width='150px' className="text-right">Modified Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredChats.length > 0 ? filteredChats.map(item => (
            <tr key={item.empcode}>
              <td>{item.empcode}</td>
              <td className="text-right">{item.name_th}</td>
              <td className="text-right">{item.name_en}</td>
              <td className="text-right">{item.div}</td>
              <td className="text-right">{item.dept}</td>
              <td className="text-right">{item.profile}</td>
              <td className="text-right">{item.resigned}</td>
              <td className="text-center">
                {item.openchat.status === null ? (
                  <button className="btn btn-primary" onClick={e => handleStatus(item)}>
                    <i className="fa fa-edit"></i>
                  </button>
                ) : item.openchat.status === 1 ? (
                  <button className="btn btn-danger" onClick={e => handleStatus(item)}>
                    <i className="fa fa-times"></i>
                  </button>
                ) : null}
              </td>
              <td className="text-right">{item.openchat.modified_by}</td>
              <td className="text-right">{item.openchat.modified_date}</td>
            </tr>
          )) : <tr><td colSpan="10" className="text-center">No results found</td></tr>}
        </tbody>
      </table>
    </BackOffice>
  );
}

export default OpenChat;
