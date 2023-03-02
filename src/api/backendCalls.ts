import axios from 'axios';

const baseURL = 'localhost:8080';
function getAssignments(routerId: string | undefined) {
  return axios.get(baseURL + `/api/assignments/${routerId}`);
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));
}

const deleteAssignment = (routerId: string | undefined) =>
  axios
    .delete(`/api/assignments/${routerId}`)
    .then((res) => {
      console.log(res);
      window.location.href = '/dashboard';
    })
    .catch((err) => console.log(err));

const updateAssignment = (routerId: string | undefined, body: {}) => {
  axios
    .put(`/api/assignments/${routerId}`, { body })
    .then((res) => {
      console.log(res);
      location.reload();
    })
    .catch((err) => console.log(err));
};

export { getAssignments, deleteAssignment };
